import { AppSidebar } from "@/modules/Dashboard/components/app-sidebar";
import { SiteHeader } from "@/modules/Dashboard/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useMatches } from '@tanstack/react-router';
import type React from "react";


const layoutExcludedRoutes = ["/pricing", "/login"];

export default function Layout() {
    const matches = useMatches();

    // If the current route or any parent matches an excluded route, skip layout
 const shouldSkipLayout = matches.some(match =>
  layoutExcludedRoutes.includes(match.routeId)
);


  if (shouldSkipLayout) {
    return <Outlet />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Outlet /> {/* <- This is where the actual page content goes */}
      </SidebarInset>
    </SidebarProvider>
  );
}
