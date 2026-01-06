import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

const baseUrl = import.meta.env.BASE_URL ?? "/";
const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
GlobalWorkerOptions.workerSrc = `${normalizedBaseUrl}pdf.worker.min.js`;

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_BASE = (import.meta.env.VITE_OPENAI_API_BASE ?? "https://api.openai.com/v1").replace(/\/+$/, "");
const MAX_CONTENT_CHARS = 16_000;
const MODEL = "gpt-4o-mini";

interface DocumentContext {
  file: File;
  name: string;
  size: number;
}

const formatSize = (bytes: number) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
};

const trimText = (text: string) => {
  if (text.length <= MAX_CONTENT_CHARS) return text;
  return `${text.slice(0, MAX_CONTENT_CHARS)}\n\n(이어서...)`;
};

const extractPdfText = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: arrayBuffer });
  const doc = await loadingTask.promise;
  const pages: string[] = [];

  for (let i = 1; i <= doc.numPages; i += 1) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => {
        if ("str" in item && typeof item.str === "string") {
          return item.str;
        }
        return "";
      })
      .join(" ");
    pages.push(`Page ${i}\n${pageText}`);
    page.cleanup?.();
  }

  doc.destroy?.();
  return pages.filter(Boolean).join("\n\n").trim();
};

const extractTextFromFile = async (file: File) => {
  const extension = file.name.toLowerCase();
  try {
    if (extension.endsWith(".pdf") || file.type.includes("pdf")) {
      return extractPdfText(file);
    }
    if (extension.endsWith(".txt") || file.type.startsWith("text")) {
      return file.text();
    }
  } catch (error) {
    console.warn("text extraction failed", error);
  }
  return "";
};

const assemblePrompt = (context: DocumentContext, excerpt: string) => {
  const lines = [
    `파일명: ${context.name}`,
    `파일 크기: ${formatSize(context.size)}`,
    "",
    "다음 파일의 주요 내용과 핵심 키워드, 추천 행동을 간결히 정리해 주세요.",
    excerpt ? `본문 일부:\n${excerpt}` : "문서에서 텍스트를 추출할 수 없었습니다.",
    "",
    "결과는 한국어로, 요약 · 키워드(최대 5개) · 다음 행동 · 중요 질문 순으로 분리된 항목 형태로 작성해 주세요.",
  ];
  return lines.join("\n");
};

const readResponseText = (payload: any) => {
  if (!payload) return "";
  const outputs = Array.isArray(payload.output) ? payload.output : [];
  const fragments: string[] = [];
  for (const entry of outputs) {
    const contents = Array.isArray(entry.content) ? entry.content : [entry.content];
    for (const content of contents) {
      if (content?.type === "output_text" && typeof content.text === "string") {
        fragments.push(content.text);
      } else if (typeof content === "string") {
        fragments.push(content);
      }
    }
  }
  return fragments.join("\n").trim();
};

export const analyzeDocumentWithOpenAI = async (context: DocumentContext) => {
  const text = await extractTextFromFile(context.file);
  const excerpt = trimText(text);

  if (!OPENAI_API_KEY) {
    return `요약을 생성하려면 OPENAI_API_KEY가 필요합니다. 파일명: ${context.name} (${formatSize(context.size)}).`;
  }

  const prompt = assemblePrompt(context, excerpt);
  const response = await fetch(`${OPENAI_API_BASE}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      max_output_tokens: 500,
      input: [
        {
          role: "system",
          content:
            "당신은 문서 분석 전문가입니다. PDF/텍스트에서 핵심만 뽑아 요약, 키워드, 액션 플랜, 질문을 한국어로 정리하세요.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    throw new Error(errorPayload || "분석 API 호출에 실패했습니다.");
  }

  const payload = await response.json();
  const summary = readResponseText(payload);
  return summary || `문서를 요약할 수 없었습니다. (${context.name})`;
};
