'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MetricStat.module.scss';

type MetricStatProps = {
  value: string;
  label: string;
  href?: string;
};

function parseMetric(value: string) {
  const match = value.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  if (!match) {
    return { prefix: '', number: null as number | null, suffix: value };
  }
  return {
    prefix: match[1],
    number: Number(match[2].replace(/\./g, '').replace(',', '.')),
    suffix: match[3],
  };
}

export function MetricStat({ value, label, href }: MetricStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const parsed = parseMetric(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (parsed.number === null || value.includes('→')) {
      setDisplay(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(parsed.number! * eased);
          setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [parsed.number, parsed.prefix, parsed.suffix, value]);

  const content = (
    <div ref={ref} className={styles.stat}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );

  if (href) {
    return (
      <a className={styles.statLink} href={href}>
        {content}
      </a>
    );
  }

  return content;
}
