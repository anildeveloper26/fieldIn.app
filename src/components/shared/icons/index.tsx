type IconProps = { className?: string };

export function LocationPinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function CoinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 15.5c0 1 1 1.5 2.5 1.5s2.5-.6 2.5-1.6c0-2.2-5-1-5-3.3 0-1 1-1.6 2.5-1.6s2.5.5 2.5 1.5" strokeLinecap="round" />
      <path d="M12 6.5v11" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.5 4-5.5 7-5.5s5.8 2 7 5.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function SunIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

export function CloudIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.6A3.5 3.5 0 0 0 7 18Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RainIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M7 15h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.6A3.5 3.5 0 0 0 7 15Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 19v1M12 19v1M16 19v1" strokeLinecap="round" />
    </svg>
  );
}

export function BallIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" strokeLinecap="round" opacity={0.5} />
    </svg>
  );
}

export function CalendarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

export function EyeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.24 4.24M9.5 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a13.5 13.5 0 0 1-3.1 3.9M6.3 6.9C3.7 8.6 2 12 2 12s3.5 7 10 7a10.4 10.4 0 0 0 3.2-.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrophyIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13v3M9 20h6M10 20v-2.5h4V20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SendIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="m3 11 18-7-7 18-2.5-7.5L3 11Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GiftIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x="3" y="9" width="18" height="4" rx="1" />
      <path d="M5 13h14v8H5v-8ZM12 9v12" strokeLinecap="round" />
      <path d="M12 9c-1-3-3-4-4.5-3S6 9 12 9c6 0 5.5-4.5 4.5-6S13 6 12 9Z" strokeLinejoin="round" />
    </svg>
  );
}

export function RecycleIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M7 19H4.8a1.8 1.8 0 0 1-1.5-2.8l1.9-3M17 5h2.2a1.8 1.8 0 0 1 1.5 2.8L19 11M14 3l2.5 2-2.5 2M10 21l-2.5-2 2.5-2M12 3v5M12 16v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

export function ListIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
    </svg>
  );
}

export function ChatIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M4 5h16v11H8l-4 4V5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="m5 12 5 5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.5 6.1 20.6l1.2-6.6-4.8-4.6 6.6-.9L12 2.5Z" />
    </svg>
  );
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function PlusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function UsersIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.9-3.3 3.4-5 6.5-5s5.6 1.7 6.5 5" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 15.4c1.8.6 3 2.2 3.5 4.6" />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function CameraIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function VideoIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function LeafIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
      <path d="M5 19c3-4 6-6 10-8" />
    </svg>
  );
}

export function BoltIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6z" />
    </svg>
  );
}

export function SlidersIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  );
}

export function AlertIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  );
}

export function InfoIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export function LogoMark({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="10" fill="#10B981" />
      <rect x="7" y="9" width="18" height="14" rx="2" fill="none" stroke="#0F172A" strokeWidth="2" />
      <path d="M16 9v14" stroke="#0F172A" strokeWidth="2" />
      <circle cx="16" cy="16" r="3" fill="none" stroke="#0F172A" strokeWidth="2" />
    </svg>
  );
}

/* ---- Sport icons ---- */

export function FootballIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m12 7 4 3-1.5 4.5h-5L8 10z" />
      <path d="M12 7V3.5M16 10l3.5-1.2M14.5 14.5l2 3M9.5 14.5l-2 3M8 10 4.5 8.8" />
    </svg>
  );
}

export function CricketIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <path d="m4 20 2-2M6 18l9.5-9.5 3 3L9 21l-3-3Z" />
      <path d="m15.5 8.5 2-2 3 3-2 2" />
      <circle cx="6" cy="6" r="2.5" />
    </svg>
  );
}

export function BadmintonIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <circle cx="17" cy="17" r="3" />
      <path d="m15 15-9-9M6 6l-2 5 4 1M6 6l5-2 1 4M9.5 9.5l-3 1.5M9.5 9.5l1.5-3" />
    </svg>
  );
}

export function BasketballIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3v18M5.6 5.6c3 2.6 3 10.2 0 12.8M18.4 5.6c-3 2.6-3 10.2 0 12.8" />
    </svg>
  );
}

export function TennisIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.5 5.5c3.5 3 3.5 10 0 13M18.5 5.5c-3.5 3-3.5 10 0 13" />
    </svg>
  );
}

const SPORT_ICON: Record<string, (props: IconProps) => JSX.Element> = {
  Football: FootballIcon,
  Cricket: CricketIcon,
  Badminton: BadmintonIcon,
  Basketball: BasketballIcon,
  Tennis: TennisIcon,
};

export function SportIcon({ sport, className = "h-4 w-4" }: IconProps & { sport: string }) {
  const Icon = SPORT_ICON[sport] ?? BallIcon;
  return <Icon className={className} />;
}
