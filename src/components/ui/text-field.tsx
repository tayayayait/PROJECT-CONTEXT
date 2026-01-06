import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  error?: string;
  success?: string;
  requiredMark?: boolean;
  maxLength?: number;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { label, helpText, error, success, requiredMark, maxLength, className, id, ...props },
    ref,
  ) => {
    const inputId = id || React.useId();
    const helpId = helpText ? `${inputId}-help` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [errorId, helpId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground flex items-center gap-1">
            {label}
            {requiredMark && <span className="text-danger">*</span>}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "h-10 w-full rounded-md border bg-background px-3 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger/60 focus-visible:ring-danger",
            success && !error && "border-success/60 focus-visible:ring-success",
            className,
          )}
          {...props}
        />

        {maxLength && props.value && typeof props.value === "string" && (
          <div className="text-right text-xs text-muted-foreground">
            {props.value.length}/{maxLength}
          </div>
        )}

        {error ? (
          <p id={errorId} className="text-xs text-danger flex items-center gap-1">
            {error}
          </p>
        ) : success ? (
          <p className="text-xs text-success flex items-center gap-1">{success}</p>
        ) : helpText ? (
          <p id={helpId} className="text-xs text-muted-foreground">
            {helpText}
          </p>
        ) : null}
      </div>
    );
  },
);
TextField.displayName = "TextField";
