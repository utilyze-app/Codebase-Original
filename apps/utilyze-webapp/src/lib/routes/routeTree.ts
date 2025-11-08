import Dashboard from "@/modules/analytics/Dashboard";
import Layout from "@/modules/Dashboard/Layout";
import Integrations from "@/modules/integration/page";
import MapDashboard from "@/modules/Maps/page";
import { Pricing } from "@/modules/pricing/page";
import SettingsAccount from "@/modules/settings/account";
import SettingsEnergyProfile from "@/modules/settings/energyprofile";
import SettingsNotifications from "@/modules/settings/notifications";
import Settings from "@/modules/settings/page";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: Layout,
}
)


const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: Pricing,
})



// Settings layout route (parent with <Outlet />)
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/application/settings',
  component: Settings,
})


const SettingschildRoutes = [
  createRoute({ getParentRoute: () => settingsRoute, path: '/', component: SettingsAccount }),
  createRoute({ getParentRoute: () => settingsRoute, path: '/profile', component: SettingsEnergyProfile }),
  createRoute({ getParentRoute: () => settingsRoute, path: '/notifications', component: SettingsNotifications }),
]

const childRoutes = [
  createRoute({ getParentRoute: () => rootRoute, path: '/dashboard', component: Dashboard }),
  createRoute({ getParentRoute: () => rootRoute, path: '/utilities/connect', component: Integrations }),
  createRoute({ getParentRoute: () => rootRoute, path: '/maps/explore', component: MapDashboard }),
  settingsRoute,
  pricingRoute,
  ...SettingschildRoutes,
]

const routeTree = rootRoute.addChildren(childRoutes)

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

