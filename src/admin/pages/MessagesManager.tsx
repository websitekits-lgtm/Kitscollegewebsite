import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ContactMsg {
  id: string; name: string | null; email: string | null; phone: string | null;
  subject: string | null; message: string | null; status: string; created_at: string;
}
interface FeedbackMsg {
  id: string; name: string | null; email: string | null; role: string | null;
  category: string | null; rating: string | null; message: string | null; status: string; created_at: string;
}

const MessagesManager = () => {
  const [tab, setTab] = useState<"contact" | "feedback">("contact");
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [feedback, setFeedback] = useState<FeedbackMsg[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const [c, f] = await Promise.all([
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("feedback_submissions").select("*").order("created_at", { ascending: false }),
    ]);
    setContacts((c.data as ContactMsg[]) ?? []);
    setFeedback((f.data as FeedbackMsg[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const setContactStatus = async (id: string, status: string) => {
    if (!supabase) return;
    await supabase.from("contact_messages").update({ status }).eq("id", id);
    load();
  };
  const setFeedbackStatus = async (id: string, status: string) => {
    if (!supabase) return;
    await supabase.from("feedback_submissions").update({ status }).eq("id", id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Messages & Feedback</h1>
      <p className="text-sm text-slate-500 mb-6">Contact-page messages and feedback-page submissions.</p>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("contact")} className={`rounded-full px-4 py-1.5 text-xs font-semibold ${tab === "contact" ? "bg-accent text-accent-foreground" : "bg-white border border-slate-200 text-slate-500"}`}>
          Contact Messages ({contacts.length})
        </button>
        <button onClick={() => setTab("feedback")} className={`rounded-full px-4 py-1.5 text-xs font-semibold ${tab === "feedback" ? "bg-accent text-accent-foreground" : "bg-white border border-slate-200 text-slate-500"}`}>
          Feedback ({feedback.length})
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left font-medium text-slate-500 px-4 py-3">From</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">{tab === "contact" ? "Subject" : "Category / Rating"}</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Message</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Date</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>}
            {!loading && tab === "contact" && contacts.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No contact messages yet.</td></tr>
            )}
            {!loading && tab === "feedback" && feedback.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No feedback yet.</td></tr>
            )}
            {tab === "contact" && contacts.map((m) => (
              <tr key={m.id} className="border-b border-slate-100 last:border-0 align-top">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{m.name}</p>
                  <p className="text-xs text-slate-400">{m.email}{m.phone ? ` · ${m.phone}` : ""}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{m.subject || "—"}</td>
                <td className="px-4 py-3 text-slate-600 max-w-xs">{m.message}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{new Date(m.created_at).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3">
                  <select value={m.status} onChange={(e) => setContactStatus(m.id, e.target.value)} className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 border-0 capitalize">
                    <option value="new">New</option><option value="replied">Replied</option><option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
            {tab === "feedback" && feedback.map((m) => (
              <tr key={m.id} className="border-b border-slate-100 last:border-0 align-top">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{m.name || "Anonymous"} <span className="text-xs text-slate-400">({m.role})</span></p>
                  <p className="text-xs text-slate-400">{m.email}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{m.category} · {m.rating ? `${m.rating}★` : "—"}</td>
                <td className="px-4 py-3 text-slate-600 max-w-xs">{m.message}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{new Date(m.created_at).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3">
                  <select value={m.status} onChange={(e) => setFeedbackStatus(m.id, e.target.value)} className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 border-0 capitalize">
                    <option value="new">New</option><option value="reviewed">Reviewed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesManager;
