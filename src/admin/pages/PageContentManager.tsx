import { useEffect, useState } from "react";
import { Plus, Trash2, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// Registry of pages wired for content editing. Ask your developer to add an entry
// here (+ a matching useCommitteeMembers/usePageTexts call on the page itself)
// to bring another page under dashboard control.
const PAGES = [
  { slug: "student-life/anti-ragging", label: "Anti-Ragging", path: "/student-life/anti-ragging" },
  { slug: "about/governing-body", label: "Governing Body", path: "/about/governing-body" },
  { slug: "admissions/fee-refund-policy", label: "Fee Refund Policy", path: "/admissions/fee-refund-policy" },
  { slug: "research/committee", label: "Research Committee", path: "/research/committee" },
  { slug: "iqac/committee", label: "IQAC Committee", path: "/iqac/committee" },
  { slug: "about/icc", label: "Internal Complaint Committee", path: "/about/icc" },
  { slug: "grievance-cell", label: "Grievance Cell Committee", path: "/grievance-cell" },
  { slug: "examination/contact", label: "Exam Cell Contact Details", path: "/examination/contact" },
  { slug: "placements/contact", label: "Placement Cell Contact Details", path: "/placements/contact" },
];

interface Member {
  id: string;
  name: string;
  designation: string | null;
  role_label: string | null;
  is_active: boolean;
  sort_order: number;
}

interface TextField {
  id: string;
  field_key: string;
  field_label: string;
  field_value: string;
  field_type: string;
}

const EMPTY_MEMBER = { name: "", designation: "", role_label: "" };

const PageContentManager = () => {
  const [pageSlug, setPageSlug] = useState(PAGES[0].slug);
  const [members, setMembers] = useState<Member[]>([]);
  const [texts, setTexts] = useState<TextField[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberForm, setMemberForm] = useState(EMPTY_MEMBER);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [savingText, setSavingText] = useState<string | null>(null);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const [membersRes, textsRes] = await Promise.all([
      supabase.from("committee_members").select("*").eq("page_slug", pageSlug).order("sort_order"),
      supabase.from("page_texts").select("*").eq("page_slug", pageSlug).order("sort_order"),
    ]);
    setMembers(membersRes.data ?? []);
    setTexts(textsRes.data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [pageSlug]);

  const addMember = async () => {
    if (!supabase || !memberForm.name.trim()) return;
    await supabase.from("committee_members").insert({ page_slug: pageSlug, ...memberForm, sort_order: members.length });
    setMemberForm(EMPTY_MEMBER);
    setShowMemberForm(false);
    load();
  };

  const removeMember = async (id: string) => {
    if (!supabase) return;
    if (!confirm("Remove this member?")) return;
    await supabase.from("committee_members").delete().eq("id", id);
    load();
  };

  const updateMemberField = (id: string, field: keyof Member, value: string) =>
    setMembers((m) => m.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

  const saveMember = async (row: Member) => {
    if (!supabase) return;
    await supabase.from("committee_members").update({ name: row.name, designation: row.designation, role_label: row.role_label }).eq("id", row.id);
    load();
  };

  const updateTextValue = (id: string, value: string) => setTexts((t) => t.map((row) => (row.id === id ? { ...row, field_value: value } : row)));

  const saveText = async (row: TextField) => {
    if (!supabase) return;
    setSavingText(row.id);
    await supabase.from("page_texts").update({ field_value: row.field_value }).eq("id", row.id);
    setSavingText(null);
  };

  const currentPage = PAGES.find((p) => p.slug === pageSlug)!;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Page Content</h1>
      <p className="text-sm text-slate-500 mb-6">
        Edit text, helpline numbers, and committee member lists directly on existing pages.
      </p>

      <div className="flex items-center gap-3 mb-6">
        <select
          value={pageSlug}
          onChange={(e) => setPageSlug(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
        >
          {PAGES.map((p) => <option key={p.slug} value={p.slug}>{p.label}</option>)}
        </select>
        <a href={currentPage.path} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">
          View live page →
        </a>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : (
        <div className="space-y-8">
          {/* Text fields */}
          {texts.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Page Text</h2>
              <div className="space-y-4">
                {texts.map((row) => (
                  <div key={row.id}>
                    <label className="block text-xs font-medium text-slate-600 mb-1">{row.field_label}</label>
                    <div className="flex gap-2">
                      {row.field_type === "richtext" ? (
                        <textarea value={row.field_value} onChange={(e) => updateTextValue(row.id, e.target.value)} rows={3} className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm" />
                      ) : (
                        <input value={row.field_value} onChange={(e) => updateTextValue(row.id, e.target.value)} className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm" />
                      )}
                      <button onClick={() => saveText(row)} disabled={savingText === row.id} className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-accent px-3 text-xs font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
                        {savingText === row.id ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Committee members */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-900">Committee Members</h2>
              <button onClick={() => setShowMemberForm(true)} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
                <Plus className="size-3.5" /> Add Member
              </button>
            </div>

            {showMemberForm && (
              <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-4 grid sm:grid-cols-3 gap-3">
                <input placeholder="Name" value={memberForm.name} onChange={(e) => setMemberForm((f) => ({ ...f, name: e.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
                <input placeholder="Designation" value={memberForm.designation} onChange={(e) => setMemberForm((f) => ({ ...f, designation: e.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
                <input placeholder="Role (e.g. Chairperson, Member)" value={memberForm.role_label} onChange={(e) => setMemberForm((f) => ({ ...f, role_label: e.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
                <div className="sm:col-span-3 flex gap-2">
                  <button onClick={addMember} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"><Check className="size-4" /> Add</button>
                  <button onClick={() => setShowMemberForm(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {members.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No members yet.</p>}
              {members.map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                  <input value={m.name} onChange={(e) => updateMemberField(m.id, "name", e.target.value)} className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                  <input value={m.designation ?? ""} onChange={(e) => updateMemberField(m.id, "designation", e.target.value)} className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                  <input value={m.role_label ?? ""} onChange={(e) => updateMemberField(m.id, "role_label", e.target.value)} className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                  <button onClick={() => saveMember(m)} className="shrink-0 text-accent hover:text-accent/80"><Check className="size-4" /></button>
                  <button onClick={() => removeMember(m.id)} className="shrink-0 text-slate-400 hover:text-red-500"><Trash2 className="size-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageContentManager;
