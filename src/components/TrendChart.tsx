interface Props {
  series: number[]; // fractions 0..1, oldest first
}

export default function TrendChart({ series }: Props) {
  const W = 320;
  const H = 96;
  const pad = 6;
  const n = series.length;
  const x = (i: number) => (n === 1 ? W / 2 : pad + (i / (n - 1)) * (W - 2 * pad));
  const y = (v: number) => pad + (1 - Math.max(0, Math.min(1, v))) * (H - 2 * pad);

  const line = series.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(n - 1).toFixed(1)},${H - pad} L${x(0).toFixed(1)},${H - pad} Z`;

  return (
    <svg className="trend" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="tfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6366f1" stopOpacity="0.32" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={0} x2={W} y1={y(g)} y2={y(g)} className="grid-line" />
      ))}
      <path d={area} fill="url(#tfill)" />
      <path d={line} className="trend-line" />
      <circle cx={x(n - 1)} cy={y(series[n - 1])} r="3.2" className="trend-dot" />
    </svg>
  );
}
