'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Contato.module.scss';
import { EMAIL, GITHUB_URL, INSTAGRAM_URL, LINKEDIN_PROFILE_URL } from '../../lib/social';

export function Contato() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className={styles.contato}>
      <div className={styles.imgFooter}>
        <Image
          src="/me2.png"
          alt="Foto de Felipe P. dos Santos"
          width={429}
          height={323}
        />
      </div>
      <h2 className={styles.contatoTitle}>Vamos conversar</h2>
      <p className={styles.contatoLead}>
        Disponível para produto, full stack e conversas sobre IA aplicada — sem teatro, com entrega.
      </p>
      <div className={styles.contatoLinks}>
        <a href={`mailto:${EMAIL}`}>
          <img src="/iconEmail.svg" alt="" />
          {EMAIL}
        </a>
        <button type="button" className={styles.copy} onClick={copyEmail}>
          {copied ? 'E-mail copiado' : 'Copiar e-mail'}
        </button>
        <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          <img src="/iconLinkedin.svg" alt="Meu LinkedIn" />
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <img src="/iconGit.svg" alt="Meu GitHub" />
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <img src="/IconIntagram.svg" alt="Meu Instagram" />
        </a>
      </div>
      <p data-testid="contato-copyright">© 2026 Felipe Santos</p>
    </div>
  );
}
