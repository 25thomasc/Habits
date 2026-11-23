import type { Habit } from './types';
import { todayKey } from './dates';
import { uid } from './utils';

export const COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f43f5e',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#0ea5e9',
  '#64748b',
];

export function seedHabits(): Habit[] {
  const base = [
    { name: 'Drink 8 glasses of water', emoji: 'drop', color: '#0ea5e9' },
    { name: 'Move for 30 minutes', emoji: 'activity', color: '#22c55e' },
    { name: 'Read for 15 minutes', emoji: 'book', color: '#8b5cf6' },
  ];
  return base.map((b, i) => ({
    id: uid(),
    name: b.name,
    emoji: b.emoji,
    color: b.color,
    createdAt: todayKey(),
    completions: [],
    order: i,
  }));
}
