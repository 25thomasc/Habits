import { addDays, parseKey, todayKey } from './dates';

/**
 * Consecutive completed days ending today (or yesterday, if today is not yet
 * logged, so an in-progress streak is not shown as broken).
 */
export function currentStreak(completions: string[], today: Date = new Date()): number {
  const set = new Set(completions);
  let d = today;
  if (!set.has(todayKey(d))) d = addDays(d, -1);
  let s = 0;
  while (set.has(todayKey(d))) {
    s++;
    d = addDays(d, -1);
  }
  return s;
}

/** Longest run of consecutive completed days ever recorded. */
export function longestStreak(completions: string[]): number {
  const set = new Set(completions);
  if (set.size === 0) return 0;
  const dates = Array.from(set).sort().map(parseKey);
  let best = 1;
  let run = 1;
  for (let i = 1; i < dates.length; i++) {
    if (todayKey(addDays(dates[i - 1], 1)) === todayKey(dates[i])) {
      run++;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  return best;
}
