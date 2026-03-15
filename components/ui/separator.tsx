import * as React from "react";
import { cn } from "@/lib/utils";

type SeparatorProps = React.HTMLAttributes<HTMLHRElement>;

function Separator({ className, ...props }: SeparatorProps) {
  return <hr className={cn("border-border", className)} {...props} />;
}

export { Separator };

