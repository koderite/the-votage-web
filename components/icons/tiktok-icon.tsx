interface TikTokIconProps {
  className?: string;
}

export function TikTokIcon({ className }: TikTokIconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.18v12.66a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.58-2.59 2.59 2.59 0 0 1 3.29-2.49V9.84a5.73 5.73 0 0 0-.71-.04A5.78 5.78 0 0 0 4 15.57a5.78 5.78 0 0 0 5.77 5.78 5.78 5.78 0 0 0 5.78-5.78V9.01a7.45 7.45 0 0 0 4.45 1.45V7.28a4.28 4.28 0 0 1-3.4-1.46Z" />
    </svg>
  );
}
