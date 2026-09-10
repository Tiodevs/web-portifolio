import styles from './Voluntariado.module.scss';
import { volunteerWork } from '@/data/experience';

export function Voluntariado() {
  return (
    <section className={styles.section} id="voluntariado">
      <h2>Voluntariado</h2>
      <p className={styles.lead}>
        Fora do produto comercial, o mesmo recorte: educação, dados e presença em comunidade.
      </p>
      <div className={styles.grid}>
        {volunteerWork.map((item) => (
          <article key={item.titulo} className={styles.card}>
            <p className={styles.context}>{item.contexto}</p>
            <h3>{item.titulo}</h3>
            <p>{item.descricao}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
