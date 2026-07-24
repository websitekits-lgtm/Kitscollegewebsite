import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Grievance {
  id: string;
  submitter_type: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  category: string | null;
  subject: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  "in-review": "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-slate-100 text-slate-500",
};

const GrievancesManager = () => {
  const [rows, setRows] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("grievance_submissions").select("*").order("created_at", { ascending: false });
    setRows((data as Grievance[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    if (!supabase) return;
    await supabase.from("grievance_submissions").update({ status }).eq("id", id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Grievances</h1>
      <p className="text-sm text-slate-500 mb-6">
        Submissions from the Grievance Redressal Cell form. Handle confidentially.
      </p>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left font-medium text-slate-500 px-4 py-3">From</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Type</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Category / Subject</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Message</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Date</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No grievances submitted yet.</td></tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0 align-top">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{row.name || "Anonymous"}</p>
                  <p className="text-xs text-slate-400">{row.email}{row.phone ? ` · ${row.phone}` : ""}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{row.submitter_type || "—"}</td>
                <td className="px-4 py-3 text-slate-600">
                  <p className="font-medium">{row.category || "—"}</p>
                  <p className="text-xs text-slate-400">{row.subject}</p>
                </td>
                <td className="px-4 py-3 text-slate-600 max-w-xs">{row.message || "—"}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{new Date(row.created_at).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3">
                  <select
                    value={row.status}
                    onChange={(e) => updateStatus(row.id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-0 capitalize ${STATUS_COLORS[row.status] ?? "bg-slate-100"}`}
                  >
                    <option value="new">New</option>
                    <option value="in-review">In Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
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

export default GrievancesManager;
