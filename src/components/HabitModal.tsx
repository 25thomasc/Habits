import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Habit, HabitDraft } from '../lib/types';
import { COLORS } from '../lib/presets';
import { ICON_NAMES, iconFor } from '../lib/icons';
import Icon from './Icon';

interface Props {
  existing: Habit | null;
  onClose: () => void;
  onSave: (data: HabitDraft) => void;
  onDelete: () => void;
}

export default function HabitModal({ existing, onClose, onSave, onDelete }: Props) {
  const [name, setName] = useState(existing?.name ?? '');
  const [icon, setIcon] = useState(iconFor(existing?.emoji ?? ICON_NAMES[0]));
  const [color, setColor] = useState(existing?.color ?? COLORS[0]);

  const canSave = name.trim().length > 0;

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canSave) onSave({ name: name.trim(), emoji: icon, color });
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={existing ? 'Edit habit' : 'New habit'}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKey}
      >
        <div className="modal-head">
          <h2>{existing ? 'Edit habit' : 'New habit'}</h2>
          <button className="icon-btn" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <label className="field">
          <span>What are you building?</span>
          <input
            autoFocus
            value={name}
            maxLength={48}
            placeholder="e.g. Read 20 pages"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <div className="field">
          <span>Icon</span>
          <div className="emoji-grid">
            {ICON_NAMES.map((n) => (
              <button
                key={n}
                className={'emoji-chip' + (n === icon ? ' active' : '')}
                onClick={() => setIcon(n)}
                aria-pressed={n === icon}
                aria-label={n}
              >
                <Icon name={n} size={19} />
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <span>Color</span>
          <div className="color-row">
            {COLORS.map((c) => (
              <button
                key={c}
                className={'color-swatch' + (c === color ? ' active' : '')}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
                aria-label={`Color ${c}`}
                aria-pressed={c === color}
              />
            ))}
          </div>
        </div>

        <div className="modal-preview">
          <div className="preview-card" style={{ '--habit-color': color } as CSSProperties}>
            <span className="preview-emoji" aria-hidden="true"><Icon name={icon} size={22} /></span>
            <div className="preview-text">
              <strong>{name.trim() || 'Your habit'}</strong>
              <small>Ready to go</small>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          {existing && (
            <button className="btn danger" onClick={onDelete}>
              Delete
            </button>
          )}
          <div className="spacer" />
          <button className="btn ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" disabled={!canSave} onClick={() => onSave({ name: name.trim(), emoji: icon, color })}>
            {existing ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
