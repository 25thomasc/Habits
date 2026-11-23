import type { CSSProperties } from 'react';
import type { HabitStore } from '../hooks/useHabits';
import { lastNDays } from '../lib/dates';
import { currentStreak, longestStreak } from '../lib/streaks';
import { iconFor } from '../lib/icons';
import Heatmap from './Heatmap';
import TrendChart from './TrendChart';
import Icon from './Icon';

function StatCard({ label, value, icon, accent }: { label: string; value: string; icon: string; accent: string }) {
  return (
    <div className="stat-card" style={{ '--accent': accent } as CSSProperties}>
      <span className="stat-icon" aria-hidden="true"><Icon name={icon} size={19} /></span>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function StatsView({ store }: { store: HabitStore }) {
  const { habits, loading } = store;

  if (loading) return <div className="center-loading"><span className="spinner" /></div>;

  const total = habits.length;
  const rate = (days: number) => {
    if (!total) return 0;
    const keys = lastNDays(days);
    let done = 0;
    let cells = 0;
    keys.forEach((k) => {
      cells += total;
      done += habits.filter((h) => h.completions.includes(k)).length;
    });
    return cells ? done / cells : 0;
  };

  const best = habits.reduce((m, h) => Math.max(m, longestStreak(h.completions)), 0);
  const last30 = lastNDays(30);
  const series = last30.map((k) => (total ? habits.filter((h) => h.completions.includes(k)).length / total : 0));

  return (
    <div className="view">
      <div className="stat-grid">
        <StatCard label="7-day rate" value={`${Math.round(rate(7) * 100)}%`} icon="trend" accent="#6366f1" />
        <StatCard label="30-day rate" value={`${Math.round(rate(30) * 100)}%`} icon="badge" accent="#22c55e" />
        <StatCard label="Best streak" value={`${best}d`} icon="flame" accent="#f97316" />
        <StatCard label="Active" value={`${total}`} icon="sprout" accent="#8b5cf6" />
      </div>

      <section className="card">
        <h3 className="section-title">30-day trend</h3>
        <p className="section-sub">Share of your habits completed each day.</p>
        <TrendChart series={series} />
      </section>

      <section className="card">
        <h3 className="section-title">Consistency</h3>
        <p className="section-sub">Last 12 weeks of progress.</p>
        <Heatmap habits={habits} weeks={12} />
      </section>

      {total > 0 && (
        <section className="card">
          <h3 className="section-title">By habit</h3>
          <div className="habit-stats">
            {habits.map((h) => (
              <div key={h.id} className="habit-stat-row">
                <span
                  className="habit-stat-emoji"
                  style={{ backgroundColor: h.color + '22' }}
                  aria-hidden="true"
                >
                  <Icon name={iconFor(h.emoji)} size={20} />
                </span>
                <div className="habit-stat-name">
                  <strong>{h.name}</strong>
                  <small>Best {longestStreak(h.completions)}d</small>
                </div>
                <div className="habit-stat-cur">
                  <span>Current</span>
                  <strong>{currentStreak(h.completions)}d</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
