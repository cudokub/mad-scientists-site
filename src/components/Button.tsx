import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "cosmic-primary";
  size?: "sm" | "md" | "lg";
  theme?: "default" | "cosmic";
  className?: string;
}

const variantStyles = {
  default: {
    primary:
      "bg-green text-[#141414] hover:brightness-110",
    secondary:
      "bg-[rgba(85,212,53,0.12)] border border-green text-green hover:bg-[rgba(85,212,53,0.2)]",
    ghost:
      "text-green hover:text-green-light",
    "cosmic-primary":
      "bg-green text-[#141414] hover:brightness-110",
  },
  cosmic: {
    primary:
      "bg-[rgba(155,89,240,0.24)] border border-cosmic text-[#f4ecff] hover:bg-[rgba(155,89,240,0.36)]",
    secondary:
      "bg-[rgba(155,89,240,0.18)] border border-cosmic/70 text-[#e8dcff] hover:bg-[rgba(155,89,240,0.28)]",
    ghost:
      "text-[#9fe5ff] border border-[#7ed3ff]/45 bg-[rgba(8,18,37,0.65)] hover:text-white hover:border-[#9fe5ff]",
    "cosmic-primary":
      "border border-[#b58cff] text-[#f7efff] bg-[linear-gradient(135deg,rgba(142,76,232,0.85),rgba(62,39,125,0.9))] shadow-[0_0_20px_rgba(155,89,240,0.35)] hover:shadow-[0_0_30px_rgba(155,89,240,0.5)] hover:brightness-110",
  },
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
  theme = "default",
  className = "",
}: ButtonProps) {
  const external = href.startsWith("http");
  const base =
    "flex items-center justify-center font-display font-bold tracking-[0.05em] text-center transition-all";

  const classes = `${base} ${variantStyles[theme][variant]} ${sizeStyles[size]} ${className}`;

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
