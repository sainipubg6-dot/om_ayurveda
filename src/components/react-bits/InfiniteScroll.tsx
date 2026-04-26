import React from "react";
import { cn } from "@/lib/utils";

interface InfiniteScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function InfiniteScroll({
  children,
  className,
  speed = 20,
  direction = "left",
  pauseOnHover = true,
}: InfiniteScrollProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden mask-fade-x",
        className
      )}
      style={{
        "--speed": `${speed}s`,
        "--direction": direction === "left" ? "normal" : "reverse",
      } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 animate-scroll",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

export default InfiniteScroll;
