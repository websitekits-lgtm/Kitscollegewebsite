import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileSpreadsheet, MessageSquareQuote, Menu as MenuIcon, Mail, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Stats {
  submissions: number;
  newSubmissions: number;
  testimonials: number;
  navItems: number;
  inquiries: number;
  newInquiries: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const [subs, newSubs, testi, nav, inq, newInq] = await Promise.all([
        supabase.from("admission_submissions").select("*", { count: "exact", head: true }),
        supabase.from("admission_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("nav_items").select("*", { count: "exact", head: true }),
        supabase.from("admission_inquiries").select("*", { count: "exact", head: true }),
        supabase.from("admission_inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setStats({
        submissions: subs.count ?? 0,
        newSubmissions: newSubs.count ?? 0,
        testimonials: testi.count ?? 0,
        navItems: nav.count ?? 0,
        inquiries: inq.count ?? 0,
        newInquiries: newInq.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Admission Applications", value: stats?.submissions, sub: `${stats?.newSubmissions ?? 0} new`, icon: FileSpreadsheet, to: "/admin/admissions", color: "bg-blue-500" },
    { label: "Admission Inquiries",    value: stats?.inquiries,   sub: `${stats?.newInquiries ?? 0} new`,   icon: Mail,             to: "/admin/inquiries",  color: "bg-teal-500" },
    { label: "Testimonials",           value: stats?.testimonials, sub: "alumni / parents / recruiters", icon: MessageSquareQuote, to: "/admin/testimonials", color: "bg-purple-500" },
    { label: "Header Nav Items",       value: stats?.navItems, sub: "across all dropdowns", icon: MenuIcon, to: "/admin/menus", color: "bg-emerald-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
      <p className="text-sm text-slate-500 mb-8">Overview of your website's dynamic content.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, sub, icon: Icon, to, color }) => (
          <Link
            key={label}
            to={to}
            className="group rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className={`inline-flex size-9 items-center justify-center rounded-lg ${color} text-white mb-3`}>
              <Icon className="size-4.5" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{value ?? "—"}</p>
            <p className="text-sm font-medium text-slate-700 mt-0.5">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "View new admission applications", to: "/admin/admissions" },
            { label: "View admission inquiries", to: "/admin/inquiries" },
            { label: "Edit page content (committees, text)", to: "/admin/page-content" },
            { label: "Add/edit a testimonial", to: "/admin/testimonials" },
            { label: "Edit header navigation", to: "/admin/menus" },
            { label: "Edit homepage popup", to: "/admin/popup" },
            { label: "Update social media links", to: "/admin/social" },
            { label: "Update contact info", to: "/admin/settings" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:border-accent/40 hover:bg-secondary/30 transition-colors"
            >
              {label}
              <ArrowRight className="size-4 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
