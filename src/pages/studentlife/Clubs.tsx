import { useEffect, useState } from "react";
import { Users2, Sparkles } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { studentLifeSidebar } from "./StudentLifeSidebar";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

interface Club {
  id: string;
  name: string;
  category: string;
  description: string | null;
  coordinator: string | null;
  image_url: string | null;
}

// Shown until the admin manages clubs from the dashboard
const FALLBACK: Club[] = [
  { id: "f1", name: "Coding Club", category: "Technical", description: "Weekly competitive-programming contests, hackathons, and open-source sprints for all branches.", coordinator: "Dept. of CSE", image_url: null },
  { id: "f2", name: "Robotics & IoT Club", category: "Technical", description: "Hands-on robot builds, Arduino/Raspberry Pi projects, and inter-college robotics competitions.", coordinator: "Dept. of ECE", image_url: null },
  { id: "f3", name: "Literary & Debate Club", category: "Cultural", description: "Debates, elocution, essay writing, and the annual college magazine.", coordinator: "Dept. of H&S", image_url: null },
  { id: "f4", name: "Music & Dance Club", category: "Cultural", description: "Stage performances for college fests, cultural competitions, and talent showcases.", coordinator: "Cultural Committee", image_url: null },
  { id: "f5", name: "Sports Club", category: "Sports", description: "Cricket, volleyball, kabaddi, athletics squads and inter-departmental tournaments.", coordinator: "Physical Director", image_url: null },
  { id: "f6", name: "NSS Volunteer Corps", category: "Social Service", description: "Blood-donation camps, village adoption drives, and Swachh Bharat campaigns.", coordinator: "NSS Programme Officer", image_url: null },
];

const CATEGORY_STYLE: Record<string, string> = {
  Technical: "bg-blue-500/15 text-blue-700 border-blue-500/30",
  Cultural: "bg-purple-500/15 text-purple-700 border-purple-500/30",
  Sports: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  "Social Service": "bg-amber-500/15 text-amber-700 border-amber-500/30",
};

const Clubs = () => {
  const [clubs, setClubs] = useState<Club[]>(FALLBACK);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("clubs")
      .select("id, name, category, description, coordinator, image_url")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setClubs(data as Club[]);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(clubs.map((c) => c.category)))];
  const visible = filter === "All" ? clubs : clubs.filter((c) => c.category === filter);

  return (
    <InfoPage
      eyebrow="Student Life"
      title="Clubs & Activities"
      subtitle="Find your people — technical, cultural, sports, and social-service clubs open to every student."
      breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "Clubs" }]}
      sidebar={studentLifeSidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
        Student clubs at KITS are the heartbeat of campus life beyond the classroom. Every club is
        student-run with a faculty coordinator, and membership is open to all branches and years —
        join during the club enrolment drive at the start of each semester.
      </p>

      <div className="not-prose flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              filter === cat
                ? "bg-accent text-accent-foreground"
                : "bg-secondary/30 border border-border text-foreground/60 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="not-prose grid sm:grid-cols-2 gap-4">
        {visible.map((club) => (
          <div
            key={club.id}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)] flex flex-col"
          >
            {club.image_url && (
              <img src={club.image_url} alt={club.name} className="w-full h-36 object-cover" loading="lazy" />
            )}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Users2 className="size-4.5" />
                  </div>
                  <h3 className="font-display text-base font-semibold leading-snug m-0">{club.name}</h3>
                </div>
                <span className={cn("shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] rounded-full border", CATEGORY_STYLE[club.category] ?? "bg-secondary/30 text-foreground/60 border-border")}>
                  {club.category}
                </span>
              </div>
              {club.description && (
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{club.description}</p>
              )}
              {club.coordinator && (
                <p className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-accent" /> Coordinator: <span className="font-medium text-foreground/80">{club.coordinator}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
};

export default Clubs;
