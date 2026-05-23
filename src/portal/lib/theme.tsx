/**
 * Portal theme provider — wraps next-themes so portals get dark mode while
 * the public site continues to use the light palette only.
 *
 * Strategy:
 *  - Provider attaches to the <html> element via `class` attribute.
 *  - We use a separate localStorage key for the portal so it never collides
 *    with anything the public site might set in the future.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export const PortalThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="light"
    enableSystem={false}
    storageKey="kits_portal_theme"
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);
