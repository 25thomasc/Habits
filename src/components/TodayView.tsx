import type { CSSProperties } from 'react';
import type { HabitStore } from '../hooks/useHabits';
import { todayKey } from '../lib/dates';
import { currentStreak } from '../lib/streaks';
import HabitCard from './HabitCard';
import Icon from './Icon';

interface Props {
  store: HabitStore;
  onEdit: (id: string) => void;
  onAdd: () => void;
}

export default function TodayView({ store, onEdit, onAdd }: Props) {
  const { habits, loading, toggleToday } = store;
  const key = todayKey();
  const done = habits.filter((h) => h.completions.includes(key)).length;
  const total = habits.length;
  const pct = total ? done / total : 0;
  const allDone = total > 0 && done === total;

  if (loading) return <div className="center-loading"><span className="spinner" /></div>;

  return (
    <div className="view">
      <section className="progress-card" aria-label="Today's progress">
        <div className="ring" style={{ '--pct': pct } as CSSProperties}>
          <svg viewBox="0 0 36 36" className="ring-svg" aria-hidden="true">
            <circle className="ring-track" cx="18" cy="18" r="15.915" pathLength={100} />
            <circle
              className="ring-fill"
              cx="18"
              cy="18"
              r="15.915"
              pathLength={100}
              strokeDasharray={`${(pct * 100).toFixed(1)} 100`}
            />
          </svg>
          <div className="ring-label">
            <strong>{Math.round(pct * 100)}%</strong>
            <small>done</small>
          </div>
        </div>
        <div className="progress-text">
          <h3>{allDone ? 'All done!' : `${done} of ${total} done`}</h3>
          <p>
            {allDone
              ? 'Outstanding — the streak is alive.'
              : 'Tap the check on each habit you completed today.'}
          </p>
        </div>
      </section>

      {habits.length === 0 ? (
        <button className="empty-state" onClick={onAdd}>
          <div className="empty-icon"><Icon name="sprout" size={38} strokeWidth={1.5} /></div>
          <h4>No habits yet</h4>
          <p>Tap here or the + button to add your first habit.</p>
        </button>
      ) : (
        <div className="habit-list">
          {habits.map((h) => (
            <HabitCard
              key={h.id}
              habit={h}
              done={h.completions.includes(key)}
              streak={currentStreak(h.completions)}
              onToggle={() => toggleToday(h.id)}
              onEdit={() => onEdit(h.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
