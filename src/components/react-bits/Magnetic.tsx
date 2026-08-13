"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring, useMotionValue, SpringOptions } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  intensity?: number;
  springOptions?: SpringOptions;
  className?: string;
}

export function Magnetic({
  children,
  intensity = 0.5,
  springOptions = { stiffness: 150, damping: 15, mass: 0.1 },
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = e;
      const target = ref.current;
      if (!target) return;

      const { left, top, width, height } = target.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const moveX = (clientX - centerX) * intensity;
      const moveY = (clientY - centerY) * intensity;

      x.set(moveX);
      y.set(moveY);
    },
    [intensity, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;