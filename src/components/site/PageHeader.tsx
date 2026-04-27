import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; to?: string }[];
  children?: ReactNode;
}

export const PageHeader = ({ eyebrow, title, subtitle, breadcrumb, children }: PageHeaderProps) => {
  return (
    <section className="relative ink-bg text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="container-tight relative pt-24 pb-20 md:pt-32 md:pb-28">
        {breadcrumb && (
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-accent">Home</Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="size-3" />
                {b.to ? <Link to={b.to} className="hover:text-accent">{b.label}</Link> : <span className="text-primary-foreground/90">{b.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">{eyebrow}</p>}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-balance max-w-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base sm:text-lg text-primary-foreground/70 text-balance">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};
