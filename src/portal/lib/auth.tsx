/**
 * Mock auth context for the portal phase.
 *
 * For now, "logging in" simply records the chosen role + a fake user object
 * into localStorage. When Supabase is wired in, replace the bodies of
 * `signIn` / `signOut` and the initial-state hydrate with real session calls.
 */

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Role } from "./roles";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  /** Optional fields per role */
  department?: string;
  rollNo?: string;
  designation?: string;
  photo?: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
  signIn: (role: Role, identifier: string) => Promise<void>;
  signOut: () => void;
}

const STORAGE_KEY = "kits_portal_session";

const AuthContext = createContext<AuthContextValue | null>(null);

/** Generate a plausible-looking mock user for a given role. */
const buildMockUser = (role: Role, identifier: string): SessionUser => {
  const id = `${role}-${Date.now()}`;
  const fallback = identifier.trim() || `${role}@kits-anna.com`;
  const name = identifier.includes("@")
    ? identifier.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : identifier || (role === "student" ? "Student User" : role === "faculty" ? "Faculty User" : "Portal User");

  const base: SessionUser = { id, name, email: identifier.includes("@") ? identifier : fallback, role };

  switch (role) {
    case "student":
      return { ...base, rollNo: identifier || "22B81A0501", department: "CSE" };
    case "faculty":
      return { ...base, designation: "Assistant Professor", department: "CSE" };
    case "hod":
      return { ...base, designation: "Head of Department", department: "CSE" };
    case "principal":
      return { ...base, name: "Dr. K. Sridhar", designation: "Principal" };
    case "exam":
      return { ...base, designation: "Controller of Examinations" };
    case "accounts":
      return { ...base, designation: "Accounts Officer" };
    case "parent":
      return { ...base, name: name || "Parent User", designation: "Parent / Guardian" };
    default:
      return base;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signIn: async (role, identifier) => {
        // Simulate a tiny latency so the UI can show a loading state
        await new Promise((r) => setTimeout(r, 300));
        const mock = buildMockUser(role, identifier);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mock));
        setUser(mock);
      },
      signOut: () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
