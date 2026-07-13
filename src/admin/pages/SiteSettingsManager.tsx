import { useEffect, useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Settings {
  phones: string[];
  email: string;
  admissions_email: string;
  address_line1: string;
  address_line2: string;
  whatsapp_number: string | null;
  maps_url: string | null;
}

const SiteSettingsManager = () => {
  const [form, setForm] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!supabase) return setLoading(false);
    supabase.from("site_settings").select("*").eq("id", 1).single().then(({ data }) => {
      if (data) setForm({ ...data, phones: data.phones ?? [] });
      setLoading(false);
    });
  }, []);

  const save = async () => {
    if (!supabase || !form) return;
    setSaving(true);
    await supabase.from("site_settings").update({ ...form, updated_at: new Date().toISOString() }).eq("id", 1);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updatePhone = (i: number, value: string) => {
    if (!form) return;
    const phones = [...form.phones];
    phones[i] = value;
    setForm({ ...form, phones });
  };
  const addPhone = () => form && setForm({ ...form, phones: [...form.phones, ""] });
  const removePhone = (i: number) => form && setForm({ ...form, phones: form.phones.filter((_, idx) => idx !== i) });

  if (loading) return <p className="text-sm text-slate-400">Loading…</p>;
  if (!form) return <p className="text-sm text-slate-400">Backend not configured.</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Site Settings</h1>
      <p className="text-sm text-slate-500 mb-6">College contact details shown across the website.</p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Phone Numbers</label>
          <div className="space-y-2">
            {form.phones.map((p, i) => (
              <div key={i} className="flex gap-2">
                <input value={p} onChange={(e) => updatePhone(i, e.target.value)} className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm" />
                <button onClick={() => removePhone(i)} className="text-slate-400 hover:text-red-500 shrink-0"><Trash2 className="size-4" /></button>
              </div>
            ))}
          </div>
          <button onClick={addPhone} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
            <Plus className="size-3.5" /> Add phone number
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Principal / General Email</label>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Admissions Email</label>
          <input value={form.admissions_email} onChange={(e) => setForm({ ...form, admissions_email: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Address Line 1</label>
          <input value={form.address_line1} onChange={(e) => setForm({ ...form, address_line1: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Address Line 2</label>
          <input value={form.address_line2} onChange={(e) => setForm({ ...form, address_line2: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">WhatsApp Number</label>
          <input value={form.whatsapp_number ?? ""} onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Google Maps URL</label>
          <input value={form.maps_url ?? ""} onChange={(e) => setForm({ ...form, maps_url: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Note: these values currently update the database. To reflect on every page (footer, contact page), the developer needs to wire those components to read from here — ask if you'd like that connected too.
      </p>
    </div>
  );
};

export default SiteSettingsManager;
