import { useEffect, useState } from 'react';

export default function AsciiAvatar() {
  const [asciiLines, setAsciiLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    // Fetch the ASCII art file
    fetch('/avatar.txt')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        setAsciiLines(lines);
        
        // Animate line by line with faster speed
        let line = 0;
        const interval = setInterval(() => {
          if (line < lines.length) {
            setCurrentLine(line);
            line++;
          } else {
            clearInterval(interval);
          }
        }, 10); // Faster speed (10ms per line)

        return () => clearInterval(interval);
      });
  }, []);

  return (
    <pre 
      className="text-[0.35rem] leading-[0.6] font-mono text-success/90 
                 whitespace-pre select-none"
      style={{ 
        fontFamily: 'Consolas, monospace',
        transform: 'scale(1)',
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'block',
      }}
    >
      {asciiLines.slice(0, currentLine + 1).join('\n')}
    </pre>
  );
} 