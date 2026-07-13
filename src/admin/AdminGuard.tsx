import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { session, loading } = useAdminAuth();

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-400 text-sm">Loading…</div>;
  }
  if (!session) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
};
