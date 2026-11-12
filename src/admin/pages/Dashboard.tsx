import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileSpreadsheet, Mail, ArrowRight, Newspaper, Image as ImageIcon, Images, FilePlus2 } from "lucide-react";
import { formatBytes } from "@/lib/media";
import { supabase } from "@/lib/supabaseClient";

interface Stats {
  submissions: number;
  newSubmissions: number;
  testimonials: number;
  navItems: number;
  inquiries: number;
  newInquiries: number;
  posts: number;
  drafts: number;
  media: number;
  mediaBytes: number;
  gallery: number;
  pages: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const [subs, newSubs, testi, nav, inq, newInq, posts, drafts, media, gallery, pages] = await Promise.all([
        supabase.from("admission_submissions").select("*", { count: "exact", head: true }),
        supabase.from("admission_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("nav_items").select("*", { count: "exact", head: true }),
        supabase.from("admission_inquiries").select("*", { count: "exact", head: true }),
        supabase.from("admission_inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }).eq("is_published", false),
        supabase.from("media_library").select("size_bytes"),
        supabase.from("gallery_items").select("*", { count: "exact", head: true }),
        supabase.from("custom_pages").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        submissions: subs.count ?? 0,
        newSubmissions: newSubs.count ?? 0,
        testimonials: testi.count ?? 0,
        navItems: nav.count ?? 0,
        inquiries: inq.count ?? 0,
        newInquiries: newInq.count ?? 0,
        posts: posts.count ?? 0,
        drafts: drafts.count ?? 0,
        media: media.data?.length ?? 0,
        mediaBytes: (media.data ?? []).reduce((n, r) => n + (r.size_bytes ?? 0), 0),
        gallery: gallery.count ?? 0,
        pages: pages.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Admission Applications", value: stats?.submissions, sub: `${stats?.newSubmissions ?? 0} new`, icon: FileSpreadsheet, to: "/admin/admissions", color: "bg-blue-500" },
    { label: "Admission Inquiries",    value: stats?.inquiries,   sub: `${stats?.newInquiries ?? 0} new`,   icon: Mail,             to: "/admin/inquiries",  color: "bg-teal-500" },
    { label: "Posts",                  value: stats?.posts, sub: `${stats?.drafts ?? 0} drafts`, icon: Newspaper, to: "/admin/posts", color: "bg-purple-500" },
    { label: "Media Files",            value: stats?.media, sub: `${formatBytes(stats?.mediaBytes) || "0 KB"} stored`, icon: ImageIcon, to: "/admin/media", color: "bg-emerald-500" },
    { label: "Gallery Photos",         value: stats?.gallery, sub: "on the Gallery page", icon: Images, to: "/admin/gallery", color: "bg-pink-500" },
    { label: "Custom Pages",           value: stats?.pages, sub: `${stats?.navItems ?? 0} menu items`, icon: FilePlus2, to: "/admin/pages", color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
      <p className="text-sm text-slate-500 mb-8">Overview of your website's dynamic content.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
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
            { label: "Write a news / event post", to: "/admin/posts" },
            { label: "Upload files to the Media Library", to: "/admin/media" },
            { label: "Add photos to the Gallery", to: "/admin/gallery" },
            { label: "Create a new page", to: "/admin/pages" },
            { label: "Edit the homepage hero", to: "/admin/page-content" },
            { label: "Upload a PDF / document", to: "/admin/documents" },
            { label: "View new admission applications", to: "/admin/admissions" },
            { label: "View admission inquiries", to: "/admin/inquiries" },
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
