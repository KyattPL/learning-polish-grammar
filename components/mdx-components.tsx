import { AlertCircle } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutProps = {
  type?: "info" | "warning";
  title?: string;
  children?: ReactNode;
};

function Callout({ type = "info", title, children }: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-xl border p-4",
        type === "warning"
          ? "border-amber-300 bg-amber-50 text-amber-950"
          : "border-sky-300 bg-sky-50 text-sky-950"
      )}
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <AlertCircle className="size-4" />
        {title ?? "Note"}
      </div>
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}

export const mdxComponents = {
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className={cn("w-full border-collapse", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th className={cn("border px-3 py-2 text-left text-sm font-semibold", className)} {...props} />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td className={cn("border px-3 py-2 align-top text-sm", className)} {...props} />
  ),
  Callout
};
