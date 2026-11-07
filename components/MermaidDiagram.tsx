'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import { useTheme } from 'next-themes';

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  const rawId = useId();
  const diagramId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      if (!chart) return;

      try {
        const mermaid = (await import('mermaid')).default;
        const isDark = resolvedTheme === 'dark';

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'neutral',
          securityLevel: 'loose',
          fontFamily: 'inherit',
          htmlLabels: true,
          themeVariables: isDark
            ? {
                darkMode: true,
                background: '#18201a',
                primaryColor: '#059669',
                primaryTextColor: '#eef0e6',
                primaryBorderColor: '#10B981',
                lineColor: '#b2bebc',
                secondaryColor: '#3B82F6',
                tertiaryColor: '#F59E0B',
              }
            : {
                darkMode: false,
                background: '#e6e7dd',
                primaryColor: '#059669',
                primaryTextColor: '#141a16',
                primaryBorderColor: '#047857',
                lineColor: '#36423c',
                secondaryColor: '#2563EB',
                tertiaryColor: '#D97706',
              },
        });

        // Clean up chart string if needed
        const cleanChart = chart.trim();

        const { svg: renderedSvg } = await mermaid.render(diagramId, cleanChart);

        if (isMounted) {
          setSvg(renderedSvg);
          setError(false);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setError(true);
        }
      }
    }

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, resolvedTheme, diagramId]);

  if (error) {
    return (
      <div className="my-6 rounded-[2px] border border-rule bg-band/40 p-4 text-xs text-ink-soft">
        <div className="font-mono text-[11px] text-signal uppercase mb-2">Diagram Flowchart</div>
        <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-ink">{chart}</pre>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="my-6 flex justify-center overflow-x-auto rounded-[2px] border border-rule bg-band/30 p-4 shadow-xs"
    >
      {svg ? (
        <div
          className="mermaid-svg-container w-full max-w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="flex h-32 w-full items-center justify-center text-xs text-ink-soft animate-pulse">
          Rendering visual diagram...
        </div>
      )}
    </div>
  );
}
