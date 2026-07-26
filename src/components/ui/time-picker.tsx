"use client"

import { useMemo } from "react"
import { Clock } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [hour, minute] = value.split(":")

  const hours = useMemo(() => 
    Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
  , [])

  const minutes = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"))
  , [])

  const handleHourChange = (newHour: string) => {
    onChange(`${newHour}:${minute || "00"}`)
  }

  const handleMinuteChange = (newMinute: string) => {
    onChange(`${hour || "00"}:${newMinute}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <div className="flex items-center gap-1 flex-1">
        <Select value={hour || "06"} onValueChange={handleHourChange}>
          <SelectTrigger className="w-full h-10 text-sm">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {hours.map((h) => (
              <SelectItem key={h} value={h} className="text-sm">
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-gray-400 font-medium">:</span>
        <Select value={minute || "00"} onValueChange={handleMinuteChange}>
          <SelectTrigger className="w-full h-10 text-sm">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {minutes.map((m) => (
              <SelectItem key={m} value={m} className="text-sm">
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
