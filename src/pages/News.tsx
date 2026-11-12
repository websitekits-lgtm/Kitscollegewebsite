import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { formatEventDate } from "@/lib/events";
import { usePosts } from "@/lib/usePosts";
import { cn } from "@/lib/utils";

/** All published posts (Admin → Posts), filterable by category. */
const News = () => {
  const { posts } = usePosts();
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const visible = filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="News"
        title="News, Events & Achievements"
        subtitle="Wins, milestones, circulars and moments from across the campus."
        breadcrumb={[{ label: "News & Events" }]}
      />
      <section className="py-12 md:py-16 bg-background">
        <div className="container-tight">
          {categories.length > 2 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={cn(
                    "px-4 py-2 rounded-sm text-sm font-medium border transition-colors",
                    filter === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground/70 hover:text-foreground hover:border-foreground/40",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {visible.length === 0 && <p className="text-sm text-muted-foreground">No posts yet.</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((p) => (
              <Link
                key={p.slug}
                to={`/events/${p.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] rounded-full bg-accent text-accent-foreground shadow-md">
                    {p.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <p className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2">
                    <Calendar className="size-3.5 text-accent" /> {formatEventDate(p.date)}
                  </p>
                  <h2 className="font-display text-lg font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">{p.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-grow">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read more <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default News;
