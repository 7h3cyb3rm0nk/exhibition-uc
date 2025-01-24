import { Button } from "@/components/ui/button"

interface TimelineProps {
  events: { year: number; title: string }[]
  currentYear: number
  onYearClick: (index: number) => void
  exploredEvents: number[]
}

export default function Timeline({ events, currentYear, onYearClick, exploredEvents }: TimelineProps) {
  return (
    <div className="flex justify-between items-center mb-4 overflow-x-auto">
      {events.map((event, index) => (
        <Button
          key={event.year}
          onClick={() => onYearClick(index)}
          variant={currentYear === event.year ? "default" : "outline"}
          className={`text-sm mx-1 ${exploredEvents.includes(index) ? "bg-green-100" : ""}`}
        >
          {event.year}
        </Button>
      ))}
    </div>
  )
}

