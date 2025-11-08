import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { AppCard } from "@/lib/types/Integration";

type AppCardProps = {
    app: AppCard
}


export default function UtilityCard({ app }: AppCardProps) {
    return (
        <li
            key={app.name}
            className="rounded-lg border p-4 hover:shadow-md"
        >
            <div className="mb-8 flex items-center justify-between">
                <Avatar className="size-10">
                    <AvatarImage src={app.logo} alt={app.name} />
                    <AvatarFallback>{app.name[0]}</AvatarFallback>
                </Avatar>
                <Button
                    variant="outline"
                    size="sm"
                    className={
                        app.connected
                            ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900'
                            : ''
                    }
                >
                    {app.connected ? 'Connected' : 'Connect'}
                </Button>
            </div>
            <div>
                <h2 className="mb-1 font-semibold">{app.name}</h2>
                <p className="line-clamp-2 text-gray-500">{app.desc}</p>
            </div>
        </li>
    );
}