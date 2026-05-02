import { Shield } from "lucide-react";
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

const Privacy = () => (
  <InfoPage
    eyebrow="Legal"
    title="Privacy Policy"
    subtitle="How we handle the personal information collected through this website."
    breadcrumb={[{ label: "Privacy Policy" }]}
    sidebar={sidebar}
  >
    <div className="not-prose mb-8 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        <Shield className="size-6 text-accent shrink-0 mt-1" />
        <p className="text-foreground/85 leading-relaxed">
          Krishna Chaitanya Institute of Technology &amp; Sciences ("KITS Markapur", "we", "us") respects
          your privacy and is committed to protecting any personal information you share with us
          through this website.
        </p>
      </div>
    </div>

    <h2>What information we collect</h2>
    <ul>
      <li>Information you voluntarily provide via forms — name, email, phone, address, and the contents of your message.</li>
      <li>Anonymous browsing data — pages visited, browser type, and session timestamps for analytics.</li>
      <li>Cookies for essential website functions (we do not use third-party advertising cookies).</li>
    </ul>

    <h2>How we use your information</h2>
    <ul>
      <li>To respond to admission queries, grievances, feedback, or contact requests.</li>
      <li>To send official communications about admissions, events, and academic notices.</li>
      <li>To improve the website experience based on aggregate usage patterns.</li>
      <li>To comply with legal obligations and responses to authorised authorities.</li>
    </ul>

    <h2>How we protect your information</h2>
    <ul>
      <li>Submitted form data is currently stored locally on your device until our admin dashboard is enabled.</li>
      <li>Once admin is live, data will be stored on secured servers with encrypted backups.</li>
      <li>Access to your data is limited to authorised institutional staff only.</li>
    </ul>

    <h2>Information sharing</h2>
    <p>
      We do not sell, rent, or trade your personal information to third parties. We may share information only:
    </p>
    <ul>
      <li>With university affiliates (e.g., JNTUK) where required for academic purposes.</li>
      <li>With statutory bodies (AICTE, UGC, NAAC) for regulatory reporting.</li>
      <li>When required by law or to protect institutional rights.</li>
    </ul>

    <h2>Your rights</h2>
    <ul>
      <li>You may request a copy of personal information we hold about you.</li>
      <li>You may request correction or deletion of inaccurate information.</li>
      <li>You may opt out of email communications at any time.</li>
    </ul>

    <h2>Contact</h2>
    <p>
      For privacy-related questions, write to{" "}
      <a href="mailto:principal@kits-anna.com">principal@kits-anna.com</a>.
    </p>

    <p className="text-sm text-muted-foreground italic mt-8">
      This policy may be updated periodically. Last reviewed: April 2025.
    </p>
  </InfoPage>
);

export default Privacy;
