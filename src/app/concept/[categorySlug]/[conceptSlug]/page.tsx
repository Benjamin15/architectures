import { notFound } from 'next/navigation';
import Link from 'next/link';
import { apiData } from '@/data/concepts';
import styles from './page.module.css';
import { Metadata } from 'next';
import { codeToHtml } from 'shiki';
import MermaidDiagram from '@/components/MermaidDiagram';

type Props = {
  params: Promise<{ categorySlug: string; conceptSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, conceptSlug } = await params;
  const category = apiData.find((c) => c.id === categorySlug);
  const concept = category?.concepts.find((c) => c.id === conceptSlug);
  
  if (!category || !concept) return { title: 'Not Found' };

  return {
    title: `${concept.title} | ${category.title}`,
    description: concept.description,
  };
}

export default async function ConceptPage({ params }: Props) {
  const { categorySlug, conceptSlug } = await params;
  const category = apiData.find((c) => c.id === categorySlug);
  const concept = category?.concepts.find((c) => c.id === conceptSlug);

  if (!category || !concept) {
    notFound();
  }

  // Calculate generic lighter background for tag based on category color
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
  };
  const rgbColor = hexToRgb(category.color);

  // Generate highlighted HTML if there is a code snippet
  let highlightedCode = '';
  if (concept.codeSnippet) {
    try {
      highlightedCode = await codeToHtml(concept.codeSnippet.code, {
        lang: concept.codeSnippet.language,
        theme: 'one-dark-pro',
      });
    } catch (e) {
      console.error("Failed to highlight code", e);
      highlightedCode = `<pre><code>${concept.codeSnippet.code}</code></pre>`;
    }
  }

  return (
    <div className="animate-fade-in">
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link>
        <span className={styles.separator}>/</span>
        <Link href={`/category/${category.id}`}>{category.title}</Link>
        <span className={styles.separator}>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{concept.title}</span>
      </nav>

      <header className={styles.header}>
        <div 
          className={styles.categoryTag}
          style={{ 
            '--tag-bg': `rgba(${rgbColor}, 0.15)`,
            '--tag-color': category.color
          } as React.CSSProperties}
        >
          {category.title}
        </div>
        <h1 className={styles.title}>{concept.title}</h1>
        <p className={styles.text} style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
          {concept.description}
        </p>
      </header>

      {/* Mermaid Diagram rendering */}
      {concept.mermaidDiagram && (
        <div className={styles.diagramContainer}>
          <MermaidDiagram chart={concept.mermaidDiagram} />
        </div>
      )}

      <div className={styles.contentGrid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Pourquoi c'est important ?</h2>
          <p className={styles.text}>{concept.importance}</p>
        </section>

        <section className={`${styles.section} ${styles.howToApply}`}>
          <h2 className={styles.sectionTitle}>Comment l'appliquer ?</h2>
          <p className={styles.text}>{concept.howToApply}</p>
        </section>

        {concept.codeSnippet && (
          <section className={`${styles.section} ${styles.sectionFull}`}>
            <h2 className={styles.sectionTitle}>Exemple Pratique</h2>
            <div className={styles.codeSnippet}>
              <div className={styles.codeHeader}>
                <div className={styles.macDots}>
                  <div className={`${styles.macDot} ${styles.macDotRed}`}></div>
                  <div className={`${styles.macDot} ${styles.macDotYellow}`}></div>
                  <div className={`${styles.macDot} ${styles.macDotGreen}`}></div>
                </div>
                <span>{concept.codeSnippet.language}</span>
                {concept.codeSnippet.title && (
                  <span className={styles.codeTitle}>{concept.codeSnippet.title}</span>
                )}
              </div>
              <div 
                className={styles.codeContent}
                dangerouslySetInnerHTML={{ __html: highlightedCode }} 
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const paths: { categorySlug: string; conceptSlug: string }[] = [];
  
  apiData.forEach((category) => {
    category.concepts.forEach((concept) => {
      paths.push({
        categorySlug: category.id,
        conceptSlug: concept.id,
      });
    });
  });

  return paths;
}
