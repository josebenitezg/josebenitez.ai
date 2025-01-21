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
      className="text-[0.15rem] leading-[0.5] font-mono text-success/80 
                 whitespace-pre select-none"
      style={{ 
        fontFamily: 'Consolas, monospace',
        transform: 'scaleY(1.05) scaleX(0.9)',
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'block',
      }}
    >
      {asciiLines.slice(0, currentLine + 1).join('\n')}
    </pre>
  );
} 