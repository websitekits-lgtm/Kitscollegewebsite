import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Menu as MenuIcon, MessageSquareQuote, FileSpreadsheet,
  Sparkles, Share2, Settings, LogOut, ExternalLink, ShieldCheck, FileText, Mail, Wallet,
  FilePlus2, FolderUp, Bell, Users2, Lightbulb, Table2, ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "./AdminAuthContext";

const NAV_ITEMS = [
  { label: "Dashboard",       to: "/admin",              icon: LayoutDashboard, end: true },
  { label: "Pages",           to: "/admin/pages",         icon: FilePlus2 },
  { label: "Menu Order",      to: "/admin/menus",         icon: MenuIcon },
  { label: "Documents & PDFs", to: "/admin/documents",    icon: FolderUp },
  { label: "Notifications",   to: "/admin/notifications", icon: Bell },
  { label: "Page Content",    to: "/admin/page-content",  icon: FileText },
  { label: "Data Tables",     to: "/admin/tables",        icon: Table2 },
  { label: "Fee Structure",   to: "/admin/fees",          icon: Wallet },
  { label: "Clubs",           to: "/admin/clubs",         icon: Users2 },
  { label: "Patents",         to: "/admin/patents",       icon: Lightbulb },
  { label: "Testimonials",    to: "/admin/testimonials",  icon: MessageSquareQuote },
  { label: "Applications",    to: "/admin/admissions",    icon: FileSpreadsheet },
  { label: "Inquiries",       to: "/admin/inquiries",     icon: Mail },
  { label: "Grievances",      to: "/admin/grievances",    icon: ShieldAlert },
  { label: "Messages",        to: "/admin/messages",      icon: MessageSquareQuote },
  { label: "Homepage Popup",  to: "/admin/popup",         icon: Sparkles },
  { label: "Social Links",    to: "/admin/social",        icon: Share2 },
  { label: "Site Settings",   to: "/admin/settings",      icon: Settings },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { signOut } = useAdminAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-slate-950 text-slate-300 flex flex-col">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800">
          <div className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">KITS Admin</p>
            <p className="text-[11px] text-slate-500">Content Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-slate-400 hover:text-white hover:bg-slate-900",
                )
              }
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-800 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <ExternalLink className="size-4 shrink-0" />
            View Website
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
          >
            <LogOut className="size-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
};
