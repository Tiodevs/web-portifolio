import styles from './ProjectCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    link: string;
    linksgit?: string;
}

export default function ProjectCard({ title, subtitle, description, image, link, linksgit }: ProjectCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <div className={styles.infoText}>
                    <h3>{title}</h3>
                    <span className={styles.subtitle}>{subtitle}</span>
                    <p>{description}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <Link href={link} className={styles.button}>Saiba mais</Link>
                    {linksgit && (
                        <Link href={linksgit} className={styles.button2}>
                            <Image src="/iconGit.svg" alt={title} width={24} height={24} quality={100} className={styles.icon}/>
                        </Link>
                    )}
                </div>
            </div>
            <Image src={image} alt={title} width={626} height={500} quality={100}/>
        </div>
    );
} 