import { useEffect, useState } from "react";
import { X, Download, Search } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Submission {
  id: string;
  first_name: string; last_name: string; father_name: string; mother_name: string;
  dob: string; gender: string; mobile: string; alternate_mobile: string; email: string;
  aadhaar: string; nationality: string; religion: string; category: string; blood_group: string;
  physically_challenged: string; address: string; landmark: string; city: string; district: string;
  state: string; pincode: string; country: string; program_type: string; course: string;
  hostel: string; transport: string; status: string; created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  admitted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const AdmissionSubmissions = () => {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [search, setSearch] = useState("");

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("admission_submissions").select("*").order("created_at", { ascending: false });
    setRows((data as Submission[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    if (!supabase) return;
    await supabase.from("admission_submissions").update({ status }).eq("id", id);
    load();
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  };

  const exportCsv = () => {
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]).filter((k) => k !== "id");
    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => `"${String((r as any)[h] ?? "").replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admission-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    return !q || `${r.first_name} ${r.last_name} ${r.mobile} ${r.email}`.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-slate-900">Admission Applications</h1>
        <button onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Download className="size-4" /> Export CSV
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Submissions from the Apply Now form. Also emailed to admissions@kits-anna.com via EmailJS.
      </p>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, mobile, email…"
          className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Name</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Mobile</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Course</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Applied On</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Status</th>
              <th className="text-right font-medium text-slate-500 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No applications yet.</td></tr>
            )}
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-800">{row.first_name} {row.last_name}</td>
                <td className="px-4 py-3 text-slate-600">{row.mobile}</td>
                <td className="px-4 py-3 text-slate-600">{row.course || "—"}</td>
                <td className="px-4 py-3 text-slate-500">{new Date(row.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${STATUS_COLORS[row.status] ?? "bg-slate-100 text-slate-600"}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setSelected(row)} className="text-accent text-xs font-semibold hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">{selected.first_name} {selected.last_name}</h2>
              <button onClick={() => setSelected(null)}><X className="size-5 text-slate-400 hover:text-slate-700" /></button>
            </div>

            <div className="flex gap-2 mb-5">
              {["new", "contacted", "admitted", "rejected"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(selected.id, s)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${selected.status === s ? STATUS_COLORS[s] : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Father/Guardian", selected.father_name], ["Mother", selected.mother_name],
                ["DOB", selected.dob], ["Gender", selected.gender],
                ["Mobile", selected.mobile], ["Alternate Mobile", selected.alternate_mobile],
                ["Email", selected.email], ["Aadhaar", selected.aadhaar],
                ["Nationality", selected.nationality], ["Religion", selected.religion],
                ["Category", selected.category], ["Blood Group", selected.blood_group],
                ["Physically Challenged", selected.physically_challenged],
                ["Address", selected.address], ["Landmark", selected.landmark],
                ["City", selected.city], ["District", selected.district],
                ["State", selected.state], ["Pincode", selected.pincode], ["Country", selected.country],
                ["Program Type", selected.program_type], ["Course", selected.course],
                ["Hostel Required", selected.hostel], ["Transport Required", selected.transport],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-slate-800 font-medium">{value || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionSubmissions;
