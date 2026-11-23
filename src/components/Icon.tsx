import type { ReactNode } from 'react';

// Minimalist 24x24 stroke icons (SF Symbols style). Monochrome: inherits currentColor.
const ICONS: Record<string, ReactNode> = {
  drop: (
    <path d="M12 3.2c3.6 4.3 5.8 7.4 5.8 10.3a5.8 5.8 0 1 1-11.6 0c0-2.9 2.2-6 5.8-10.3z" />
  ),
  activity: <path d="M3 12h3.8l2.4-6.5 4.6 13 2.4-6.5H21" />,
  book: (
    <>
      <path d="M12 6.3C10.2 4.9 7.8 4.2 4 4.2v14c3.8 0 6.2.7 8 2.1 1.8-1.4 4.2-2.1 8-2.1v-14c-3.8 0-6.2.7-8 2.1z" />
      <path d="M12 6.3v14" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 4.5c1.9 2.3 2.9 4.3 2.9 6.1 0 2-1.2 3.4-2.9 3.4s-2.9-1.4-2.9-3.4c0-1.8 1-3.8 2.9-6.1z" />
      <path d="M8.8 9.8C6.6 10.7 5 12.6 5 15c1.7 1 3.5 1.1 5 .4M15.2 9.8c2.2.9 3.8 2.8 3.8 5.2-1.7 1-3.5 1.1-5 .4" />
      <path d="M4.5 16.5c1.7 2.8 4.4 4.3 7.5 4.3s5.8-1.5 7.5-4.3" />
    </>
  ),
  apple: (
    <>
      <path d="M12 7.6c-.7-1-1.8-1.6-3.1-1.6-2.5 0-4.4 2.2-4.4 5.4 0 4 2.7 9.1 5.1 9.1.9 0 1.6-.4 2.4-.4s1.5.4 2.4.4c2.4 0 5.1-5.1 5.1-9.1 0-3.2-1.9-5.4-4.4-5.4-1.3 0-2.4.6-3.1 1.6z" />
      <path d="M12 7.6c0-2 .8-3.5 2.5-4.6" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z" />,
  dumbbell: (
    <path d="M4 10.5v3M7.5 9v6M16.5 9v6M20 10.5v3M7.5 12h9" />
  ),
  bulb: (
    <>
      <path d="M12 3.5a5.8 5.8 0 0 0-3.4 10.5c.7.5 1.1 1.3 1.2 2.1h4.4c.1-.8.5-1.6 1.2-2.1A5.8 5.8 0 0 0 12 3.5z" />
      <path d="M9.8 19h4.4M10.6 21.2h2.8" />
    </>
  ),
  pen: (
    <>
      <path d="M4.5 19.5l.9-3.6L16.7 4.6a2 2 0 0 1 2.8 2.8L8.2 18.7l-3.7.8z" />
      <path d="M14.5 6.8l2.7 2.7" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  tooth: (
    <path d="M12 5.5c-1.5-1-3.2-1.3-4.5-.6C5.4 6.1 4.8 8.3 5.3 10.6c.6 2.8 2.2 8.9 3.8 8.9 1.5 0 1.4-3.2 2.9-3.2s1.4 3.2 2.9 3.2c1.6 0 3.2-6.1 3.8-8.9.5-2.3-.1-4.5-2.2-5.7-1.3-.7-3-.4-4.5.6z" />
  ),
  nosmoke: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M6.2 6.2l11.6 11.6" />
    </>
  ),
  pill: (
    <>
      <rect x="5.5" y="9.75" width="13" height="4.5" rx="2.25" transform="rotate(-45 12 12)" />
      <path d="M9.8 9.8l4.4 4.4" />
    </>
  ),
  sunrise: (
    <>
      <path d="M8 18a4 4 0 0 1 8 0" />
      <path d="M12 11.5V8.5M6.5 14.8l-1.4-1.4M17.5 14.8l1.4-1.4" />
      <path d="M3.5 18h17" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 .4 17c1.4 0 2.1-.8 2.1-1.8 0-.9-.6-1.4-.6-2.2 0-1 .8-1.7 2-1.7h1.6c1.7 0 3-1.4 3-3.2A8.5 8.5 0 0 0 12 3.5z" />
      <circle cx="7.6" cy="10.4" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.9" cy="7.6" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  music: (
    <>
      <path d="M9.5 17.5V6.2l10-2v11.3" />
      <circle cx="7" cy="17.5" r="2.5" />
      <circle cx="17" cy="15.5" r="2.5" />
    </>
  ),
  trend: (
    <>
      <path d="M3.5 17.5l5-5.5 3.8 3 7-7.5" />
      <path d="M14.5 7.5H19V12" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M8.3 12.2l2.5 2.5 5-5.5" />
    </>
  ),
  flame: (
    <>
      <path d="M12 3c3.5 3 6 6.2 6 9.5a6 6 0 0 1-12 0C6 9.2 8.5 6 12 3z" />
      <path d="M12 9.5c1.5 1.7 2.4 3 2.4 4.3a2.4 2.4 0 0 1-4.8 0c0-1.3.9-2.6 2.4-4.3z" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20.5V13" />
      <path d="M12 13c-.2-3.4-2.4-5.5-5.8-5.7-.2 3.4 2 5.5 5.8 5.7z" />
      <path d="M12 13c.2-3.4 2.4-5.5 5.8-5.7.2 3.4-2 5.5-5.8 5.7z" />
      <path d="M7 20.5h10" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
};

interface IconProps {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function Icon({ name, size = 22, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name] ?? ICONS.check}
    </svg>
  );
}
