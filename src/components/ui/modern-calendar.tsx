"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, X, RotateCcw } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isBefore } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { isDateAllowed, juneAllowedRanges, julyAllowedRanges, augustAllowedRanges, septemberAllowedRanges } from "@/config/availability"

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface ModernCalendarProps {
  selected: DateRange
  onSelect: (range: DateRange) => void
  onClose?: () => void
  className?: string
}

const isDateDisabled = (date: Date) => {
  return !isDateAllowed(date)
}

// Check if ALL dates between two dates are continuously allowed
const isRangeContinuouslyAllowed = (from: Date, to: Date) => {
  const start = isBefore(to, from) ? to : from
  const end = isBefore(to, from) ? from : to
  const days = eachDayOfInterval({ start, end })
  return days.every((day) => isDateAllowed(day))
}

export function ModernCalendar({ selected, onSelect, onClose, className }: ModernCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(new Date())) // Start at current month
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null)

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

  // Calculate empty slots before first day of month (Monday = 0)
  const firstDayOfMonth = days[0]
  const dayOfWeek = firstDayOfMonth.getDay() // 0=Sunday, 1=Monday, ..., 6=Saturday
  const emptySlots = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Convert to Monday-start format

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return

    if (!selected.from || (selected.from && selected.to)) {
      // Start new selection
      onSelect({ from: date, to: undefined })
    } else if (selected.from && !selected.to) {
      // Complete selection — must be within same continuous allowed block
      const from = selected.from
      const to = date

      if (isBefore(to, from)) {
        // User selected a date before the start — reverse
        if (isRangeContinuouslyAllowed(to, from)) {
          onSelect({ from: to, to: from })
        }
        // If not continuously allowed, do nothing (ignore click)
      } else {
        // Normal forward selection
        if (isRangeContinuouslyAllowed(from, to)) {
          onSelect({ from, to })
        }
        // If not continuously allowed, do nothing (ignore click)
      }
    }
  }

  const isInRange = (date: Date) => {
    if (!selected.from || !selected.to) return false
    return date > selected.from && date < selected.to
  }

  const isStart = (date: Date) => {
    return selected.from && isSameDay(date, selected.from)
  }

  const isEnd = (date: Date) => {
    return selected.to && isSameDay(date, selected.to)
  }

  // Hover preview: only show if the entire range from selected.from to hoveredDate is allowed
  const isHoveredInRange = (date: Date) => {
    if (!selected.from || selected.to || !hoveredDate) return false
    if (isBefore(hoveredDate, selected.from)) return false
    if (isDateDisabled(date)) return false
    // Only highlight if the full range would be continuously allowed
    if (!isRangeContinuouslyAllowed(selected.from, hoveredDate)) {
      // Only highlight dates that are within the same allowed block as selected.from
      const allRanges = [...juneAllowedRanges, ...julyAllowedRanges, ...augustAllowedRanges, ...septemberAllowedRanges]
      const fromBlock = allRanges.find(
        (r) => selected.from! >= r.from && selected.from! <= r.to
      )
      if (!fromBlock) return false
      return date >= selected.from && date <= fromBlock.to && isDateAllowed(date)
    }
    return date > selected.from && date <= hoveredDate
  }

  return (
    <div className={cn("bg-white rounded-2xl shadow-2xl p-4 w-full max-w-sm", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="text-lg font-semibold text-gray-900 capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: fr })}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-1"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-gray-600">Départ</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-gray-600">Retour</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-100" />
          <span className="text-gray-600">Sélection</span>
        </div>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty slots for days before start of month */}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {days.map((date) => {
          const disabled = isDateDisabled(date)
          const start = isStart(date)
          const end = isEnd(date)
          const inRange = isInRange(date)
          const hoveredRange = isHoveredInRange(date)

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
              disabled={disabled}
              className={cn(
                "aspect-square flex items-center justify-center text-sm rounded-lg transition-all",
                disabled && "text-gray-300 cursor-not-allowed bg-gray-50",
                !disabled && "hover:bg-gray-100 cursor-pointer",
                start && "bg-blue-500 text-white hover:bg-blue-600 font-semibold",
                end && "bg-purple-500 text-white hover:bg-purple-600 font-semibold",
                (inRange || hoveredRange) && "bg-blue-100 text-blue-700",
                !isSameMonth(date, currentMonth) && "text-gray-300"
              )}
            >
              {format(date, "d")}
            </button>
          )
        })}
      </div>

      {/* Reset button */}
      {selected.from && (
        <div className="mt-3 text-center">
          <button
            onClick={() => onSelect({ from: undefined, to: undefined })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Réinitialiser les dates
          </button>
        </div>
      )}

      {/* Selected dates display */}
      {selected.from && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            {selected.to ? (
              <>
                Du <span className="font-semibold text-blue-600">{format(selected.from, "dd/MM/yyyy")}</span>
                {" "}au <span className="font-semibold text-purple-600">{format(selected.to, "dd/MM/yyyy")}</span>
                {" "}({Math.ceil((selected.to.getTime() - selected.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} jours)
              </>
            ) : (
              <>
                Départ : <span className="font-semibold text-blue-600">{format(selected.from, "dd/MM/yyyy")}</span>
                {" "}- Sélectionnez la date de retour <span className="text-xs text-gray-400">(même plage uniquement)</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
