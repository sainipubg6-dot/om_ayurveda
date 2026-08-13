"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FadedContentProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function FadedContent({
  children,
  className,
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: FadedContentProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(ref.current!);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000",
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export default FadedContent;