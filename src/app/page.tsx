import Link from 'next/link';
import { apiData } from '@/data/concepts';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className="text-gradient">API Architecture</span> Concepts
        </h1>
        <p className={styles.subtitle}>
          Un guide interactif pour maîtriser les fondations, les patterns et les meilleures pratiques de conception d'APIs.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {apiData.map((category, index) => (
          <Link 
            href={`/category/${category.id}`} 
            key={category.id}
            className={`glass-panel ${styles.categoryCard}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={styles.categoryHeader}>
              <div 
                className={styles.iconPlaceholder}
                style={{ '--card-color': category.color } as React.CSSProperties}
              >
                {category.title.charAt(0)}
              </div>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
            </div>
            
            <p className={styles.categoryDesc}>
              {category.description}
            </p>

            <div className={styles.conceptPills}>
              {category.concepts.slice(0, 3).map(concept => (
                <span key={concept.id} className={styles.pill}>
                  {concept.title}
                </span>
              ))}
              {category.concepts.length > 3 && (
                <span className={styles.pill}>+{category.concepts.length - 3}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
