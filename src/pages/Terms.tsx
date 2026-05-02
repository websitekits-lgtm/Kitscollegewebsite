import { ScrollText } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";

const sidebar = {
  heading: "Legal",
  links: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Use", to: "/terms" },
    { label: "Sitemap", to: "/sitemap" },
    { label: "Mandatory Disclosure", to: "/mandatory-disclosure" },
    { label: "Code of Ethics", to: "/about/code-of-ethics" },
    { label: "Code of Conduct", to: "/about/code-of-conduct" },
  ],
};

const Terms = () => (
  <InfoPage
    eyebrow="Legal"
    title="Terms of Use"
    subtitle="The terms and conditions governing your use of the KITS Markapur website."
    breadcrumb={[{ label: "Terms of Use" }]}
    sidebar={sidebar}
  >
    <div className="not-prose mb-8 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        <ScrollText className="size-6 text-accent shrink-0 mt-1" />
        <p className="text-foreground/85 leading-relaxed">
          By accessing this website, you agree to comply with the following terms. If you do not
          agree, please discontinue use of this website.
        </p>
      </div>
    </div>

    <h2>Acceptable use</h2>
    <ul>
      <li>This website is provided for the public to learn about KITS Markapur and its programmes.</li>
      <li>Information is intended for personal, non-commercial use unless otherwise indicated.</li>
      <li>You may not attempt to disrupt, hack, scrape, or otherwise misuse the website or its services.</li>
    </ul>

    <h2>Content accuracy</h2>
    <ul>
      <li>We make every effort to keep the information up to date and accurate.</li>
      <li>Some sections — such as fee structure, exam timetables, and statutory documents — may change without prior notice.</li>
      <li>Always cross-verify with the relevant office before relying on critical information for admission, examination, or financial decisions.</li>
    </ul>

    <h2>Intellectual property</h2>
    <ul>
      <li>All content, logos, design, and code on this website are the property of KITS Markapur unless attributed otherwise.</li>
      <li>You may share links to our pages but must not republish, modify, or commercialise our content without written permission.</li>
    </ul>

    <h2>External links</h2>
    <p>
      This website may contain links to external websites (e.g., JNTUK results, AICTE, NAAC). We do not
      control or endorse the content of those sites and are not responsible for their privacy or terms.
    </p>

    <h2>Disclaimer of liability</h2>
    <p>
      KITS Markapur and its representatives shall not be liable for any direct, indirect, incidental,
      or consequential damages arising from your use of this website.
    </p>

    <h2>Changes to these terms</h2>
    <p>
      We may update these Terms of Use periodically. Continued use of the website after such updates
      constitutes acceptance of the changes.
    </p>

    <h2>Contact</h2>
    <p>
      For questions about these terms, write to{" "}
      <a href="mailto:principal@kits-anna.com">principal@kits-anna.com</a>.
    </p>

    <p className="text-sm text-muted-foreground italic mt-8">
      Last reviewed: April 2025.
    </p>
  </InfoPage>
);

export default Terms;
