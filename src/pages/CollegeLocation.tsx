import { MapPin, Bus, Train, Plane, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";
import { COLLEGE_LOCATION } from "@/lib/aboutContent";

const sidebar = {
  heading: "About KITS",
  links: [
    { label: "Vision & Mission", to: "/about/vision-mission" },
    { label: "Organization Chart", to: "/about/organization-chart" },
    { label: "Governing Body", to: "/about/governing-body" },
    { label: "College Location", to: "/about/college-location" },
    { label: "Chairman", to: "/about/chairman" },
    { label: "Secretary & Correspondent", to: "/about/secretary" },
    { label: "Principal", to: "/about/principal" },
  ],
};

const ICONS = { "By Road": Bus, "By Train": Train, "By Air": Plane };

const CollegeLocation = () => {
  return (
    <InfoPage
      eyebrow="About KITS"
      title="College Location"
      subtitle="Find us, plan your visit, and explore the routes to reach our Markapur campus."
      breadcrumb={[{ label: "About", to: "/about" }, { label: "College Location" }]}
      sidebar={sidebar}
    >
      {/* Address */}
      <div className="not-prose mb-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-start gap-4">
          <div className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent shrink-0">
            <MapPin className="size-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold mb-2">Campus Address</h3>
            <address className="not-italic text-foreground/85 leading-relaxed">
              {COLLEGE_LOCATION.address.line1}
              <br />
              {COLLEGE_LOCATION.address.line2}
              <br />
              {COLLEGE_LOCATION.address.line3}
              <br />
              {COLLEGE_LOCATION.address.line4}
            </address>
            <Button asChild className="mt-5 rounded-sm">
              <a href={COLLEGE_LOCATION.mapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Map embed */}
      <div className="not-prose mb-10 rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)] aspect-[16/9] sm:aspect-[21/9]">
        <iframe
          src={COLLEGE_LOCATION.mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="KITS Markapur location on Google Maps"
        />
      </div>

      {/* How to reach */}
      <div className="not-prose">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
          How to Reach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLLEGE_LOCATION.howToReach.map((item) => {
            const Icon = ICONS[item.mode as keyof typeof ICONS] ?? Bus;
            return (
              <div
                key={item.mode}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent mb-3">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-base font-semibold mb-2">{item.mode}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </InfoPage>
  );
};

export default CollegeLocation;
