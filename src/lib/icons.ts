// Monochrome line-icon keys (see components/Icon.tsx).
export const ICON_NAMES = [
  'drop', 'activity', 'book', 'lotus', 'apple', 'moon',
  'dumbbell', 'bulb', 'pen', 'target', 'tooth', 'nosmoke',
  'pill', 'sunrise', 'palette', 'music',
];

// Habits saved before the icon set was emoji strings; map them to the new keys.
const LEGACY_EMOJI: Record<string, string> = {
  '💧': 'drop',
  '🏃': 'activity',
  '📖': 'book',
  '🧘': 'lotus',
  '🥗': 'apple',
  '😴': 'moon',
  '💪': 'dumbbell',
  '🧠': 'bulb',
  '✍️': 'pen',
  '🎯': 'target',
  '🦷': 'tooth',
  '🚭': 'nosmoke',
  '💊': 'pill',
  '🌅': 'sunrise',
  '🎨': 'palette',
  '🎵': 'music',
};

export function iconFor(value: string): string {
  if (LEGACY_EMOJI[value]) return LEGACY_EMOJI[value];
  if (ICON_NAMES.includes(value)) return value;
  return ICON_NAMES[0];
}
