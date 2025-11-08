import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { apps } from './components/apps';
import { AppFilters } from './components/AppFilters';
import UtilityCard from './components/UtilityCard';
import type { AppCard } from "@/lib/types/Integration";


const appText = new Map<string, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected'],
]);


export default function Apps() {
    const [sort, setSort] = useState('ascending');
    const [appType, setAppType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredApps: AppCard[] = apps
        .sort((a, b) =>
            sort === 'ascending'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        )
        .filter((app) =>
            appType === 'connected'
                ? app.connected
                : appType === 'notConnected'
                    ? !app.connected
                    : true
        )
        .filter((app) =>
            app.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="peer-[.header-fixed]/header:mt-16 px-4 py-6 fixed-main flex grow flex-col overflow-hidden">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Utility Integrations</h1>
                <p className="text-muted-foreground">
                    Seamlessly sync your meter data by connecting with your utilities.
                </p>
            </div>

            <AppFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                appType={appType}
                setAppType={setAppType}
                sort={sort}
                setSort={setSort}
                appText={appText}
            />

            <Separator className="shadow-sm" />
            <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
                {filteredApps.map((app) => (
                    <UtilityCard key={app.name} app={app} />
                ))}
            </ul>
        </div>
    );
}
