"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerClassName?: string;
  imageClassName?: string;
  captionClassName?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileConfirmation?: boolean;
  children?: React.ReactNode;
}

export function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText,
  containerClassName,
  imageClassName,
  captionClassName,
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  children,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0);
  const y = useSpring(0);
  const scale = useSpring(1);

  const rotateX = useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    scale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <div
      className={cn("relative h-full w-full", containerClassName)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={ref}
        className={cn("relative h-full w-full overflow-hidden rounded-xl", imageClassName)}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="h-full w-full object-cover"
        />
        {children}
        {captionText && (
          <div
            className={cn(
              "absolute bottom-4 left-4 right-4 z-10 translate-z-[50px] transform text-white",
              captionClassName
            )}
          >
            {captionText}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default TiltedCard;