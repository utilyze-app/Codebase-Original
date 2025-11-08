import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconBell, IconBroadcast, IconSparkles } from "@tabler/icons-react"
import { NavUser } from "./nav-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react"
import { ReportModal } from "./report-dialog"
import { ChatBubble } from "./chat-bubble"


const data = {
  user: {
    name: "Jason Roy",
    email: "m@example.com",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIE29qKAvxrZA7amT0huOeOAIatufg8ZGdeD1XGu4FL6OtT9co=s288-c-no",
  },
}

export function SiteHeader() {

  const [openReportDialog, setOpenReportDialog] = React.useState<boolean>(false)
  const [openChatBubble, setOpenChatBubble] = React.useState<boolean>(false)


  return (
    <>
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-x-4">
          <Button variant="destructive" size="sm" className="cursor-pointer" onClick={()=> setOpenReportDialog(true)}>
            <IconBroadcast /> Report Leak
          </Button>
          <Button variant="ghost" className="cursor-pointer" size="sm">
            <IconBell />
          </Button>
          <Button variant="outline" className="cursor-pointer" size="sm" onClick={()=>setOpenChatBubble(true)}>
            <IconSparkles />AI assistant
          </Button>
          <ModeToggle />
          <NavUser user={data.user}>
            <Avatar className="h-8 w-8 rounded-lg grayscale cursor-pointer">
                <AvatarImage src={data.user.avatar} alt={data.user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
          </NavUser>
        </div>
      </div>
    </header>

  {/* // Modal  */}
    <ReportModal open={openReportDialog} onOpenChange={setOpenReportDialog}/>

    {/* chat Bubble */}
    <ChatBubble open={openChatBubble} onOpenChange={setOpenChatBubble} />

    </>
  )
}
