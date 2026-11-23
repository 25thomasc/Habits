import { useCallback, useEffect, useState } from 'react';
import type { Habit, HabitDraft } from '../lib/types';
import { loadHabits, saveAll } from '../lib/storage';
import { seedHabits } from '../lib/presets';
import { todayKey } from '../lib/dates';
import { uid } from '../lib/utils';

export interface HabitStore {
  habits: Habit[];
  loading: boolean;
  addHabit: (data: HabitDraft) => void;
  updateHabit: (id: string, data: HabitDraft) => void;
  deleteHabit: (id: string) => void;
  toggleToday: (id: string) => void;
}

export function useHabits(): HabitStore {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        let h = await loadHabits();
        if (h.length === 0) {
          h = seedHabits();
          await saveAll(h);
        }
        if (alive) setHabits(h);
      } catch (e) {
        console.error('Failed to load habits', e);
        if (alive) setHabits([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const addHabit = useCallback((data: HabitDraft) => {
    setHabits((prev) => {
      const h: Habit = {
        id: uid(),
        ...data,
        createdAt: todayKey(),
        completions: [],
        order: prev.length,
      };
      const next = [...prev, h];
      saveAll(next).catch((e) => console.error('save failed', e));
      return next;
    });
  }, []);

  const updateHabit = useCallback((id: string, data: HabitDraft) => {
    setHabits((prev) => {
      const next = prev.map((h) => (h.id === id ? { ...h, ...data } : h));
      saveAll(next).catch((e) => console.error('save failed', e));
      return next;
    });
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => {
      const next = prev.filter((h) => h.id !== id);
      saveAll(next).catch((e) => console.error('save failed', e));
      return next;
    });
  }, []);

  const toggleToday = useCallback((id: string) => {
    const key = todayKey();
    setHabits((prev) => {
      const next = prev.map((h) => {
        if (h.id !== id) return h;
        const has = h.completions.includes(key);
        const completions = has
          ? h.completions.filter((c) => c !== key)
          : [...h.completions, key].sort();
        return { ...h, completions };
      });
      saveAll(next).catch((e) => console.error('save failed', e));
      return next;
    });
  }, []);

  return { habits, loading, addHabit, updateHabit, deleteHabit, toggleToday };
}

export type { Habit };
