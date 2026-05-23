import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/portal/lib/auth";
import { ROLE_CONFIG, type Role } from "@/portal/lib/roles";

interface RoleGuardProps {
  /** Roles allowed to enter this route. */
  allow: Role[];
  children: JSX.Element;
}

/**
 * Route guard for portal pages.
 * - If session is still loading, render nothing (avoids a login flash on refresh).
 * - If no user, send to /login/{first allowed role} preserving the original path
 *   so the login page can bounce them back after sign-in.
 * - If the user is logged in but with a role not in `allow`, send them to
 *   their own portal root.
 */
export const RoleGuard = ({ allow, children }: RoleGuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    const loginRole = allow[0] ?? "student";
    return (
      <Navigate
        to={`/login/${loginRole}`}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  if (!allow.includes(user.role)) {
    return <Navigate to={ROLE_CONFIG[user.role].portalRoot} replace />;
  }

  return children;
};
