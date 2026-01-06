import { FileDrop } from "@/components/ui/file-drop";
import { ReactNode } from "react";

interface UploadDropzoneProps {
  onFiles: (files: File[]) => void;
  children?: ReactNode;
  accept?: string;
  maxSizeMB?: number;
}

export function UploadDropzone({ onFiles, children, accept, maxSizeMB = 200 }: UploadDropzoneProps) {
  return (
    <FileDrop
      label="파일을 드래그하거나 클릭해 업로드하세요"
      description="PDF · PPTX · 이미지 · TXT 지원 (최대 200MB)"
      accept={accept}
      maxSizeMB={maxSizeMB}
      onFiles={onFiles}
    >
      {children}
    </FileDrop>
  );
}
