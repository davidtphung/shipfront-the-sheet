export function ShipfrontMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="17" y="16" width="12" height="8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15 12 H21 V16" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="12" r="1.2" fill="currentColor" />
      <circle cx="23" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}
