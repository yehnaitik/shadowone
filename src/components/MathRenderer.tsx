import { useEffect, useState } from 'react';

interface Props {
  content: string;
}

export default function MathRenderer({ content }: Props) {
  const [hasLatex, setHasLatex] = useState(false);

  useEffect(() => {
    // Check if content contains LaTeX patterns
    const hasLatexPatterns = /\$.*?\$|\\\(.*?\\\)|\\\[.*?\\\]/gs.test(content);
    setHasLatex(hasLatexPatterns);

    // Load KaTeX CSS if needed
    if (hasLatexPatterns) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
      document.head.appendChild(link);
    }
  }, [content]);

  const processContent = (text: string) => {
    if (!hasLatex) return text;

    // Simple math pattern detection
    const patterns = [
      { regex: /\$\$(.*?)\$\$/gs, type: 'display' },
      { regex: /\$(.*?)\$/gs, type: 'inline' },
    ];

    let processed = text;
    patterns.forEach(({ regex, type }) => {
      processed = processed.replace(regex, (match, content) => {
        return `<span class="math ${type}">${content}</span>`;
      });
    });

    return processed;
  };

  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{
        __html: processContent(content),
      }}
    />
  );
}

// Simple inline math rendering (KaTeX would need to be installed)
export function renderMathInline(text: string): string {
  const mathPatterns = [
    // Common math symbols
    { from: /√(\w+)/g, to: '√$1' },
    { from: /\^(\d+)/g, to: '<sup>$1</sup>' },
    { from: /π/g, to: '3.14159...' },
    { from: /∑/g, to: 'Σ' },
    { from: /∫/g, to: '∫' },
    { from: /∞/g, to: '∞' },
  ];

  let result = text;
  mathPatterns.forEach(({ from, to }) => {
    result = result.replace(from, to);
  });

  return result;
}
