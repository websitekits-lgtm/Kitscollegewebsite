import { NAAC_CRITERIA } from "@/lib/qualityContent";

export const naacSidebar = {
  heading: "NAAC",
  links: [
    { label: "Overview", to: "/naac" },
    ...NAAC_CRITERIA.map((c) => ({
      label: `Criteria ${c.number} — ${c.title}`,
      to: `/naac/criteria-${c.number}`,
    })),
    { label: "SSR (Self Study Report)", to: "/naac/ssr" },
    { label: "DVV Clarifications", to: "/naac/dvv" },
  ],
};
