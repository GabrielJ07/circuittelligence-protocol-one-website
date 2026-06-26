const DEFAULT_LINES = [
  '> Connecting...',
  '> Handshake authorized.',
  '> Streaming telemetry from PROTOCOL:01',
  '> Governed intelligence: ONLINE',
  '> System Nominal. Protocol Authorized.',
];

export function TerminalBlock({lines = DEFAULT_LINES}: {lines?: string[]}) {
  return (
    <pre className="terminal-block" aria-label="Terminal output">
      {lines.map((line, index) => (
        <span
          key={line}
          className="terminal-block__line"
          style={{animationDelay: `${index * 0.4}s`}}
        >
          {line}
        </span>
      ))}
    </pre>
  );
}
