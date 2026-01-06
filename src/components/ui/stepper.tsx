import { cn } from "@/lib/utils";
import { Check, Loader2, XCircle } from "lucide-react";

interface Step {
  id: string;
  label: string;
  description?: string;
  state?: "notStarted" | "inProgress" | "done" | "blocked";
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const stateIcon = {
  done: <Check className="h-5 w-5 text-primary-foreground" />,
  inProgress: <Loader2 className="h-5 w-5 text-primary animate-spin" />,
  blocked: <XCircle className="h-5 w-5 text-danger" />,
  notStarted: null,
};

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const state = step.state || (isCompleted ? "done" : isCurrent ? "inProgress" : "notStarted");
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                  state === "done" && "bg-primary border-primary",
                  state === "inProgress" && "border-primary bg-primary/10",
                  state === "blocked" && "border-danger bg-danger/10",
                  state === "notStarted" && "border-muted-foreground/30 bg-background",
                )}
              >
                {stateIcon[state] ?? <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>}
              </div>

              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    state === "done" || state === "inProgress" ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                )}
              </div>
            </div>

            {!isLast && (
              <div
                className={cn(
                  "w-16 h-0.5 mx-2 mt-[-24px]",
                  state === "done" ? "bg-primary" : state === "blocked" ? "bg-danger/50" : "bg-muted-foreground/20",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
