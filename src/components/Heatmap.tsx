import type { CSSProperties } from 'react';
import { addDays, todayKey } from '../lib/dates';
import type { Habit } from '../lib/types';

const OPACITY = [0, 0.28, 0.5, 0.74, 1];
const BASE = '99, 102, 241'; // #6366f1

interface Props {
  habits: Habit[];
  weeks: number;
}

export default function Heatmap({ habits, weeks }: Props) {
  const total = habits.length;
  const end = new Date();
  const days = weeks * 7;

  const cols: { key: string; frac: number }[][] = Array.from({ length: weeks }, () => []);
  for (let i = days - 1; i >= 0; i--) {
    const key = todayKey(addDays(end, -i));
    const col = Math.floor((days - 1 - i) / 7);
    const row = (days - 1 - i) % 7;
    const frac = total ? habits.filter((h) => h.completions.includes(key)).length / total : 0;
    cols[col][row] = { key, frac };
  }

  const style = (frac: number): CSSProperties => {
    const level = frac === 0 ? 0 : frac < 0.25 ? 1 : frac < 0.5 ? 2 : frac < 0.75 ? 3 : 4;
    return { backgroundColor: frac === 0 ? undefined : `rgba(${BASE}, ${OPACITY[level]})` };
  };

  return (
    <div className="heatmap">
      <div className="heatmap-scroll">
        <div className="heatmap-grid">
          {cols.map((col, ci) => (
            <div className="heatmap-col" key={ci}>
              {col.map((c, ri) => (
                <div
                  key={ri}
                  className="hm"
                  style={style(c.frac)}
                  title={`${c.key}: ${Math.round(c.frac * 100)}% complete`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        {OPACITY.map((op, i) => (
          <span
            key={i}
            className="hm"
            style={{ backgroundColor: i === 0 ? undefined : `rgba(${BASE}, ${op})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
