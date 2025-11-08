import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const items = [
  {
    id: 'furnace',
    label: 'Furnace',
  },
  {
    id: 'water-heater',
    label: 'Water Heater',
  },
  {
    id: 'clothes-dryer',
    label: 'Clothes Dryer',
  },
  {
    id: 'stove-range',
    label: 'Stove/Range',
  },
  {
    id: 'oven',
    label: 'Oven',
  },
  {
    id: 'fireplace',
    label: 'Fireplace',
  },
  {
    id: 'outdoor-grill',
    label: 'Outdoor Grill',
  },
  {
    id: 'pool-heater',
    label: 'Pool Heater',
  },
  {
    id: 'space-heater',
    label: 'Space Heater',
  },
  {
    id: 'generator',
    label: 'Generator',
  },
] as const;

const displayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
  items: ['recents', 'home'],
}

export function EnergyProfileForm() {
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  })

  const id = React.useId()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='items'
          render={() => (
            <FormItem>
              <div className="flex flex-col gap-3 mb-4">
                <Label htmlFor={`security-level-${id}`}>Home style</Label>
                <Select defaultValue="2">
                  <SelectTrigger
                    id={`security-level-${id}`}
                    className="w-full [&_span]:!block [&_span]:truncate"
                    aria-label="Security Level"
                  >
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Single Family</SelectItem>
                    <SelectItem value="2">Apartment</SelectItem>
                    <SelectItem value="3">Duplex</SelectItem>
                    <SelectItem value="4">Multi Family</SelectItem>
                    <SelectItem value="5">Raised Ranch</SelectItem>
                    <SelectItem value="6">Mobile</SelectItem>
                    <SelectItem value="7">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <Label htmlFor={`home-built-${id}`}>When was your Home Built</Label>
                <Select defaultValue="after-2015">
                  <SelectTrigger
                    id={`home-built-${id}`}
                    className="w-full [&_span]:!block [&_span]:truncate"
                    aria-label="When was your Home Built"
                  >
                    <SelectValue placeholder="Select year range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="after-2015">after 2015</SelectItem>
                    <SelectItem value="2011-2015">2011 - 2015</SelectItem>
                    <SelectItem value="2006-2010">2006 - 2010</SelectItem>
                    <SelectItem value="2001-2005">2001 - 2005</SelectItem>
                    <SelectItem value="1996-2000">1996 - 2000</SelectItem>
                    <SelectItem value="1990-1995">1990 - 1995</SelectItem>
                    <SelectItem value="1980s">1980s</SelectItem>
                    <SelectItem value="1970s">1970s</SelectItem>
                    <SelectItem value="1960s">1960s</SelectItem>
                    <SelectItem value="1950s">1950s</SelectItem>
                    <SelectItem value="before-1950">before 1950</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <Label htmlFor={`square-footage-${id}`}>What is the square footage of your home?</Label>
                <Select defaultValue="1751-2000">
                  <SelectTrigger
                    id={`square-footage-${id}`}
                    className="w-full [&_span]:!block [&_span]:truncate"
                    aria-label="What is the square footage of your home?"
                  >
                    <SelectValue placeholder="Select square footage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-500">less than 500 square feet</SelectItem>
                    <SelectItem value="500-600">500 - 600 square feet</SelectItem>
                    <SelectItem value="601-700">601 - 700 square feet</SelectItem>
                    <SelectItem value="701-800">701 - 800 square feet</SelectItem>
                    <SelectItem value="801-900">801 - 900 square feet</SelectItem>
                    <SelectItem value="901-1000">901 - 1000 square feet</SelectItem>
                    <SelectItem value="1001-1250">1001 - 1250 square feet</SelectItem>
                    <SelectItem value="1251-1500">1251 - 1500 square feet</SelectItem>
                    <SelectItem value="1501-1750">1501 - 1750 square feet</SelectItem>
                    <SelectItem value="1751-2000">1751 - 2000 square feet</SelectItem>
                    <SelectItem value="2001-2250">2001 - 2250 square feet</SelectItem>
                    <SelectItem value="2251-2500">2251 - 2500 square feet</SelectItem>
                    <SelectItem value="2501-2750">2501 - 2750 square feet</SelectItem>
                    <SelectItem value="2751-3000">2751 - 3000 square feet</SelectItem>
                    <SelectItem value="3001-3250">3001 - 3250 square feet</SelectItem>
                    <SelectItem value="3251-3500">3251 - 3500 square feet</SelectItem>
                    <SelectItem value="3501-3750">3501 - 3750 square feet</SelectItem>
                    <SelectItem value="3751-4000">3751 - 4000 square feet</SelectItem>
                    <SelectItem value="4001-4500">4001 - 4500 square feet</SelectItem>
                    <SelectItem value="more-than-4500">more than 4500 square feet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <Label htmlFor={`people-in-home-${id}`}>How many people live in your home?</Label>
                <Select defaultValue="4">
                  <SelectTrigger
                    id={`people-in-home-${id}`}
                    className="w-full [&_span]:!block [&_span]:truncate"
                    aria-label="How many people live in your home?"
                  >
                    <SelectValue placeholder="Select number of people" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <Label htmlFor={`num-levels-${id}`}>Number of levels in your home, not including the attic or basement</Label>
                <Select defaultValue="2">
                  <SelectTrigger
                    id={`num-levels-${id}`}
                    className="w-full [&_span]:!block [&_span]:truncate"
                    aria-label="Number of levels in your home"
                  >
                    <SelectValue placeholder="Select number of levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='mb-4'>
    <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
            Natural Gas info
        </span>
    </div>
    <hr className="my-4" />
    <FormLabel className='text-base'>Appliances</FormLabel>
    <FormDescription>
        Select all the Natural Gas Appliances that you have.
    </FormDescription>
</div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='items'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-y-0 space-x-3'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Update Profile</Button>
      </form>
    </Form>
  )
}
