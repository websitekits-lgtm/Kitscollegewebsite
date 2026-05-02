import { Users } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { GOVERNING_BODY } from "@/lib/aboutContent";

const sidebar = {
  heading: "About KITS",
  links: [
    { label: "Vision & Mission", to: "/about/vision-mission" },
    { label: "Organization Chart", to: "/about/organization-chart" },
    { label: "Governing Body", to: "/about/governing-body" },
    { label: "Chairman", to: "/about/chairman" },
    { label: "Secretary & Correspondent", to: "/about/secretary" },
    { label: "Principal", to: "/about/principal" },
    { label: "Office Staff", to: "/about/office-staff" },
  ],
};

// Group members by category
const groupBy = <T extends { category: string }>(arr: T[]): Record<string, T[]> =>
  arr.reduce<Record<string, T[]>>((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

const GoverningBody = () => {
  const grouped = groupBy(GOVERNING_BODY);
  const categories = Object.keys(grouped);

  return (
    <InfoPage
      eyebrow="Administration"
      title="Governing Body"
      subtitle="The apex body that provides strategic direction and oversight to the institution."
      breadcrumb={[{ label: "About", to: "/about" }, { label: "Governing Body" }]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
        The Governing Body of Krishna Chaitanya Institute of Technology &amp; Sciences brings together
        members from the management, university, AICTE, government, industry, education, and faculty.
        It meets regularly to review academic and administrative performance, approve policies, and
        guide the institution's growth.
      </p>

      <div className="not-prose space-y-8">
        {categories.map((cat) => (
          <div key={cat}>
            <div className="flex items-center gap-3 mb-4">
              <Users className="size-5 text-accent" />
              <h2 className="font-display text-lg sm:text-xl font-semibold m-0">{cat}</h2>
            </div>
            <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-[var(--shadow-card)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/10">
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-foreground/80 uppercase tracking-[0.14em] text-xs">
                      Name
                    </th>
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-foreground/80 uppercase tracking-[0.14em] text-xs">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[cat].map((m, i) => (
                    <tr
                      key={`${m.name}-${i}`}
                      className="border-b border-border last:border-b-0 hover:bg-secondary/10 transition-colors"
                    >
                      <td className="px-4 sm:px-5 py-3 font-medium text-foreground">{m.name}</td>
                      <td className="px-4 sm:px-5 py-3 text-muted-foreground">{m.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <p className="not-prose mt-8 text-xs text-muted-foreground italic">
        Note: Pending nominations from JNTUK / AICTE / State Government will be updated as soon as confirmed.
      </p>
    </InfoPage>
  );
};

export default GoverningBody;
