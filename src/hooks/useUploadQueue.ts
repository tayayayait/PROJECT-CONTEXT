import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { analyzeDocumentWithOpenAI } from "@/lib/documentAnalyzer";

export type UploadStatus =
  | "queued"
  | "uploading"
  | "parsing"
  | "embedding"
  | "completed"
  | "failed"
  | "paused";

export type AnalysisStatus = "queued" | "analyzing" | "ready" | "error";

export interface UploadItem {
  id: string;
  name: string;
  size: number; // bytes
  prettySize: string;
  type: "pdf" | "pptx" | "image" | "txt" | "other";
  status: UploadStatus;
  progress: number; // 0-100
  error?: string;
  stage: "uploading" | "parsing" | "embedding" | "completed";
  createdAt: number;
  file: File;
  analysisStatus?: AnalysisStatus;
  analysisSummary?: string;
  analysisError?: string;
  analysisAttempts?: number;
}

interface State {
  items: UploadItem[];
}

type Action =
  | { type: "enqueue"; payload: UploadItem[] }
  | { type: "update"; payload: UploadItem }
  | { type: "remove"; id: string }
  | { type: "replace"; payload: UploadItem[] };

const MAX_CONCURRENCY = 5;
const TICK_MS = 700;
const STEP = 10;

const formatSize = (bytes: number) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
};

const toType = (file: File): UploadItem["type"] => {
  const t = file.type;
  if (t.includes("pdf")) return "pdf";
  if (t.includes("ppt")) return "pptx";
  if (t.startsWith("image")) return "image";
  if (t.includes("text")) return "txt";
  return "other";
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "enqueue":
      return { ...state, items: [...state.items, ...action.payload] };
    case "update":
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case "remove":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "replace":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export const useUploadQueue = () => {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const analysisQueueRef = useRef<Set<string>>(new Set());
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const updateItem = useCallback((id: string, changes: Partial<UploadItem>) => {
    const item = stateRef.current.items.find((i) => i.id === id);
    if (!item) return;
    dispatch({ type: "update", payload: { ...item, ...changes } });
  }, []);

  const activeCount = useMemo(
    () => state.items.filter((i) => ["uploading", "parsing", "embedding"].includes(i.status)).length,
    [state.items],
  );

  const enqueue = (files: File[]) => {
    const newItems: UploadItem[] = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      prettySize: formatSize(file.size),
      type: toType(file),
      status: "queued",
      progress: 0,
      stage: "uploading",
      file,
      createdAt: Date.now(),
    }));
    dispatch({ type: "enqueue", payload: newItems });
  };

  const setStatus = (id: string, status: UploadStatus, changes: Partial<UploadItem> = {}) => {
    updateItem(id, { status, ...changes });
  };

  const pause = (id: string) => setStatus(id, "paused");
  const resume = (id: string) =>
    setStatus(id, "queued", {
      progress: 0,
      stage: "uploading",
      error: undefined,
      analysisStatus: undefined,
      analysisSummary: undefined,
      analysisError: undefined,
    });
  const cancel = (id: string) =>
    setStatus(id, "failed", {
      error: "사용자가 취소했습니다",
      analysisStatus: undefined,
      analysisSummary: undefined,
      analysisError: undefined,
    });
  const retry = (id: string) =>
    setStatus(id, "queued", {
      progress: 0,
      stage: "uploading",
      error: undefined,
      analysisStatus: undefined,
      analysisSummary: undefined,
      analysisError: undefined,
    });
  const retryAnalysis = (id: string) =>
    updateItem(id, { analysisStatus: undefined, analysisSummary: undefined, analysisError: undefined });

  const promoteQueued = () => {
    const current = [...state.items];
    let available = MAX_CONCURRENCY - current.filter((i) => ["uploading", "parsing", "embedding"].includes(i.status)).length;
    if (available <= 0) return;
    let changed = false;
    const updated = current.map((item) => {
      if (available > 0 && item.status === "queued") {
        available -= 1;
        changed = true;
        return { ...item, status: "uploading", stage: "uploading", progress: 0 };
      }
      return item;
    });
    if (changed) dispatch({ type: "replace", payload: updated });
  };

  const tick = () => {
    let updated = false;
    const next = state.items.map((item) => {
      if (!["uploading", "parsing", "embedding"].includes(item.status)) return item;
      const newProgress = Math.min(100, item.progress + STEP);
      let status: UploadStatus = item.status;
      let stage = item.stage;

      if (newProgress >= 100) {
        if (item.stage === "uploading") {
          status = "parsing";
          stage = "parsing";
        } else if (item.stage === "parsing") {
          status = "embedding";
          stage = "embedding";
        } else {
          status = "completed";
          stage = "completed";
        }
      }

      if (newProgress !== item.progress || status !== item.status || stage !== item.stage) updated = true;
      return { ...item, progress: status === "completed" ? 100 : newProgress % 100, status, stage };
    });

    if (updated) dispatch({ type: "replace", payload: next });
  };

  useEffect(() => {
    promoteQueued();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.items, activeCount]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => tick(), TICK_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.items]);

  useEffect(() => {
    state.items.forEach((item) => {
      if (item.status !== "completed" || item.analysisStatus) return;
      if (analysisQueueRef.current.has(item.id)) return;

      analysisQueueRef.current.add(item.id);
      const attempts = (item.analysisAttempts ?? 0) + 1;
      updateItem(item.id, {
        analysisStatus: "queued",
        analysisAttempts: attempts,
        analysisError: undefined,
      });

      (async () => {
        try {
          updateItem(item.id, { analysisStatus: "analyzing" });
          const summary = await analyzeDocumentWithOpenAI({
            file: item.file,
            name: item.name,
            size: item.size,
          });
          updateItem(item.id, {
            analysisStatus: "ready",
            analysisSummary: summary,
            analysisError: undefined,
          });
        } catch (error) {
          updateItem(item.id, {
            analysisStatus: "error",
            analysisError: error instanceof Error ? error.message : "분석 중 오류가 발생했습니다.",
          });
        } finally {
          analysisQueueRef.current.delete(item.id);
        }
      })();
    });
  }, [state.items, updateItem]);

  const visibleItems = useMemo(
    () => [...state.items].sort((a, b) => b.createdAt - a.createdAt),
    [state.items],
  );

  return {
    items: visibleItems,
    activeCount,
    concurrencyLimit: MAX_CONCURRENCY,
    enqueue,
    pause,
    resume,
    cancel,
    retry,
    retryAnalysis,
  };
};
