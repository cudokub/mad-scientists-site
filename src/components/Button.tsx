import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles = {
  primary:
    "bg-green text-[#141414] hover:brightness-110",
  secondary:
    "bg-[rgba(85,212,53,0.12)] border border-green text-green hover:bg-[rgba(85,212,53,0.2)]",
  ghost:
    "text-green hover:text-green-light",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-4 py-3 text-sm md:text-base",
  lg: "px-6 py-4 text-base md:text-lg",
};

export default function Button({
  children,
  href,
  variant = "secondary",
  size = "md",
  className = "",
}: ButtonProps) {
  const external = href.startsWith("http");
  const base =
    "flex items-center justify-center font-display font-bold tracking-[0.05em] text-center transition-all";

  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
