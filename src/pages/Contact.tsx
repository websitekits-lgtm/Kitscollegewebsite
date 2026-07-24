import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionReveal } from "@/components/site/SectionReveal";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COLLEGE } from "@/lib/college";
import { supabase } from "@/lib/supabaseClient";

const Contact = () => {
  const fullAddress = `${COLLEGE.address.line1}, ${COLLEGE.address.line2}`;
  const mapsQuery = encodeURIComponent("Krishna Chaitanya Institute of Technology and Sciences Markapur");
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supabase) {
      await supabase.from("contact_messages").insert(form);
    }
    setSent(true);
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Get in Touch"
        title="We'd love to hear from you."
        subtitle="Reach out for admissions, campus visits, partnerships or any general inquiry — our team responds within one working day."
        breadcrumb={[{ label: "Contact" }]}
      />

      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight grid lg:grid-cols-3 gap-6" staggerChildren>
          {[
            { icon: Phone, t: "Call Anytime", lines: COLLEGE.phones, hrefBase: "tel:" },
            { icon: Mail, t: "Send Email", lines: [COLLEGE.email], hrefBase: "mailto:" },
            { icon: MapPin, t: "Visit Office", lines: [COLLEGE.address.line1, COLLEGE.address.line2] },
          ].map((c) => (
            <div data-reveal key={c.t} className="rounded-md border border-border bg-card p-7">
              <div className="size-11 rounded-sm border border-accent/30 bg-accent/5 grid place-items-center text-accent mb-4">
                <c.icon className="size-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{c.t}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                {c.lines.map((l) => (
                  c.hrefBase ? (
                    <a key={l} href={`${c.hrefBase}${l}`} className="block hover:text-accent transition-colors break-all">{l}</a>
                  ) : (
                    <p key={l}>{l}</p>
                  )
                ))}
              </div>
            </div>
          ))}
        </SectionReveal>
      </section>

      <section className="py-10 md:py-12 bg-background">
        <SectionReveal className="container-tight grid lg:grid-cols-12 gap-8" staggerChildren>
          <div data-reveal className="lg:col-span-5 rounded-md border border-border bg-card p-7 md:p-9">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">Send us a message</h2>
            <p className="text-sm text-muted-foreground mb-6">Fill the form and our team will get back to you shortly.</p>
            {sent && (
              <div className="mb-5 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800">
                <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">Message sent! Our team will get back to you within one working day.</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="cn">Name</Label><Input id="cn" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="space-y-2"><Label htmlFor="cp">Phone</Label><Input id="cp" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="ce">Email</Label><Input id="ce" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="cs">Subject</Label><Input id="cs" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="cm">Message</Label><Textarea id="cm" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
              <Button type="submit" className="w-full rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 h-11">
                Send Message <Send className="size-4" />
              </Button>
            </form>
          </div>

          <div data-reveal className="lg:col-span-7 rounded-md border border-border overflow-hidden bg-card min-h-[420px]">
            <iframe
              title="KITS Markapur Location"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              className="w-full h-full min-h-[420px] block"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </SectionReveal>
        <p className="container-tight text-xs text-muted-foreground mt-3">{fullAddress}</p>
      </section>
    </SiteLayout>
  );
};

export default Contact;
