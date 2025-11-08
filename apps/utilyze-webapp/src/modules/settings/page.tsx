import { Outlet } from '@tanstack/react-router'
import {
    IconBrowserCheck,
    IconNotification,
    IconTool,
} from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import { NavMain } from '../Dashboard/components/nav-main'


const data = {
    sideNavItems: [
        {
            title: 'Account',
            url: '/application/settings',
            icon: IconTool,
        },
        {
            title: 'Notifications',
            url: '/application/settings/notifications',
            icon: IconNotification ,
        },
        {
            title: 'Energy Profile',
            url: '/application/settings/profile',
            icon: IconBrowserCheck ,
        },
    ]
}


export default function Settings() {
    return (
        <div className="peer-[.header-fixed]/header:mt-16 px-4 py-6 fixed-main flex grow flex-col overflow-hidden">
            <div className='space-y-0.5'>
                <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                    Settings
                </h1>
                <p className='text-muted-foreground'>
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className='my-4 lg:my-6' />
            <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <aside className='top-0 lg:sticky lg:w-1/5'>
                    <NavMain menutype="CONTROLS" items={data.sideNavItems} />
                </aside>
                <div className='flex w-full overflow-y-hidden p-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
