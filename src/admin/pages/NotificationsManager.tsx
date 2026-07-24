import { useEffect, useState } from "react";
import { Plus, Trash2, Check, X, Loader2, Bell } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface NotifRow {
  id: string;
  title: string;
  body: string | null;
  link_url: string | null;
  is_active: boolean;
  created_at: string;
}

const EMPTY_FORM = { title: "", body: "", link_url: "" };

const NotificationsManager = () => {
  const [rows, setRows] = useState<NotifRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });
    setRows((data as NotifRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const publish = async () => {
    if (!supabase || !form.title.trim()) return;
    setSaving(true);
    await supabase.from("notifications").insert({
      title: form.title.trim(),
      body: form.body.trim() || null,
      link_url: form.link_url.trim() || null,
    });
    setSaving(false);
    setForm(EMPTY_FORM);
    setShowForm(false);
    load();
  };

  const toggleActive = async (row: NotifRow) => {
    if (!supabase) return;
    await supabase.from("notifications").update({ is_active: !row.is_active }).eq("id", row.id);
    load();
  };

  const remove = async (id: string) => {
    if (!supabase) return;
    if (!confirm("Delete this announcement?")) return;
    await supabase.from("notifications").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="size-4" /> New Announcement
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Announcements appear instantly in the bell icon on every visitor's screen (live — no refresh needed).
      </p>

      {showForm && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-5 space-y-3">
          <input
            autoFocus
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Title — e.g. Mid-term exam timetable released"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
          />
          <textarea
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            rows={2}
            placeholder="Short description (optional)"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          />
          <input
            value={form.link_url}
            onChange={(e) => setForm((f) => ({ ...f, link_url: e.target.value }))}
            placeholder="Link when clicked (optional) — e.g. /examination/internal-timetables"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          />
          <div className="flex gap-2">
            <button onClick={publish} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Bell className="size-4" />}
              Publish
            </button>
            <button onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
              <X className="size-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
        {loading && <p className="px-4 py-8 text-sm text-slate-400 text-center">Loading…</p>}
        {!loading && rows.length === 0 && <p className="px-4 py-8 text-sm text-slate-400 text-center">No announcements yet.</p>}
        {rows.map((row) => (
          <div key={row.id} className="flex items-start gap-3 px-4 py-3">
            <Bell className={`size-4 mt-0.5 shrink-0 ${row.is_active ? "text-accent" : "text-slate-300"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{row.title}</p>
              {row.body && <p className="text-xs text-slate-500 mt-0.5">{row.body}</p>}
              <p className="text-[11px] text-slate-400 mt-1">
                {new Date(row.created_at).toLocaleString("en-IN")} {row.link_url && `· links to ${row.link_url}`}
              </p>
            </div>
            <button
              onClick={() => toggleActive(row)}
              className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${row.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}
            >
              {row.is_active ? "Live" : "Hidden"}
            </button>
            <button onClick={() => remove(row.id)} className="shrink-0 text-slate-400 hover:text-red-500">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsManager;
