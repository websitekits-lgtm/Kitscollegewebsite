import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";
import { PLACEMENT_CONTACT } from "@/lib/placementContent";
import { usePageTexts } from "@/lib/usePageTexts";
import { placementSidebar } from "./PlacementSidebar";

const PlacementContact = () => {
  const c = usePageTexts("placements/contact", {
    tpoName: PLACEMENT_CONTACT.tpoName,
    email: PLACEMENT_CONTACT.email,
    phone: PLACEMENT_CONTACT.phone,
    address: PLACEMENT_CONTACT.address,
    officeHours: PLACEMENT_CONTACT.officeHours,
  });
  return (
  <InfoPage
    eyebrow="Training & Placement"
    title="Contact the Placement Cell"
    subtitle="For recruiter relationships, internship coordination, or career counselling."
    breadcrumb={[{ label: "Placements", to: "/placements" }, { label: "Contact" }]}
    sidebar={placementSidebar}
  >
    <div className="not-prose grid gap-5 md:grid-cols-2 mb-8">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
            <Phone className="size-5" />
          </div>
          <h3 className="font-display text-lg font-semibold m-0">{c.tpoName}</h3>
        </div>
        <p className="text-sm text-muted-foreground">Single point of contact for all placement-related queries.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
            <Clock className="size-5" />
          </div>
          <h3 className="font-display text-lg font-semibold m-0">Office Hours</h3>
        </div>
        <p className="text-sm text-foreground/85">{c.officeHours}</p>
      </div>
    </div>

    <div className="not-prose rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold mb-5">Get in touch</h3>
      <ul className="space-y-4 text-sm">
        <li className="flex gap-3">
          <Mail className="size-4 mt-0.5 shrink-0 text-accent" />
          <a href={`mailto:${c.email}`} className="text-foreground hover:text-accent break-all">
            {c.email}
          </a>
        </li>
        <li className="flex gap-3">
          <Phone className="size-4 mt-0.5 shrink-0 text-accent" />
          <a href={`tel:${c.phone}`} className="text-foreground hover:text-accent">
            {c.phone}
          </a>
        </li>
        <li className="flex gap-3">
          <MapPin className="size-4 mt-0.5 shrink-0 text-accent" />
          <span className="text-foreground/85">{c.address}</span>
        </li>
      </ul>
      <Button asChild className="mt-6 rounded-sm">
        <a href={`mailto:${c.email}`}>Email the Placement Cell</a>
      </Button>
    </div>
  </InfoPage>
  );
};

export default PlacementContact;
