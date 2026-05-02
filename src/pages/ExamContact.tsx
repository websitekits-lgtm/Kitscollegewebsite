import { Mail, Phone, MapPin, Clock, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";
import { EXAM_CONTACT } from "@/lib/academicsContent";

const sidebar = {
  heading: "Examination",
  links: [
    { label: "External Exams Timetables", to: "/examination/external-timetables" },
    { label: "Internal Exams Timetables", to: "/examination/internal-timetables" },
    { label: "Academic Calendars", to: "/examination/academic-calendars" },
    { label: "Previous Question Papers", to: "/examination/question-papers" },
    { label: "Forms Download", to: "/examination/forms-download" },
    { label: "Contact Details", to: "/examination/contact" },
  ],
};

const ExamContact = () => (
  <InfoPage
    eyebrow="Examination"
    title="Examination Cell — Contact Details"
    subtitle="Reach out to the KITS Examination Cell for help with timetables, results, certificates and revaluation."
    breadcrumb={[{ label: "Examination", to: "/examination" }, { label: "Contact" }]}
    sidebar={sidebar}
  >
    <div className="not-prose grid gap-5 md:grid-cols-2 mb-8">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
            <Phone className="size-5" />
          </div>
          <h3 className="font-display text-lg font-semibold m-0">Controller of Examinations</h3>
        </div>
        <p className="font-medium text-foreground mb-1">{EXAM_CONTACT.controllerName}</p>
        <p className="text-sm text-muted-foreground">{EXAM_CONTACT.designation}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
            <Clock className="size-5" />
          </div>
          <h3 className="font-display text-lg font-semibold m-0">Office Hours</h3>
        </div>
        <p className="text-sm text-foreground/85">{EXAM_CONTACT.officeHours}</p>
      </div>
    </div>

    <div className="not-prose mb-8 rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold mb-5">Get in touch</h3>
      <ul className="space-y-4 text-sm">
        <li className="flex gap-3">
          <Mail className="size-4 mt-0.5 shrink-0 text-accent" />
          <a href={`mailto:${EXAM_CONTACT.email}`} className="text-foreground hover:text-accent break-all">
            {EXAM_CONTACT.email}
          </a>
        </li>
        <li className="flex gap-3">
          <Phone className="size-4 mt-0.5 shrink-0 text-accent" />
          <a href={`tel:${EXAM_CONTACT.phone}`} className="text-foreground hover:text-accent">
            {EXAM_CONTACT.phone}
          </a>
        </li>
        <li className="flex gap-3">
          <MapPin className="size-4 mt-0.5 shrink-0 text-accent" />
          <span className="text-foreground/85">{EXAM_CONTACT.address}</span>
        </li>
      </ul>
      <Button asChild className="mt-6 rounded-sm">
        <a href={`mailto:${EXAM_CONTACT.email}`}>Email the Examination Cell</a>
      </Button>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="size-5 text-accent" />
        <h3 className="font-display text-xl font-semibold m-0">We help with</h3>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {EXAM_CONTACT.helpdesk.map((h, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{h}</span>
          </li>
        ))}
      </ul>
    </div>
  </InfoPage>
);

export default ExamContact;
