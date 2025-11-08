import type { CardInfo } from "@/lib/types/analytics";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { SectionCards } from "./components/section-cards";

const cardData: CardInfo[] = [
  {
    label: "Total Gas Consumption",
    value: "7,500 ft³",
    trend: "up",
    change: "+12.5%",
    footerNote: "Increased vs last month",
    subtext: "Based on last billing cycle",
  },
  {
    label: "Highest Daily Usage",
    value: "320 ft³",
    trend: "down",
    change: "-20%",
    footerNote: "Highest usage recorded",
    subtext: "Occurred on June 12",
  },
  {
    label: "Average Daily Usage",
    value: "250 ft³",
    trend: "down",
    change: "-5%",
    footerNote: "Reduced from last month",
    subtext: "30-day average",
  },
  {
    label: "Estimated CO₂ Emission",
    value: "42.3 kg",
    trend: "up",
    change: "+4.5%",
    footerNote: "Impact rising",
    subtext: "Based on recent gas usage",
  },
]

function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards cardData={cardData} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
  );
}

export default Dashboard;
