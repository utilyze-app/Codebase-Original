"use client";

import { Link } from "@tanstack/react-router";
// pricing page : https://www.shadcnblocks.com/block/pricing34
// optimize page loading, remove framer motion

import { PricingCard } from "./components/PricingCard";
import { PricingHeader } from "./components/PricingHeader";
import { PAYMENT_FREQUENCIES, TIERS } from "@/lib/types/pricing";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconInnerShadowTop } from "@tabler/icons-react";

export const Pricing = () => {
  const [selectedPaymentFreq, setSelectedPaymentFreq] = useState(
    PAYMENT_FREQUENCIES[0],
  );

  return (
    <div className="relative z-10">
              <div className="container mx-auto h-[100dvh] px-4">
                <header className="container mx-auto flex h-fit items-center justify-between py-4">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        <IconInnerShadowTop className="!size-5" />
        <span>Utilyze</span>
      </h1>
      <nav className="flex items-center gap-4">
        <Link to="/dashboard"
        >
          <Button
            variant="default"
            className="h-fit rounded-full bg-[#222] font-semibold text-white hover:bg-[#222]/90"
          >
            Dashboard
          </Button>
        </Link>
      </nav>
    </header>
    <section className="flex flex-col items-center gap-10 py-10">
      {/* Section Header */}
      <PricingHeader
        title="Plans and Pricing"
        subtitle="Receive unlimited credits when you pay yearly, and save on your plan. CHANGE THE DESIGN OF THE PAGE OR YOU WILL GET COPYRIGHT"
        frequencies={PAYMENT_FREQUENCIES}
        selectedFrequency={selectedPaymentFreq}
        onFrequencyChange={setSelectedPaymentFreq}
      />

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
        {TIERS.map((tier, i) => (
          <PricingCard
            key={i}
            tier={tier}
            paymentFrequency={selectedPaymentFreq}
          />
        ))}
      </div>
    </section>
    </div>
    </div>
  );
};
