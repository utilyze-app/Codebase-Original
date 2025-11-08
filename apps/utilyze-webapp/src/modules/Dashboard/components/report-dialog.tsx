"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { IconCurrentLocationFilled } from "@tabler/icons-react"

export function ReportModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const id = React.useId()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                <DialogTitle>Report a leak in your Area</DialogTitle>
                <DialogDescription>
                    What area are you having problems with?
                </DialogDescription>
            </DialogHeader>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor={`area-${id}`}>Type</Label>
                        <Select defaultValue="billing">
                            <SelectTrigger
                                id={`area-${id}`}
                                aria-label="Area"
                                className="w-full"
                            >
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="team">Natural Gas</SelectItem>
                                <SelectItem value="billing">Water</SelectItem>
                                <SelectItem value="account">Electricity</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor={`security-level-${id}`}>Intensity Level</Label>
                        <Select defaultValue="2">
                            <SelectTrigger
                                id={`security-level-${id}`}
                                className="w-full [&_span]:!block [&_span]:truncate"
                                aria-label="Security Level"
                            >
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">High</SelectItem>
                                <SelectItem value="2">Medium</SelectItem>
                                <SelectItem value="3">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <Label htmlFor={`subject-${id}`}>Locate Leak</Label>
                    <Button size="sm">
                        <IconCurrentLocationFilled/> Use Current Location
                    </Button>
                </div>
                <div className="flex flex-col gap-3">
                    <Label htmlFor={`description-${id}`}>Description</Label>
                    <Textarea
                        id={`description-${id}`}
                        placeholder="Please include all information relevant to your issue."
                        className="min-h-28"
                    />
                </div>
                <DialogFooter className="justify-end gap-2">
                    <DialogClose asChild>
              <Button variant="ghost" size="sm">Cancel</Button>
            </DialogClose>
                <Button size="sm">Submit</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
