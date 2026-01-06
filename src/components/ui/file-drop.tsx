import * as React from "react";
import { UploadCloud, File as FileIcon, Image, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type FileDropFile = File & { preview?: string };

interface FileDropProps {
  label?: string;
  description?: string;
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  error?: string;
  children?: React.ReactNode;
}

const iconForType = (type: string) => {
  if (type.includes("image")) return Image;
  if (type.includes("pdf") || type.includes("ppt")) return FileText;
  return FileIcon;
};

export function FileDrop({
  label = "파일을 업로드",
  description = "드래그하거나 클릭해 업로드하세요",
  accept,
  maxSizeMB = 200,
  multiple = true,
  onFiles,
  error,
  children,
}: FileDropProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const files = Array.from(fileList);
    const tooLarge = files.find((f) => f.size / 1024 / 1024 > maxSizeMB);
    if (tooLarge) {
      setLocalError(`최대 ${maxSizeMB}MB까지 업로드 가능합니다.`);
      return;
    }
    setLocalError(null);
    onFiles?.(files);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="file-drop-input"
        tabIndex={0}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        onDrop={onDrop}
        onKeyDown={onKeyDown}
        className={cn(
          "relative flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragOver ? "border-primary bg-primary/5" : "border-border bg-surface-subtle hover:border-primary/50",
          error && "border-danger bg-danger/5",
          children && "gap-3"
        )}
        aria-label={label}
      >
        <div className="p-3 rounded-full bg-primary/10 mb-2">
          <UploadCloud className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-base font-semibold text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">지원: {accept || "pdf, pptx, img, txt"} · 최대 {maxSizeMB}MB</p>
        </div>
        {children}
        <input
          id="file-drop-input"
          ref={inputRef}
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-hidden
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
      {(error || localError) && (
        <p className="text-sm text-danger flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error || localError}
        </p>
      )}
    </div>
  );
}
