type ArrowIconProps = {
  direction?: "external" | "up";
  className?: string;
};

export function ArrowIcon({ direction = "external", className = "" }: ArrowIconProps) {
  return (
    <svg
      className={`arrow-icon ${className}`.trim()}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {direction === "up" ? (
        <path d="M6 10V2M2.75 5.25 6 2l3.25 3.25" />
      ) : (
        <path d="M2.25 9.75 9.75 2.25M4.25 2.25h5.5v5.5" />
      )}
    </svg>
  );
}
