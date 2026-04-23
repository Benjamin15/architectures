import { notFound } from 'next/navigation';
import Link from 'next/link';
import { apiData } from '@/data/concepts';
import styles from './page.module.css';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = apiData.find((c) => c.id === slug);
  if (!category) return { title: 'Not Found' };

  return {
    title: `${category.title} | API Architecture Concepts`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = apiData.find((c) => c.id === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="animate-fade-in">
      <Link href="/" className={styles.backLink}>
        &larr; Retour à l'accueil
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.icon} style={{ backgroundColor: category.color }}>
            {category.title.charAt(0)}
          </span>
          {category.title}
        </h1>
        <p className={styles.description}>{category.description}</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {category.concepts.map((concept, index) => (
          <Link 
            href={`/concept/${category.id}/${concept.id}`} 
            key={concept.id}
            className={`glass-panel ${styles.conceptCard}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <h3 className={styles.conceptTitle}>{concept.title}</h3>
            <p className={styles.conceptDesc}>
              {concept.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return apiData.map((category) => ({
    slug: category.id,
  }));
}
