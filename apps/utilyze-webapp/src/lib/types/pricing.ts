export const PAYMENT_FREQUENCIES = ["monthly", "yearly"];

export interface PricingTier {
  name: string;
  id: string;
  price: Record<string, number | string>;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  popular?: boolean;
}

export const TIERS: PricingTier[] = [
  {
    id: "individuals",
    name: "Individuals",
    price: {
      monthly: "Free",
      yearly: "Free",
    },
    description: "For your limited usage",
    features: [
      "Monthly email alerts",
      "Short Report generation",
      "Limited usage to Utilyze AI",
    ],
    cta: "Get started",
  },
  {
    id: "individuals-2",
    name: "Individuals",
    price: {
      monthly: 3,
      yearly: 25,
    },
    description: "Great for small businesses",
    features: [
      "Weekly email alerts",
      "Detailed Report generation",
      "Unlimited usage to Utilyze AI",
    ],
    cta: "Get started",
    popular: true,
  },
//   {
//     id: "organizations",
//     name: "Organizations",
//     price: {
//       monthly: 120,
//       yearly: 100,
//     },
//     description: "Great for large businesses",
//     features: [
//       "Unlimited phone calls",
//       "15 second checks",
//       "Single-user account",
//       "50 monitors",
//       "Up to 10 seats",
//     ],
//     cta: "Get started",
//   },
  {
    id: "enterprise",
    name: "Utiltity",
    price: {
      monthly: "Custom",
      yearly: "Custom",
    },
    description: "For multiple teams",
    features: [
      "Everything in Organizations",
      "Access to on-grid analytics",
      "Access to outage map",
      "User mangement dashboard",
    ],
    cta: "Contact Us",
    highlighted: true,
  },
];
