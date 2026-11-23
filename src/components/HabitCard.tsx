import type { CSSProperties } from 'react';
import type { Habit } from '../lib/types';
import { iconFor } from '../lib/icons';
import Icon from './Icon';

interface Props {
  habit: Habit;
  done: boolean;
  streak: number;
  onToggle: () => void;
  onEdit: () => void;
}

export default function HabitCard({ habit, done, streak, onToggle, onEdit }: Props) {
  return (
    <div
      className={'habit-card' + (done ? ' done' : '')}
      style={{ '--habit-color': habit.color } as CSSProperties}
    >
      <div className="habit-emoji" aria-hidden="true">
        <Icon name={iconFor(habit.emoji)} size={24} />
      </div>

      <div className="habit-info">
        <h4 className="habit-name">{habit.name}</h4>
        <span className="habit-streak">
          {streak > 0 ? (
            <>
              <span className="flame"><Icon name="flame" size={13} strokeWidth={2} /></span>
              {streak}-day streak
            </>
          ) : (
            <span className="muted">Tap to start a streak</span>
          )}
        </span>
      </div>

      <div className="habit-actions">
        <button className="icon-btn" aria-label={`Edit ${habit.name}`} onClick={onEdit}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="5" r="1.7" />
            <circle cx="12" cy="12" r="1.7" />
            <circle cx="12" cy="19" r="1.7" />
          </svg>
        </button>

        <button
          className={'check-btn' + (done ? ' on' : '')}
          aria-pressed={done}
          aria-label={done ? `Mark ${habit.name} as not done` : `Mark ${habit.name} as done`}
          onClick={onToggle}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M5 12.5l4.5 4.5L19 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
