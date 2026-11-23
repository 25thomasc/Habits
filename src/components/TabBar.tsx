import type { ReactNode } from 'react';

export type Tab = 'today' | 'stats';

interface Props {
  active: Tab;
  onChange: (t: Tab) => void;
}

const items: { id: Tab; label: string; icon: ReactNode }[] = [
  {
    id: 'today',
    label: 'Today',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 14l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'stats',
    label: 'Stats',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function TabBar({ active, onChange }: Props) {
  return (
    <nav className="tabbar" aria-label="Primary">
      {items.map((it) => (
        <button
          key={it.id}
          className={'tab-item' + (active === it.id ? ' active' : '')}
          onClick={() => onChange(it.id)}
          aria-current={active === it.id ? 'page' : undefined}
        >
          <span className="tab-icon">{it.icon}</span>
          <span className="tab-label">{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
