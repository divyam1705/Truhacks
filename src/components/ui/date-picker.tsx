"use client"
import { Timestamp } from 'firebase/firestore';

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({dat}:{dat:Date}) {
  if (dat instanceof Timestamp) {
    // Convert Firebase Timestamp to JavaScript Date object
    dat = dat.toDate();
  }
    // const dat =dat.toDate();
  // const [date, setDate] = React.useState<Date>(dat)
console.log(dat);
  return (
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dat && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(dat, "PPPp") }
        </Button>
  )
}
