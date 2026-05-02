import { useMemo, useState } from "react";
import { Search, Phone, Mail } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { TELEPHONE_DIRECTORY } from "@/lib/miscContent";
import { infoCornerSidebar } from "./InfoCornerSidebar";

const TelephoneDirectory = () => {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");

  const categories = ["All", "Administration", "Department", "Office", "Hostel", "Other"];

  const filtered = useMemo(() => {
    let list = TELEPHONE_DIRECTORY;
    if (activeCat !== "All") list = list.filter((d) => d.category === activeCat);
    const s = q.trim().toLowerCase();
    if (s) list = list.filter((d) => [d.name, d.designation, d.phone, d.email].join(" ").toLowerCase().includes(s));
    return list;
  }, [q, activeCat]);

  return (
    <InfoPage
      eyebrow="Information Corner"
      title="Telephone Directory"
      subtitle="Department, office, and hostel contact numbers and emails at KITS Markapur."
      breadcrumb={[{ label: "Information", to: "/info" }, { label: "Directory" }]}
      sidebar={infoCornerSidebar}
    >
      <div className="not-prose mb-5 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, designation, phone..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent"
        />
      </div>

      <div className="not-prose mb-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeCat === c
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-card text-foreground/80 border-border hover:bg-secondary/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="not-prose rounded-2xl border border-border overflow-hidden bg-card shadow-[var(--shadow-card)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/10">
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Name</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden sm:table-cell">Designation</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Phone</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden md:table-cell">Email</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                  <td className="px-4 py-3 font-medium">{d.name}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden sm:table-cell">{d.designation}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${d.phone}`} className="inline-flex items-center gap-1.5 text-foreground hover:text-accent">
                      <Phone className="size-3.5 text-accent" /> {d.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <a href={`mailto:${d.email}`} className="inline-flex items-center gap-1.5 text-foreground hover:text-accent break-all">
                      <Mail className="size-3.5 text-accent" /> {d.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </InfoPage>
  );
};

export default TelephoneDirectory;
