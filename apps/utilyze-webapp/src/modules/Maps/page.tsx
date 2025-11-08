import type { CardInfo } from "@/lib/types/analytics";
import { SectionCards } from "../analytics/components/section-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapofUSA } from "./components/MapUSA";
import { Button } from "@/components/ui/button";
import { IconExternalLink } from "@tabler/icons-react";



const cardData: CardInfo[] = [
  {
    label: "Total Leaks",
    value: "3,476",
    trend: "up",
    change: "+6.2%",
    footerNote: "New leak this month",
    subtext: "Auto + manual detections",
  },
  {
    label: "High-Risk Leaks",
    value: "214",
    trend: "up",
    change: "+12%",
    footerNote: "Critical leak volume rising",
    subtext: "Priority for dispatch",
  },
  {
    label: "Resolved Leaks",
    value: "2,789",
    trend: "up",
    change: "+12.5%",
    footerNote: "Improved resolution rate",
    subtext: "Auto-dispatch + manual fix",
  },
  {
    label: "Response Time",
    value: "3h 45m",
    trend: "down",
    change: "-9.8%",
    footerNote: "Faster resolution",
    subtext: "Detection to on-site response",
  },
]


// const leakData = {
//   CA: 23,
//   TX: 18,
//   NY: 12,
//   FL: 10,
//   IL: 8,
//   // Add more states as needed
// };




export default function MapDashboard() {

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards cardData={cardData} />
          <div className="px-4 lg:px-6">
            <Card className="w-full mx-auto">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Leak Density by State</CardTitle>
                <Button variant="outline" className="cursor-pointer" size="sm">
                  Open Map in New Window <IconExternalLink />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <MapofUSA />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}