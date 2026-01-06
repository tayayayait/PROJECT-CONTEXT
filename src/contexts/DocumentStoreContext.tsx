import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import type { AnalysisStatus, UploadItem, UploadStatus } from "@/hooks/useUploadQueue";

export interface DocumentRecord {
  id: string;
  name: string;
  prettySize: string;
  size: number;
  type: UploadItem["type"];
  status: UploadStatus;
  progress: number;
  analysisStatus?: AnalysisStatus;
  analysisSummary?: string;
  updatedAt: number;
}

type State = {
  documents: DocumentRecord[];
};

type Action =
  | { type: "upsert"; payload: DocumentRecord }
  | { type: "remove"; id: string }
  | { type: "clear" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "upsert": {
      const existingIndex = state.documents.findIndex((doc) => doc.id === action.payload.id);
      let nextDocuments: DocumentRecord[];
      if (existingIndex >= 0) {
        nextDocuments = [...state.documents];
        nextDocuments[existingIndex] = action.payload;
      } else {
        nextDocuments = [action.payload, ...state.documents];
      }
      return {
        documents: nextDocuments.sort((a, b) => b.updatedAt - a.updatedAt),
      };
    }
    case "remove":
      return { documents: state.documents.filter((doc) => doc.id !== action.id) };
    case "clear":
      return { documents: [] };
    default:
      return state;
  }
};

interface DocumentStoreValue {
  documents: DocumentRecord[];
  upsertDocument: (item: UploadItem) => void;
  removeDocument: (id: string) => void;
  clearDocuments: () => void;
}

const DocumentStoreContext = createContext<DocumentStoreValue | undefined>(undefined);

export const DocumentStoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { documents: [] });

  const upsertDocument = useCallback((item: UploadItem) => {
    dispatch({
      type: "upsert",
      payload: {
        id: item.id,
        name: item.name,
        prettySize: item.prettySize,
        size: item.size,
        type: item.type,
        status: item.status,
        progress: item.progress,
        analysisStatus: item.analysisStatus,
        analysisSummary: item.analysisSummary,
        updatedAt: Date.now(),
      },
    });
  }, []);

  const value = useMemo<DocumentStoreValue>(
    () => ({
      documents: state.documents,
      upsertDocument,
      removeDocument: (id: string) => dispatch({ type: "remove", id }),
      clearDocuments: () => dispatch({ type: "clear" }),
    }),
    [state.documents, upsertDocument],
  );

  return <DocumentStoreContext.Provider value={value}>{children}</DocumentStoreContext.Provider>;
};

export const useDocumentStore = () => {
  const context = useContext(DocumentStoreContext);
  if (!context) {
    throw new Error("useDocumentStore must be used within a DocumentStoreProvider");
  }
  return context;
};
