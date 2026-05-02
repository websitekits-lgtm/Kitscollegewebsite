import { useState } from "react";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";

type SubmitterType = "Student" | "Parent" | "Faculty" | "Alumni" | "Visitor";

interface FeedbackSubmission {
  id: string;
  submitterType: SubmitterType;
  name: string;
  email: string;
  category: string;
  rating: number;
  message: string;
  submittedAt: string;
}

const STORAGE_KEY = "kits_feedback_submissions";

const sidebar = {
  heading: "Feedback",
  links: [
    { label: "Submit Feedback", to: "/feedback" },
    { label: "Grievance Redressal", to: "/grievance-cell" },
    { label: "Contact Us", to: "/contact" },
  ],
};

const Feedback = () => {
  const [submitterType, setSubmitterType] = useState<SubmitterType>("Student");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "Academic",
    rating: 4,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: FeedbackSubmission = {
      id: `fb-${Date.now()}`,
      submitterType,
      ...form,
      submittedAt: new Date().toISOString(),
    };
    const existing: FeedbackSubmission[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([submission, ...existing]));
    setSubmitted(true);
    setForm({ name: "", email: "", category: "Academic", rating: 4, message: "" });
  };

  return (
    <InfoPage
      eyebrow="We're Listening"
      title="Feedback"
      subtitle="Help us improve. Share your honest feedback on academics, facilities, and services."
      breadcrumb={[{ label: "Feedback" }]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
        Whether you're a student, parent, faculty member, alumnus, or visitor — your feedback shapes
        how we plan, prioritise, and improve. The IQAC and management review every submission.
      </p>

      <div className="not-prose rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="size-5 text-accent" />
          <h2 className="font-display text-2xl font-semibold m-0">Share your feedback</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">All submissions are confidential.</p>

        {submitted && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800">
            <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Thank you for your feedback!</p>
              <p className="text-sm mt-0.5">It has been recorded and will be reviewed by the IQAC.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">I am a:</label>
            <div className="flex flex-wrap gap-2">
              {(["Student", "Parent", "Faculty", "Alumni", "Visitor"] as SubmitterType[]).map((t) => (
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

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="fbname">Name *</label>
              <input
                id="fbname"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="fbemail">Email *</label>
              <input
                id="fbemail"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="fbcat">Category *</label>
              <select
                id="fbcat"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
              >
                <option>Academic</option>
                <option>Faculty</option>
                <option>Infrastructure</option>
                <option>Library</option>
                <option>Hostel / Mess</option>
                <option>Transport</option>
                <option>Placements</option>
                <option>Sports / Cultural</option>
                <option>Website / Online</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Overall rating</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setForm({ ...form, rating: n })}
                    className={`size-9 rounded-md text-sm font-bold border transition-colors ${
                      form.rating === n
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-card text-foreground/70 border-border hover:bg-secondary/30"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <span className="ml-2 text-xs text-muted-foreground">1 = Poor · 5 = Excellent</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="fbmsg">Your feedback *</label>
            <textarea
              id="fbmsg"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent resize-y"
              placeholder="Tell us what's working well, what could be better, or share a specific experience..."
            />
          </div>

          <Button type="submit" className="rounded-sm w-full sm:w-auto">Submit Feedback</Button>
          <p className="text-xs text-muted-foreground italic">
            * For now, submissions are saved locally on this device. Admin dashboard will collect them centrally once enabled.
          </p>
        </form>
      </div>
    </InfoPage>
  );
};

export default Feedback;
