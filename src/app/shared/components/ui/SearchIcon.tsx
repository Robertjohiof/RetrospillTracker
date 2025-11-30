"use client";

interface SearchIconProps {
  className?: string;
}

export default function SearchIcon({ className }: SearchIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Sirkel */}
      <circle cx="11" cy="11" r="6" />
      {/* Håndtak */}
      <line x1="16" y1="16" x2="20" y2="20" />
    </svg>
  );
}
