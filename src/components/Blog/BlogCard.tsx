import styles from './BlogCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const formatDate = (date: Date | null) => {
        if (!date) return 'Data não informada';
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const getExcerpt = (content: string, maxLength = 150) => {
        // Remove markdown e HTML tags para o resumo
        const plainText = content.replace(/[#*`\[\]]/g, '').replace(/<[^>]*>/g, '');
        if (plainText.length <= maxLength) return plainText;
        return plainText.substring(0, maxLength) + '...';
    };

    return (
        <div className={`${styles.card} blog-card-item`}>
            <div className={styles.info}>
                <div className={styles.infoText}>
                    <h3>{post.title}</h3>
                    <span className={styles.date}>
                        {formatDate(post.publishedAt)}
                    </span>
                    <p>{post.excerpt || getExcerpt(post.content)}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <Link href={`/blog/${post.id}`} className={styles.button}>
                        Ler artigo
                    </Link>
                </div>
            </div>
        </div>
    );
}
