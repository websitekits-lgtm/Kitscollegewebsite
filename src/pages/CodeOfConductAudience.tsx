import { useParams } from "react-router-dom";
import { ScrollText } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { CODE_OF_CONDUCT } from "@/lib/codeOfConductContent";
import NotFound from "./NotFound";

const sidebar = {
  heading: "Code of Conduct",
  links: [
    { label: "Overview", to: "/about/code-of-conduct" },
    { label: "For Students", to: "/about/code-of-conduct/students" },
    { label: "For Teachers", to: "/about/code-of-conduct/teachers" },
    { label: "For Administrators", to: "/about/code-of-conduct/administrators" },
    { label: "For Employees", to: "/about/code-of-conduct/employees" },
    { label: "Code of Ethics", to: "/about/code-of-ethics" },
  ],
};

const CodeOfConductAudience = () => {
  const { audience } = useParams<{ audience: string }>();
  const data = audience ? CODE_OF_CONDUCT[audience] : undefined;

  if (!data) return <NotFound />;

  return (
    <InfoPage
      eyebrow={`Code of Conduct · ${data.audience}`}
      title={`Code of Conduct for ${data.audience}`}
      subtitle="Specific behavioural and ethical standards for this group within the KITS community."
      breadcrumb={[
        { label: "About", to: "/about" },
        { label: "Code of Conduct", to: "/about/code-of-conduct" },
        { label: `For ${data.audience}` },
      ]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-10">
        {data.intro}
      </p>

      <div className="not-prose space-y-5">
        {data.sections.map((s, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="grid size-9 place-items-center rounded-md bg-accent/10 text-accent shrink-0">
                <ScrollText className="size-4" />
              </div>
              <h2 className="font-display text-lg sm:text-xl font-semibold m-0 uppercase tracking-wide">
                {s.heading}
              </h2>
            </div>
            <p className="text-foreground/85 leading-relaxed pl-12">{s.body}</p>
          </div>
        ))}
      </div>
    </InfoPage>
  );
};

export default CodeOfConductAudience;
