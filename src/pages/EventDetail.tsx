import { Link, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { EVENTS, formatEventDate } from "@/lib/events";
import NotFound from "@/pages/NotFound";

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = EVENTS.find((e) => e.slug === slug);

  if (!event) return <NotFound />;

  // Related events: same category, exclude current one
  const related = EVENTS.filter((e) => e.category === event.category && e.slug !== event.slug).slice(0, 3);

  return (
    <SiteLayout>
      <article className="bg-background py-12 md:py-16">
        <div className="container-tight max-w-4xl">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 text-accent" />
              {formatEventDate(event.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Tag className="size-3.5 text-accent" />
              <span className="uppercase tracking-[0.18em] text-accent font-medium">
                {event.category}
              </span>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-8">
            {event.title}
          </h1>

          {/* Hero image — fixed aspect ratio, properly cropped */}
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-elegant)] mb-10 max-w-3xl mx-auto aspect-[16/9] bg-muted">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Body */}
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 not-prose">{event.excerpt}</p>
            {event.body.map((para, i) => (
              <p key={i} className="text-base text-foreground/90 leading-relaxed mb-5">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Related events */}
      {related.length > 0 && (
        <section className="bg-background bg-tint-soft py-16 md:py-20 border-t border-border">
          <div className="container-tight">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">
              More from <span className="italic font-light text-muted-foreground">{event.category}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/events/${r.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-500"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground mb-2">{formatEventDate(r.date)}</p>
                    <h3 className="font-display text-base font-semibold leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-background py-12 border-t border-border">
        <div className="container-tight text-center">
          <Button asChild variant="outline" className="rounded-sm">
            <Link to="/">
              <ArrowLeft className="size-4" /> Back to home
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default EventDetail;
