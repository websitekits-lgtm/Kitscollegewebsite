import { Phone, Mail, MapPin } from "lucide-react";
import { COLLEGE } from "@/lib/college";

export const TopContactBar = () => {
  return (
    <div className="hidden md:block border-b border-border/60 bg-primary text-primary-foreground">
      <div className="container-tight flex items-center justify-between gap-6 py-2 text-xs">
        <div className="flex items-center gap-6">
          <a href={`tel:${COLLEGE.phones[0]}`} className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors">
            <Phone className="size-3.5" />
            <span>{COLLEGE.phones.join(" / ")}</span>
          </a>
          <a href={`mailto:${COLLEGE.email}`} className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors">
            <Mail className="size-3.5" />
            <span>{COLLEGE.email}</span>
          </a>
        </div>
        <div className="flex items-center gap-2 text-primary-foreground/70">
          <MapPin className="size-3.5" />
          <span>Markapur, Prakasam Dist., AP</span>
        </div>
      </div>
    </div>
  );
};
