import * as React from "react"
import {
  IconDashboard,
  IconPlugConnected,
  IconHelp,
  IconSettings,
  IconMessageChatbot,
  IconMap2,
  IconDotsVertical
} from "@tabler/icons-react"

import { NavMain } from "@/modules/Dashboard/components/nav-main"
import { NavSecondary } from "@/modules/Dashboard/components/nav-secondary"
import { NavUser } from "@/modules/Dashboard/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
  user: {
    name: "Jason Roy",
    email: "m@example.com",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIE29qKAvxrZA7amT0huOeOAIatufg8ZGdeD1XGu4FL6OtT9co=s288-c-no",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    // {
    //   title: "Usage",
    //   url: "/account/usage",
    //   icon: IconChartBarPopular,
    // },
    {
      title: "Maps",
      url: "/maps/explore",
      icon: IconMap2,
    },
    // {
    //   title: "Chat",
    //   url: "/utilities/chat/support",
    //   icon: IconMessages,
    // },
    {
      title: "Connect Utilities",
      url: "/utilities/connect",
      icon: IconPlugConnected,
    },
    // {
    //   title: "Programs",
    //   url: "/utilities/Programs",
    //   icon: IconCalendarCheck,
    // },
    // {
    //   title: "Cost Explorer",
    //   url: "/account/explorer/cost",
    //   icon: IconRosetteDiscount,
    // }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/application/settings",
      icon: IconSettings,
    },
    {
      title: "Feedback",
      url: "#",
      icon: IconMessageChatbot,
    },
    {
      title: "Get Help",
      url: "/application/support",
      icon: IconHelp,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard">
                <img src="https://static.wixstatic.com/media/4cff72_9247cc9e1e69408689b141a3d3706765~mv2.png/v1/crop/x_0,y_0,w_1004,h_1024/fill/w_49,h_50,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Utilyze%20Logo%20-%20Icon%20Black.png" className="!size-5" />
                <span className="text-base font-semibold">UTILYZE</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel> */}
      <SidebarContent>
        <NavMain menutype="MAIN MENU" items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user}> 
          <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={data.user.avatar} alt={data.user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{data.user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {data.user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
        </NavUser>
      </SidebarFooter>
    </Sidebar>
  )
}
