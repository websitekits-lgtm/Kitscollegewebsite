import { useState } from "react";
import { ShieldAlert, FileText, Users, ListChecks, Ban, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";
import { GRIEVANCE_CELL } from "@/lib/aboutContent";

type SubmitterType = "Parent" | "Student" | "Teaching Staff" | "Non-Teaching Staff" | "Others";

interface GrievanceSubmission {
  id: string;
  submitterType: SubmitterType;
  name: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const STORAGE_KEY = "kits_grievance_submissions";

const sidebar = {
  heading: "Quick Links",
  links: [
    { label: "Anti-Ragging", to: "/student-corner" },
    { label: "Student Welfare", to: "/student-corner" },
    { label: "Internal Complaint Committee", to: "/about/icc" },
    { label: "Contact Office", to: "/contact" },
  ],
};

const GrievanceCell = () => {
  const [submitterType, setSubmitterType] = useState<SubmitterType>("Student");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Academic",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submission: GrievanceSubmission = {
      id: `grv-${Date.now()}`,
      submitterType,
      ...form,
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage (admin will read these later)
    const existing: GrievanceSubmission[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify([submission, ...existing]));

    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", category: "Academic", subject: "", message: "" });
  };

  return (
    <InfoPage
      eyebrow="Student Welfare"
      title="Grievance Redressal Cell"
      subtitle="A dedicated, confidential channel for resolving student concerns fairly and promptly."
      breadcrumb={[{ label: "Grievance Cell" }]}
      sidebar={sidebar}
    >
      {/* Objective */}
      <div className="not-prose mb-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-start gap-4">
          <ShieldAlert className="size-6 text-accent shrink-0 mt-1" />
          <div>
            <h3 className="font-display text-lg font-semibold mb-2">Objective</h3>
            <p className="text-foreground/85 leading-relaxed">{GRIEVANCE_CELL.objective}</p>
          </div>
        </div>
      </div>

      {/* Scope */}
      <div className="not-prose mb-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <FileText className="size-6 text-accent shrink-0 mt-1" />
          <div>
            <h3 className="font-display text-lg font-semibold mb-2">Scope</h3>
            <p className="text-foreground/85 leading-relaxed">{GRIEVANCE_CELL.scope}</p>
          </div>
        </div>
      </div>

      {/* Procedure */}
      <div className="not-prose mb-8">
        <div className="flex items-center gap-3 mb-5">
          <ListChecks className="size-6 text-accent" />
          <h2 className="font-display text-2xl font-semibold m-0">Procedure</h2>
        </div>
        <ol className="space-y-3">
          {GRIEVANCE_CELL.procedure.map((step, i) => (
            <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                {i + 1}
              </span>
              <span className="text-foreground/85 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Committee */}
      <div className="not-prose mb-8">
        <div className="flex items-center gap-3 mb-5">
          <Users className="size-6 text-accent" />
          <h2 className="font-display text-2xl font-semibold m-0">Committee Members</h2>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/10">
                <th className="text-left px-4 sm:px-5 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Name</th>
                <th className="text-left px-4 sm:px-5 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden sm:table-cell">Designation</th>
                <th className="text-left px-4 sm:px-5 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Role</th>
              </tr>
            </thead>
            <tbody>
              {GRIEVANCE_CELL.committee.map((m, i) => (
                <tr key={i} className="border-b border-border last:border-b-0">
                  <td className="px-4 sm:px-5 py-3 font-medium">{m.name}</td>
                  <td className="px-4 sm:px-5 py-3 text-muted-foreground hidden sm:table-cell">{m.designation}</td>
                  <td className="px-4 sm:px-5 py-3 text-accent">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exclusions */}
      <div className="not-prose mb-10">
        <div className="flex items-center gap-3 mb-5">
          <Ban className="size-6 text-destructive" />
          <h2 className="font-display text-2xl font-semibold m-0">Exclusions</h2>
        </div>
        <ul className="space-y-2">
          {GRIEVANCE_CELL.exclusions.map((e, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/85">
              <span className="mt-2 size-1.5 rounded-full bg-destructive shrink-0" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Submission Form */}
      <div className="not-prose rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold mb-2">Submit a Grievance</h2>
        <p className="text-sm text-muted-foreground mb-6">
          All submissions are confidential and reviewed within 7 working days.
        </p>

        {submitted && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800">
            <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Grievance submitted successfully.</p>
              <p className="text-sm mt-0.5">
                Your reference will be reviewed by the committee. We'll get back to you shortly.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Submitter type */}
          <div>
            <label className="block text-sm font-medium mb-2">I am a:</label>
            <div className="flex flex-wrap gap-2">
              {(["Parent", "Student", "Teaching Staff", "Non-Teaching Staff", "Others"] as SubmitterType[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setSubmitterType(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    submitterType === t
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card text-foreground/80 border-border hover:bg-secondary/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Phone + Category */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone *</label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="category">Category *</label>
              <select
                id="category"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
              >
                <option>Academic</option>
                <option>Financial</option>
                <option>Hostel / Mess</option>
                <option>Transport</option>
                <option>Sanitation</option>
                <option>Discipline</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="subject">Subject *</label>
            <input
              id="subject"
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="message">Description *</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent resize-y"
              placeholder="Please describe the grievance in detail. Include relevant dates, places, or names if needed."
            />
          </div>

          <Button type="submit" className="rounded-sm w-full sm:w-auto">
            Submit Grievance
          </Button>

          <p className="text-xs text-muted-foreground italic">
            * For now, submissions are saved locally on this device. Admin dashboard will collect them centrally once enabled.
          </p>
        </form>
      </div>
    </InfoPage>
  );
};

export default GrievanceCell;
