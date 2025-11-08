"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export function InputOTPForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        }
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-2xl font-bold">Please check your email</FormLabel>
                                    <FormDescription>
                                        We’ve sent a 6-digit verification code to your email <span className="font-bold">hi@company.com</span>
                                    </FormDescription>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field} className="w-full justify-center">
                                            <InputOTPGroup className="flex w-full justify-center gap-x-4">
                                                {Array.from({ length: 6 }).map((_, i) => (
                                                    <InputOTPSlot
                                                        key={i}
                                                        index={i}
                                                        className="w-12 h-12 text-lg border border-input rounded-md text-center"
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Resend OTP in <span className="font-bold">00:30</span>
                                        </div>
                                        <a href="#" className="text-sm underline">
                                            Resend OTP
                                        </a>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>

    )
}
