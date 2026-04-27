import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export const SiteLayout = ({ children, transparentHeader = false }: { children: ReactNode; transparentHeader?: boolean }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <SiteHeader />
      <main className={transparentHeader ? "-mt-[68px]" : ""}>{children}</main>
      <SiteFooter />
    </div>
  );
};
