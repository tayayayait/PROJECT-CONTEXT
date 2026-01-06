import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { QueryBuilder } from "@/components/search/QueryBuilder";
import { SearchResults, SearchResult } from "@/components/search/SearchResults";
import { EvidencePanel } from "@/components/search/EvidencePanel";
import { useDocumentStore } from "@/contexts/DocumentStoreContext";

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "2024년 사업계획 요약",
    document: "기업계획서_2024.pdf",
    page: 12,
    chunkId: "chunk_001",
    similarity: 0.94,
    snippet:
      "올해 주요 사업 계획은 디지털 전환과 고객 경험 개선에 집중하고 있으며, 반복적인 수동 작업은 자동화 도구로 대체해 생산성을 높입니다.",
    highlightedText: "디지털 전환",
    tags: ["전략", "DX"],
  },
  {
    id: "2",
    title: "마케팅 예산 계획",
    document: "마케팅전략.pptx",
    page: 8,
    chunkId: "chunk_045",
    similarity: 0.89,
    snippet:
      "분기별 마케팅 예산은 전년 대비 15% 증액하며 온라인 채널과 SNS 캠페인에 집중 투자하는 안을 담고 있습니다.",
    highlightedText: "온라인 채널",
    tags: ["예산", "마케팅"],
  },
  {
    id: "3",
    title: "기술 로드맵",
    document: "IT전략보고서.pdf",
    page: 23,
    chunkId: "chunk_112",
    similarity: 0.85,
    snippet:
      "AI 기반 자동화 도구와 통합 데이터 플랫폼을 중심으로 3년간 기술 계획을 구성하며, 기술 부채 상환과 보안 투자도 강조하고 있습니다.",
    highlightedText: "AI 기반 자동화",
    tags: ["AI", "기술"],
  },
];

const statusLabel = (status?: string) => {
  switch (status) {
    case "ready":
      return "분석 완료";
    case "analyzing":
      return "분석 중";
    case "error":
      return "분석 실패";
    case "queued":
      return "분석 대기";
    default:
      return "업로드";
  }
};

export default function VectorSearch() {
  const [query, setQuery] = useState("");
  const [similarity, setSimilarity] = useState(0.8);
  const [project, setProject] = useState("all");
  const [docType, setDocType] = useState("all");
  const { documents } = useDocumentStore();

  const builtResults = useMemo<SearchResult[]>(() => {
    if (documents.length === 0) return mockResults;

    return documents.map((doc, index) => {
      const snippet = doc.analysisSummary || "분석 결과가 준비 중입니다.";
      const highlight = snippet.split("\n")[0] || doc.name;
      const similarityScore =
        doc.analysisStatus === "ready" ? 0.94 : doc.analysisStatus === "analyzing" ? 0.82 : 0.75;

      return {
        id: doc.id,
        title: doc.name,
        document: doc.name,
        page: Math.max(1, Math.min(10, Math.ceil((doc.progress || 0) / 10) || 1)),
        chunkId: `chunk-${index + 1}`,
        similarity: similarityScore,
        snippet,
        highlightedText: highlight,
        tags: [statusLabel(doc.analysisStatus), doc.type],
      };
    });
  }, [documents]);

  const [results, setResults] = useState<SearchResult[]>(builtResults);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(builtResults[0] || null);

  useEffect(() => {
    setResults(builtResults);
    setSelectedResult(builtResults[0] || null);
  }, [builtResults]);

  const handleSearch = () => {
    const filtered = builtResults.filter(
      (r) =>
        r.similarity >= similarity &&
        (project === "all" || r.document.includes(project)) &&
        (docType === "all" || r.tags.includes(docType)),
    );
    setResults(filtered.length ? filtered : builtResults);
    setSelectedResult(filtered[0] || builtResults[0] || null);
  };

  return (
    <MainLayout pageTitle="벡터 검색">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <QueryBuilder
            query={query}
            onQueryChange={setQuery}
            similarity={similarity}
            onSimilarityChange={setSimilarity}
            project={project}
            onProjectChange={setProject}
            docType={docType}
            onDocTypeChange={setDocType}
            onSearch={handleSearch}
          />

          <SearchResults
            results={results}
            selectedId={selectedResult?.id}
            onSelect={setSelectedResult}
          />
        </div>

        <EvidencePanel result={selectedResult} />
      </div>
    </MainLayout>
  );
}
