"use client";

import React, { useEffect } from 'react';
import { FESTIVAL_CONFIG } from './festival-config';

/** Applies festival body class (for CSS variables & top border). No banner — greeting lives in SliderHero. */
export default function FestivalProvider({ children }: { children: React.ReactNode }) {
  const festival = FESTIVAL_CONFIG.activeFestival;

  useEffect(() => {
    if (festival === 'none') return;
    document.body.classList.add(`festival-${festival}`);
    return () => { document.body.classList.remove(`festival-${festival}`); };
  }, [festival]);

  return <>{children}</>;
}
