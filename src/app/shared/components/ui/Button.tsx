import { React } from "rwsdk/client";

type Variant = "none" | "glow" | "secondary" | "ghost";
type Size = "none" | "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
};

const variants: Record<Variant, string> = {
  none: "",
  glow: "btn-glow",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const sizes: Record<Size, string> = {
  none: "",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "glow",
  size = "none",
  isLoading,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        "font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading ? "Working..." : children}
    </button>
  );
}
