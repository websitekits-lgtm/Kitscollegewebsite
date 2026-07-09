import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, GraduationCap, UserCog, ShieldCheck } from "lucide-react";
import { COLLEGE } from "@/lib/college";

const MCB_URL =
  "https://ssolive.myclassboard.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3D5OOPI329KFFX6U6H10O4%26redirect_uri%3Dhttps%253A%252F%252Fcorp47.myclassboard.com%252Fsso%252FCallback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520offline_access";
const EXAM_PORTAL_URL = "https://kitsanna.orgmaker.com/Login";

type LoginView = "choose" | "student" | "staff";

const Login = () => {
  const { role: roleParam } = useParams<{ role: string }>();
  const [view, setView] = useState<LoginView>("choose");

  // Internal staff portals (principal, hod, exam, accounts, parent) are hidden from the
  // public login page. They remain accessible via direct URL for authorised staff.
  // If someone lands on /login/:role for a hidden role, still show the public chooser.
  if (roleParam && !["student", "faculty"].includes(roleParam) && view === "choose") {
    // Do nothing — fall through to show chooser
  }

  return (
    <div className="min-h-screen bg-background bg-dots">
      {/* Top bar */}
      <div className="border-b border-border bg-card/70 backdrop-blur">
        <div className="container-tight flex items-center justify-between py-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/85 hover:text-accent transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to main site
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">
            {COLLEGE.shortName} &bull; Portal Login
          </span>
        </div>
      </div>

      <div className="container-tight py-12 md:py-20">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent mb-4">
            <ShieldCheck className="size-3.5" /> Secure Access
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {view === "choose" && "Who are you logging in as?"}
            {view === "student" && "Student Login"}
            {view === "staff" && "Staff Login"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {view === "choose" && `Select your role to continue to ${COLLEGE.shortName}'s portal.`}
            {view === "student" && "Choose your portal below to sign in."}
            {view === "staff" && "Click below to sign in via the MCB portal."}
          </p>
        </div>

        {/* CHOOSE VIEW */}
        {view === "choose" && (
          <div className="flex flex-col sm:flex-row gap-5 justify-center max-w-2xl mx-auto">
            <RoleCard
              icon={<GraduationCap className="size-8" />}
              title="Student Login"
              description="Access your academic records, attendance, fees, results, and more."
              accentClass="from-cyan-500 to-cyan-700"
              onClick={() => setView("student")}
            />
            <RoleCard
              icon={<UserCog className="size-8" />}
              title="Staff Login"
              description="Faculty login to manage attendance, academics, and student records."
              accentClass="from-blue-500 to-blue-700"
              onClick={() => setView("staff")}
            />
          </div>
        )}

        {/* STUDENT VIEW — two options side by side */}
        {view === "student" && (
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ExternalLoginCard
                title="MCB Login"
                subtitle="MyClassBoard Portal"
                description="Sign in using your MyClassBoard (MCB) credentials."
                href={MCB_URL}
                accentClass="from-cyan-500 to-cyan-700"
                icon={<GraduationCap className="size-7" />}
              />
              <ExternalLoginCard
                title="Exam Portal"
                subtitle="Examination Cell Portal"
                description="View your results and exam details via the KITS Examination portal."
                href={EXAM_PORTAL_URL}
                accentClass="from-teal-500 to-teal-700"
                icon={<GraduationCap className="size-7" />}
              />
            </div>
            <BackButton onClick={() => setView("choose")} />
          </div>
        )}

        {/* STAFF VIEW — single MCB option */}
        {view === "staff" && (
          <div className="max-w-sm mx-auto">
            <ExternalLoginCard
              title="MCB Login"
              subtitle="MyClassBoard Portal"
              description="Faculty and staff sign in using your MyClassBoard (MCB) credentials."
              href={MCB_URL}
              accentClass="from-blue-500 to-blue-700"
              icon={<UserCog className="size-7" />}
            />
            <BackButton onClick={() => setView("choose")} />
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                       */
/* ------------------------------------------------------------------ */

const RoleCard = ({
  icon,
  title,
  description,
  accentClass,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentClass: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex-1 text-left rounded-2xl border-2 border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_40px_-12px_hsl(var(--primary)/0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
  >
    <div
      className={`grid size-14 place-items-center rounded-xl bg-gradient-to-br ${accentClass} text-white shadow-md mb-5`}
    >
      {icon}
    </div>
    <h2 className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
      {title}
    </h2>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
      Continue <ArrowLeft className="size-4 rotate-180" />
    </span>
  </button>
);

const ExternalLoginCard = ({
  title,
  subtitle,
  description,
  href,
  accentClass,
  icon,
  isPlaceholder = false,
}: {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  accentClass: string;
  icon: React.ReactNode;
  isPlaceholder?: boolean;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group flex flex-col rounded-2xl border-2 border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_40px_-12px_hsl(var(--primary)/0.18)] ${isPlaceholder ? "opacity-60 pointer-events-none" : ""}`}
    aria-disabled={isPlaceholder}
    tabIndex={isPlaceholder ? -1 : 0}
  >
    <div
      className={`grid size-14 place-items-center rounded-xl bg-gradient-to-br ${accentClass} text-white shadow-md mb-5`}
    >
      {icon}
    </div>
    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent mb-1">
      {subtitle}
    </p>
    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
      {title}
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
    {isPlaceholder ? (
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        Coming Soon
      </span>
    ) : (
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Open Portal <ExternalLink className="size-4" />
      </span>
    )}
  </a>
);

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    <ArrowLeft className="size-4" />
    Back to role selection
  </button>
);

export default Login;
