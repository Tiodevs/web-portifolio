'use client';

import { CoverTheme } from '@/data/cases';
import styles from './CaseCover.module.scss';

type CaseCoverProps = {
  theme: CoverTheme;
  title: string;
  company: string;
  pointer?: { x: number; y: number };
  compact?: boolean;
};

export function CaseCover({ theme, title, company, pointer, compact }: CaseCoverProps) {
  const x = pointer?.x ?? 0.5;
  const y = pointer?.y ?? 0.5;
  const shiftX = (x - 0.5) * 24;
  const shiftY = (y - 0.5) * 18;

  return (
    <div
      className={`${styles.cover} ${styles[theme]} ${compact ? styles.compact : ''}`}
      aria-hidden="true"
    >
      <div
        className={styles.layer}
        style={{ transform: `translate(${shiftX}px, ${shiftY}px)` }}
      >
        {theme === 'industrial' && <IndustrialArt />}
        {theme === 'people' && <PeopleArt />}
        {theme === 'saas' && <SaasArt />}
        {theme === 'neural' && <NeuralArt />}
        {theme === 'nodes' && <NodesArt />}
        {theme === 'landing' && <LandingArt />}
      </div>
      <div className={styles.meta}>
        <span className={styles.company}>{company}</span>
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
}

function IndustrialArt() {
  return (
    <svg viewBox="0 0 640 420" className={styles.svg} fill="none">
      <rect x="48" y="70" width="160" height="220" rx="12" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <rect x="92" y="110" width="72" height="12" rx="6" fill="currentColor" opacity="0.35" />
      <rect x="92" y="138" width="48" height="8" rx="4" fill="currentColor" opacity="0.25" />
      <rect x="92" y="158" width="64" height="8" rx="4" fill="currentColor" opacity="0.2" />
      <circle cx="124" cy="230" r="28" stroke="var(--main)" strokeWidth="2" opacity="0.9" />
      <path d="M124 210 v40 M104 230 h40" stroke="var(--main)" strokeWidth="2" />
      <rect x="240" y="90" width="200" height="200" rx="16" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M260 140h160M260 180h120M260 220h140" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.2" />
      <rect x="470" y="120" width="120" height="160" rx="10" stroke="var(--main)" strokeWidth="1.5" opacity="0.7" />
      <rect x="492" y="148" width="76" height="10" rx="5" fill="var(--main)" opacity="0.7" />
      <rect x="492" y="172" width="54" height="8" rx="4" fill="currentColor" opacity="0.35" />
      <rect x="492" y="196" width="66" height="8" rx="4" fill="currentColor" opacity="0.25" />
      <rect x="492" y="220" width="40" height="8" rx="4" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PeopleArt() {
  return (
    <svg viewBox="0 0 640 420" className={styles.svg} fill="none">
      <circle cx="210" cy="160" r="46" stroke="var(--main)" strokeWidth="2" />
      <path d="M160 250c8-36 28-56 50-56s42 20 50 56" stroke="var(--main)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="340" cy="150" r="38" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <path d="M300 226c6-28 22-44 40-44s34 16 40 44" stroke="currentColor" strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
      <circle cx="430" cy="168" r="32" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M398 232c6-24 18-36 32-36s26 12 32 36" stroke="currentColor" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
      <rect x="120" y="280" width="400" height="14" rx="7" fill="currentColor" opacity="0.12" />
      <rect x="120" y="280" width="240" height="14" rx="7" fill="var(--main)" opacity="0.55" />
      <rect x="120" y="310" width="320" height="10" rx="5" fill="currentColor" opacity="0.12" />
    </svg>
  );
}

function SaasArt() {
  return (
    <svg viewBox="0 0 640 420" className={styles.svg} fill="none">
      <rect x="90" y="80" width="460" height="260" rx="18" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <rect x="90" y="80" width="460" height="52" rx="18" fill="currentColor" opacity="0.08" />
      {[0, 1, 2, 3, 4].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={124 + col * 84}
            y={160 + row * 52}
            width="64"
            height="36"
            rx="8"
            stroke={row === 1 && col === 2 ? 'var(--main)' : 'currentColor'}
            fill={row === 1 && col === 2 ? 'var(--main)' : 'transparent'}
            fillOpacity={row === 1 && col === 2 ? 0.35 : 0}
            strokeWidth="1.5"
            opacity={row === 1 && col === 2 ? 1 : 0.35}
          />
        )),
      )}
    </svg>
  );
}

function NeuralArt() {
  return (
    <svg viewBox="0 0 640 420" className={styles.svg} fill="none">
      <path d="M120 210h400M210 110v200M430 110v200M210 110l220 200M430 110L210 310" stroke="currentColor" opacity="0.2" />
      <circle cx="210" cy="110" r="16" fill="var(--preto)" stroke="var(--main)" strokeWidth="2" />
      <circle cx="430" cy="110" r="16" fill="var(--preto)" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="320" cy="210" r="22" fill="var(--preto)" stroke="var(--main)" strokeWidth="2" />
      <circle cx="210" cy="310" r="16" fill="var(--preto)" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="430" cy="310" r="16" fill="var(--preto)" stroke="var(--main)" strokeWidth="2" />
      <circle cx="120" cy="210" r="10" stroke="currentColor" opacity="0.4" />
      <circle cx="520" cy="210" r="10" stroke="currentColor" opacity="0.4" />
    </svg>
  );
}

function NodesArt() {
  return (
    <svg viewBox="0 0 640 420" className={styles.svg} fill="none">
      <path d="M180 210h280M320 120v180M180 210l140-90M460 210L320 120M180 210l140 90M460 210L320 300" stroke="currentColor" opacity="0.28" />
      <circle cx="180" cy="210" r="18" stroke="var(--main)" strokeWidth="2" />
      <circle cx="320" cy="120" r="18" stroke="currentColor" opacity="0.5" />
      <circle cx="460" cy="210" r="18" stroke="var(--main)" strokeWidth="2" />
      <circle cx="320" cy="300" r="18" stroke="currentColor" opacity="0.5" />
      <circle cx="320" cy="210" r="8" fill="var(--main)" />
    </svg>
  );
}

function LandingArt() {
  return (
    <svg viewBox="0 0 640 420" className={styles.svg} fill="none">
      <rect x="150" y="70" width="340" height="280" rx="20" stroke="currentColor" opacity="0.3" />
      <rect x="190" y="110" width="160" height="16" rx="8" fill="var(--main)" opacity="0.7" />
      <rect x="190" y="142" width="260" height="8" rx="4" fill="currentColor" opacity="0.2" />
      <rect x="190" y="162" width="220" height="8" rx="4" fill="currentColor" opacity="0.15" />
      <rect x="190" y="210" width="110" height="36" rx="18" stroke="var(--main)" />
      <rect x="190" y="270" width="260" height="50" rx="12" stroke="currentColor" opacity="0.2" />
    </svg>
  );
}
