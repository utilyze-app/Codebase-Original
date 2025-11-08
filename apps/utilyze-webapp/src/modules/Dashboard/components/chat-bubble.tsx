import { Sheet, SheetContent, SheetHeader, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useState } from "react"

export function ChatBubble({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [prompt, setPrompt] = useState("")

  const suggestions = [
      {
    title: "View gas usage trends",
    description: "Show my appliance-level gas consumption",
  },
  {
    title: "Detect gas leaks",
    description: "Where are the latest leak alerts?",
  },
  {
    title: "Billing insights",
    description: "What’s driving my gas bill this month?",
  },
  {
    title: "Compare with neighbors",
    description: "How does my usage compare in my ZIP code?",
  }
  ]

  const handleSubmit = () => {
    if (!prompt.trim()) return
    // Send the prompt to your AI backend here
    console.log("Submitting prompt:", prompt)
    setPrompt("") // clear input
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col h-full p-6">
        {/* Header */}
        <SheetHeader className="mb-6">
          <div className="space-y-1 text-left">
            <h1 className="text-2xl font-bold">Hello there!</h1>
            <p className="text-muted-foreground text-base">How can I help you today?</p>
          </div>
        </SheetHeader>

        {/* Suggestions */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-6">
          {suggestions.map((item, index) => (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              key={index}
              className="rounded-xl border border-border bg-muted/30 p-4 text-left hover:bg-muted/50 transition"
              onClick={() => setPrompt(`${item.title} ${item.description}`)}
            >
              <div className="text-sm font-medium">{item.title}</div>
              <div className="text-muted-foreground text-sm">{item.description}</div>
            </motion.button>
          ))}
        </div>

        {/* Footer with input */}
        <SheetFooter className="mt-auto pt-4 border-t border-border">
          <div className="flex w-full items-center gap-2">
            <Label htmlFor="prompt" className="sr-only">Prompt</Label>
            <Input
              id="prompt"
              placeholder="Enter your prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="flex-1"
            />
            <Button onClick={handleSubmit} type="button">Send</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
