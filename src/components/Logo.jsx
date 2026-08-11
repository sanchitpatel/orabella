// Le Roma Samsara — hexagon monogram mark.
// Simple geometric brand mark (hexagon shell + stylized "LS" emblem) rendered inline
// so it inherits currentColor and scales crisply at any size.
export default function Logo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 108"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hexagon outer shell */}
      <path
        d="M50 3 L91 26.5 V80.5 L50 104 L9 80.5 V26.5 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Inner hairline hexagon for a machined double-bezel feel */}
      <path
        d="M50 13 L82.5 31.7 V69.3 L50 88 L17.5 69.3 V31.7 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        strokeLinejoin="round"
      />
      {/* Stylized emblem: an abstract lotus / flame motif */}
      <path
        d="M50 32 C56 42 62 48 62 58 C62 66 56.5 72 50 72 C43.5 72 38 66 38 58 C38 48 44 42 50 32 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M50 46 C52.5 51 55 54.5 55 59 C55 63 52.8 66 50 66 C47.2 66 45 63 45 59 C45 54.5 47.5 51 50 46 Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
}
