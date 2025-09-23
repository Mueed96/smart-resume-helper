export function HighlightedText({ text, keywords }: { text: string; keywords: string[] }) {
  if (!keywords.length) return <>{text}</>;
  
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
          <strong 
            key={i} 
            // CHANGED: Use a light background with dark text for high contrast
            className="bg-yellow-200 text-yellow-900 font-bold rounded px-1"
          >
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </span>
  );
}