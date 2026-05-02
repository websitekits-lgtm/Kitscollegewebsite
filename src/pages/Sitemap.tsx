import { Link } from "react-router-dom";
import { Map } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { TOP_NAV } from "@/lib/navigation";
import { DEPARTMENTS } from "@/lib/college";
import { EVENTS } from "@/lib/events";

const sidebar = {
  heading: "Legal",
  links: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Use", to: "/terms" },
    { label: "Sitemap", to: "/sitemap" },
    { label: "Mandatory Disclosure", to: "/mandatory-disclosure" },
  ],
};

const Sitemap = () => (
  <InfoPage
    eyebrow="Find a Page"
    title="Sitemap"
    subtitle="Every page on this website, organised by section, for quick navigation and SEO."
    breadcrumb={[{ label: "Sitemap" }]}
    sidebar={sidebar}
  >
    <div className="not-prose mb-8 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        <Map className="size-6 text-accent shrink-0 mt-1" />
        <p className="text-foreground/85 leading-relaxed">
          This sitemap lists all top-level navigation sections and the pages within each. Use{" "}
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-background text-xs font-mono">Ctrl + K</kbd>{" "}
          for instant search across the whole site.
        </p>
      </div>
    </div>

    <div className="not-prose grid gap-8 sm:grid-cols-2">
      {TOP_NAV.map((item) => {
        const flatLinks = item.links ?? item.groups?.flatMap((g) => g.links) ?? [];
        const hasContent = flatLinks.length > 0 || item.to;
        if (!hasContent) return null;
        return (
          <section key={item.label}>
            <h2 className="font-display text-lg font-semibold mb-3 pb-2 border-b border-border">
              {item.label}
            </h2>
            {item.to && !flatLinks.length && (
              <Link to={item.to} className="block text-sm text-foreground/85 hover:text-accent py-1">
                {item.label} →
              </Link>
            )}
            {item.groups ? (
              <div className="space-y-4">
                {item.groups.map((g) => (
                  <div key={g.label}>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-semibold mb-1.5">
                      {g.label}
                    </p>
                    <ul className="space-y-1">
                      {g.links.map((l) => (
                        <li key={l.to}>
                          <Link to={l.to} className="text-sm text-foreground/85 hover:text-accent">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-1">
                {flatLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-foreground/85 hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}

      {/* Departments — individual pages */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-3 pb-2 border-b border-border">
          Department Pages
        </h2>
        <ul className="space-y-1">
          {DEPARTMENTS.map((d) => (
            <li key={d.slug}>
              <Link to={`/departments/${d.slug}`} className="text-sm text-foreground/85 hover:text-accent">
                {d.code} — {d.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Events — individual pages */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-3 pb-2 border-b border-border">
          Event Detail Pages
        </h2>
        <ul className="space-y-1">
          {EVENTS.map((e) => (
            <li key={e.slug}>
              <Link to={`/events/${e.slug}`} className="text-sm text-foreground/85 hover:text-accent line-clamp-1">
                {e.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Legal */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-3 pb-2 border-b border-border">Legal</h2>
        <ul className="space-y-1">
          <li><Link to="/privacy" className="text-sm text-foreground/85 hover:text-accent">Privacy Policy</Link></li>
          <li><Link to="/terms" className="text-sm text-foreground/85 hover:text-accent">Terms of Use</Link></li>
          <li><Link to="/sitemap" className="text-sm text-foreground/85 hover:text-accent">Sitemap</Link></li>
        </ul>
      </section>
    </div>
  </InfoPage>
);

export default Sitemap;
