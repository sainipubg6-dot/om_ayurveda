import { useRef, useEffect, useState } from 'react';
import { useSprings, animated, SpringConfig } from '@react-spring/web';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: any;
  animationTo?: any;
  easing?: (t: number) => number | string;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOutCubic',
  onAnimationComplete,
}) => {
  const splitIntoGraphemes = (input: string) => {
    if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
      return Array.from(new (Intl as any).Segmenter('en', { granularity: 'grapheme' }).segment(input), (seg: any) => seg.segment);
    }
    // Fallback: split by code points to avoid surrogate issues.
    return Array.from(input);
  };

  const elements = animateBy === 'words' ? text.split(' ') : splitIntoGraphemes(text);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  // Default animations if not provided
  const defaultFrom =
    animationFrom || { filter: 'blur(10px)', opacity: 0, transform: `translate3d(0,${direction === 'top' ? '-50px' : '50px'},0)` };
  const defaultTo =
    animationTo || [
      { filter: 'blur(5px)', opacity: 0.5, transform: `translate3d(0,${direction === 'top' ? '5px' : '-5px'},0)` },
      { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
    ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current!);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: defaultFrom,
      to: inView
        ? async (next: any) => {
          for (const step of defaultTo) {
            await next(step);
          }
          animatedCount.current += 1;
          if (animatedCount.current === elements.length && onAnimationComplete) {
            onAnimationComplete();
          }
        }
        : defaultFrom,
      delay: i * delay,
      config: { easing: easing as any } as any,
    }))
  );

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={props}
          className="inline-block transition-all will-change-[transform,filter,opacity]"
        >
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </animated.span>
      ))}
    </p>
  );
};

export default BlurText;
