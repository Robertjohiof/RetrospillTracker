import { React } from "rwsdk/client";

type Variant = "none" | "glow" | "secondary" | "ghost" | "navlink";
type Size = "none" | "sm" | "md" | "lg";

export type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

const variants: Record<Variant, string> = {
  none: "",
  glow: "btn-glow",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  navlink: "nav-link",
};

const sizes: Record<Size, string> = {
  none: "",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

export function LinkButton({
  variant = "glow",
  size = "none",
  className = "",
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <a
      className={[
        "inline-block font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </a>
  );
}
