import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Row {
  id: string;
  platform: string;
  url: string;
  enabled: boolean;
  sort_order: number;
}

const SocialLinksManager = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("social_links").select("*").order("sort_order");
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateUrl = (id: string, url: string) => setRows((r) => r.map((row) => (row.id === id ? { ...row, url } : row)));

  const save = async (row: Row) => {
    if (!supabase) return;
    setSavingId(row.id);
    await supabase.from("social_links").update({ url: row.url, enabled: row.enabled }).eq("id", row.id);
    setSavingId(null);
  };

  const toggleEnabled = async (row: Row) => {
    if (!supabase) return;
    const updated = { ...row, enabled: !row.enabled };
    setRows((r) => r.map((x) => (x.id === row.id ? updated : x)));
    await supabase.from("social_links").update({ enabled: updated.enabled }).eq("id", row.id);
  };

  if (loading) return <p className="text-sm text-slate-400">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Social Links</h1>
      <p className="text-sm text-slate-500 mb-6">The floating icons shown on the left edge of every page.</p>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3">
            <label className="flex items-center gap-2 shrink-0 w-32">
              <input type="checkbox" checked={row.enabled} onChange={() => toggleEnabled(row)} className="size-4 accent-accent" />
              <span className="text-sm font-medium text-slate-700">{row.platform}</span>
            </label>
            <input
              value={row.url}
              onChange={(e) => updateUrl(row.id, e.target.value)}
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-mono text-xs"
            />
            <button
              onClick={() => save(row)}
              disabled={savingId === row.id}
              className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
            >
              {savingId === row.id ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksManager;
