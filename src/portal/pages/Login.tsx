import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { COLLEGE } from "@/lib/college";
import { useAuth } from "@/portal/lib/auth";
import { ROLE_CONFIG, ROLE_LIST, isValidRole, type Role } from "@/portal/lib/roles";
import { cn } from "@/lib/utils";

interface LocationState {
  from?: string;
}

/**
 * Login page driven by /login/:role.
 * Single component, configures itself from ROLE_CONFIG[role].
 * - On success, navigate to portalRoot OR location.state.from (if a guard
 *   redirected the user here from a protected route).
 */
const Login = () => {
  const { role: roleParam } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user, loading: authLoading } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already signed-in? Send them to their portal.
  if (!authLoading && user && isValidRole(roleParam) && user.role === roleParam) {
    return <Navigate to={ROLE_CONFIG[user.role].portalRoot} replace />;
  }

  // Unknown role — bounce to the role chooser.
  if (!isValidRole(roleParam)) {
    return <RoleChooser />;
  }

  const role = roleParam as Role;
  const cfg = ROLE_CONFIG[role];
  const Icon = cfg.Icon;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError(`${cfg.idLabel} is required`);
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setSubmitting(true);
    try {
      await signIn(role, identifier.trim());
      const state = (location.state ?? {}) as LocationState;
      navigate(state.from || cfg.portalRoot, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-dots">
      {/* Header strip */}
      <div className="border-b border-border bg-card/70 backdrop-blur">
        <div className="container-tight flex items-center justify-between py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/85 hover:text-accent transition-colors">
            <ArrowLeft className="size-4" />
            Back to main site
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">
            {COLLEGE.shortName} • Secure Portal Login
          </span>
        </div>
      </div>

      <div className="container-tight grid gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20 items-center">
        {/* Marketing column (hidden on mobile to keep form above the fold) */}
        <div className="hidden lg:block">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            <ShieldCheck className="size-3.5" /> Secure access
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-foreground">
            Welcome back to <br /> <span className="text-accent">{COLLEGE.shortName}</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-md leading-relaxed">
            Sign in with your <span className="font-semibold text-foreground">{cfg.title}</span> credentials.
            Need a different portal? Pick one below.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-2 max-w-md">
            {ROLE_LIST.filter((r) => r !== role).map((r) => {
              const c = ROLE_CONFIG[r];
              const RI = c.Icon;
              return (
                <Link
                  key={r}
                  to={`/login/${r}`}
                  className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground/80 hover:border-accent/40 hover:text-accent transition-colors"
                >
                  <RI className="size-4" />
                  <span className="truncate">{c.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Form column */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border-2 border-border bg-card p-7 shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.15)] sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className={cn("grid size-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md", cfg.accentClass)}>
                <Icon className="size-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">{cfg.title}</h2>
                <p className="text-xs text-muted-foreground">{cfg.tagline}</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="identifier" className="text-foreground/85">{cfg.idLabel}</Label>
                <Input
                  id="identifier"
                  type="text"
                  autoComplete="username"
                  placeholder={cfg.idPlaceholder}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground/85">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-2 my-auto grid size-7 place-items-center rounded text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-foreground/85">
                  <Checkbox
                    checked={remember}
                    onCheckedChange={(v) => setRemember(!!v)}
                    id="remember"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-accent hover:underline font-medium"
                  onClick={() => alert("Password reset is not enabled in the demo.")}
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Demo mode — enter anything as ID + password to continue.
              </p>
            </form>
          </div>

          {/* Role switcher (mobile) */}
          <div className="mt-5 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Other portals</p>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_LIST.filter((r) => r !== role).map((r) => {
                const c = ROLE_CONFIG[r];
                const RI = c.Icon;
                return (
                  <Link
                    key={r}
                    to={`/login/${r}`}
                    className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground/80 hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    <RI className="size-4 shrink-0" />
                    <span className="truncate">{c.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Shown for /login (no role) — a grid of portal choices. */
const RoleChooser = () => (
  <div className="min-h-screen bg-background bg-dots">
    <div className="border-b border-border bg-card/70 backdrop-blur">
      <div className="container-tight flex items-center justify-between py-3">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/85 hover:text-accent transition-colors">
          <ArrowLeft className="size-4" /> Back to main site
        </Link>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {COLLEGE.shortName} • Portal Sign-in
        </span>
      </div>
    </div>

    <div className="container-tight py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Choose your portal
        </h1>
        <p className="mt-3 text-muted-foreground">
          Select the portal that matches your role at {COLLEGE.shortName}.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {ROLE_LIST.map((r) => {
          const c = ROLE_CONFIG[r];
          const RI = c.Icon;
          return (
            <Link
              key={r}
              to={`/login/${r}`}
              className="group relative overflow-hidden rounded-xl border-2 border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_40px_-12px_hsl(var(--primary)/0.18)]"
            >
              <div className={cn("grid size-12 place-items-center rounded-lg bg-gradient-to-br text-white shadow-sm", c.accentClass)}>
                <RI className="size-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.tagline}</p>
            </Link>
          );
        })}
      </div>
    </div>
  </div>
);

export default Login;
