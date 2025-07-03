'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLoadingState } from '../../hooks/useLoadingState';
import styles from './CustomCursor.module.scss';

// Função para renderizar texto circular
function CircularText({
  text,
  radius = 18,
  rotate = 0,
  fontSize = 10,
  color = 'var(--main)'
}: {
  text: string,
  radius?: number,
  rotate?: number,
  fontSize?: number,
  color?: string
}) {
  const chars = text.split('');
  const degreeStep = 360 / chars.length;
  const offsetAngle = -30 - ((chars.length / 2) * degreeStep);

  return (
    <div
      style={{
        position: 'absolute',
        width: `${radius * 1}px`,
        height: `${radius * 1}px`,
        left: '50%',
        top: '50%',
        pointerEvents: 'none',
        transform: `translate(-50%, -50%) rotate(${rotate + offsetAngle}deg)`,
        zIndex: 1,
      }}
    >
      {chars.map((char: string, i: number) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `rotate(${i * degreeStep}deg) translate(${radius}px) rotate(-260deg)`,
            transformOrigin: '0 0',
            fontSize: `${fontSize}px`,
            color: color,
            fontWeight: 'bold',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            userSelect: 'none',
            fontFamily: 'inherit',
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [showCircleText, setShowCircleText] = useState(false);
  const [circleTextRotation, setCircleTextRotation] = useState(0);
  const circleTextInterval = useRef<NodeJS.Timeout | null>(null);
  const [showCustomCursor, setShowCustomCursor] = useState(true);
  const { isLoading } = useLoadingState();

  useEffect(() => {
    // Detecta touch ou tela pequena
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    if (isTouch || isSmallScreen) {
      setShowCustomCursor(false);
      document.body.style.cursor = 'auto';
      return;
    }
    setShowCustomCursor(true);

    // Cursor personalizado
    const cursor = cursorRef.current;
    if (cursor) {
      document.body.style.cursor = 'none';

      const style = document.createElement('style');
      style.textContent = `
        a, button, [role="button"], input, select, textarea {
          cursor: none !important;
        }
        * {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      };

      const handleMouseEnter = () => {
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out"
        });
        setShowCircleText(true);
        // Inicia rotação animada
        if (!circleTextInterval.current) {
          circleTextInterval.current = setInterval(() => {
            setCircleTextRotation(r => r + 2);
          }, 15);
        }
      };

      const handleMouseLeave = () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        setShowCircleText(false);
        // Para rotação
        if (circleTextInterval.current) {
          clearInterval(circleTextInterval.current);
          circleTextInterval.current = null;
        }
        setCircleTextRotation(0);
      };

      // Adiciona os event listeners
      window.addEventListener('mousemove', moveCursor);
      
      // Adiciona o efeito hover em todos os elementos clicáveis
      const clickableElements = document.querySelectorAll('a, button, [role="button"]');
      clickableElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', moveCursor);
        clickableElements.forEach(element => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
        });
        document.body.style.cursor = 'auto';
        document.head.removeChild(style);
        if (circleTextInterval.current) {
          clearInterval(circleTextInterval.current);
        }
      };
    }
  }, [isLoading]);

  // Se isLoading for true, retorna null
  if (isLoading) {
    return null;
  }

  if (!showCustomCursor) {
    return null;
  }

  return (
    <div 
      ref={cursorRef}
      className={styles.cursor}
      data-testid="custom-cursor"
    >
      {showCircleText && (
        <CircularText text={' APERTE • AGORA •'} radius={24} fontSize={7} color={'var(--branco)'} rotate={circleTextRotation} />
      )}
    </div>
  );
} 