"use client";

import { usePathname } from "next/navigation";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { BusinessSettings } from "@/lib/site-settings";

export function LayoutShell({
  business,
  children,
}: {
  business: BusinessSettings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardPath =
    pathname.startsWith("/admin") || pathname.startsWith("/giris");

  if (isDashboardPath) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader business={business} />
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter business={business} />
      </div>
      <MobileStickyBar business={business} />
    </>
  );
}
