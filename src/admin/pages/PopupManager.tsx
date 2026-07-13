import { useEffect, useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface PopupSettings {
  enabled: boolean;
  eyebrow: string;
  title: string;
  year_label: string;
  description: string;
  points: string[];
  apply_url: string;
}

const PopupManager = () => {
  const [form, setForm] = useState<PopupSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!supabase) return setLoading(false);
    supabase.from("homepage_popup").select("*").eq("id", 1).single().then(({ data }) => {
      if (data) setForm({ ...data, points: data.points ?? [] });
      setLoading(false);
    });
  }, []);

  const save = async () => {
    if (!supabase || !form) return;
    setSaving(true);
    await supabase.from("homepage_popup").update({ ...form, updated_at: new Date().toISOString() }).eq("id", 1);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updatePoint = (i: number, value: string) => {
    if (!form) return;
    const points = [...form.points];
    points[i] = value;
    setForm({ ...form, points });
  };
  const addPoint = () => form && setForm({ ...form, points: [...form.points, ""] });
  const removePoint = (i: number) => form && setForm({ ...form, points: form.points.filter((_, idx) => idx !== i) });

  if (loading) return <p className="text-sm text-slate-400">Loading…</p>;
  if (!form) return <p className="text-sm text-slate-400">Backend not configured.</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Homepage Popup</h1>
      <p className="text-sm text-slate-500 mb-6">The admissions popup shown when visitors first open the homepage (once per session).</p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <label className="flex items-center gap-2.5">
          <input type="checkbox" checked={form.enabled} onChange={(e) => setForm({ ...form, enabled: e.target.checked })} className="size-4 accent-accent" />
          <span className="text-sm font-medium text-slate-700">Show popup to visitors</span>
        </label>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Eyebrow (small label)</label>
          <input value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Year label</label>
          <input value={form.year_label} onChange={(e) => setForm({ ...form, year_label: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="2026 – 27" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Bullet Points</label>
          <div className="space-y-2">
            {form.points.map((pt, i) => (
              <div key={i} className="flex gap-2">
                <input value={pt} onChange={(e) => updatePoint(i, e.target.value)} className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm" />
                <button onClick={() => removePoint(i)} className="text-slate-400 hover:text-red-500 shrink-0"><Trash2 className="size-4" /></button>
              </div>
            ))}
          </div>
          <button onClick={addPoint} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
            <Plus className="size-3.5" /> Add point
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Apply Now Button Link</label>
          <input value={form.apply_url} onChange={(e) => setForm({ ...form, apply_url: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default PopupManager;
