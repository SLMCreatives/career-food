import { cn } from "@/lib/utils";
import type React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export function Heading({
  children,
  size = "md",
  className,
  ...props
}: HeadingProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl font-bold"
  };

  return (
    <h1 className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </h1>
  );
}
