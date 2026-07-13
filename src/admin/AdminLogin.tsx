import { useState, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { useAdminAuth } from "./AdminAuthContext";

const AdminLogin = () => {
  const { session, loading, backendReady, signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (loading) return null;
  if (session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) setError(error);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-4">
            <ShieldCheck className="size-7" />
          </div>
          <h1 className="text-xl font-bold text-white">KITS Admin Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to manage the website</p>
        </div>

        {!backendReady && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-800 bg-amber-950/50 p-3 text-sm text-amber-300">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            Backend not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env and restart the dev server.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="admin@kits-anna.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 flex items-center gap-1.5">
              <AlertCircle className="size-4 shrink-0" /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !backendReady}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Admin accounts are created directly in Supabase — there is no public sign-up.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
