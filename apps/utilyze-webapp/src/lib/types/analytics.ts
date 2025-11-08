// Type for card data
type Trend = "up" | "down"

export type CardInfo = {
  label: string
  value: string
  trend: Trend
  change: string
  subtext: string
  footerNote: string
}
