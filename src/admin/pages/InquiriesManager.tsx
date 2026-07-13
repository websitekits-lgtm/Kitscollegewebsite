import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  program: string;
  city: string;
  message: string;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  closed: "bg-slate-100 text-slate-500",
};

const InquiriesManager = () => {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("admission_inquiries").select("*").order("created_at", { ascending: false });
    setRows((data as Inquiry[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    if (!supabase) return;
    await supabase.from("admission_inquiries").update({ status }).eq("id", id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Admission Inquiries</h1>
      <p className="text-sm text-slate-500 mb-6">
        Short "Talk to our admissions team" submissions from the /admissions page (separate from full Apply Now applications).
      </p>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Name</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Contact</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Program</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Message</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Date</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No inquiries yet.</td></tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0 align-top">
                <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                <td className="px-4 py-3 text-slate-600">
                  <div>{row.phone}</div>
                  <div className="text-xs text-slate-400">{row.email}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">{row.program || "—"}<div className="text-xs text-slate-400">{row.city}</div></td>
                <td className="px-4 py-3 text-slate-600 max-w-xs">{row.message || "—"}</td>
                <td className="px-4 py-3 text-slate-500">{new Date(row.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <select
                    value={row.status}
                    onChange={(e) => updateStatus(row.id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-0 capitalize ${STATUS_COLORS[row.status] ?? "bg-slate-100"}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
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

export default InquiriesManager;
