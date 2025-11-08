"use client"

import * as React from "react"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { FeedbackModal } from "./feedback-dialog"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  
  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <>
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {
                item.title == "Feedback" ? (
                  <SidebarMenuButton onClick={()=>setOpen(true)}>
                  <item.icon />
                  <span>{item.title}</span>
              </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
                )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

  {/* // Modal  */}
    <FeedbackModal open={open} onOpenChange={setOpen} />
    </>
  )
}
