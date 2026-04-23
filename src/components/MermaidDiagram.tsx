"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "var(--font-sans)",
});

export default function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !chart) return;

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          setRendered(true);
        }
      } catch (e) {
        console.error("Mermaid parsing error:", e);
        if (containerRef.current) {
          containerRef.current.innerHTML = "<p style='color:red;'>Erreur de rendu du diagramme.</p>";
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div 
      className={`mermaid-container ${rendered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      ref={containerRef}
      style={{ overflowX: "auto", display: "flex", justifyContent: "center" }}
    />
  );
}
