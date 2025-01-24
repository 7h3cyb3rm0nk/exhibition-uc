import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Event {
  year: number
  title: string
  description: string
  quote: string
  image: string
}

interface TimelineEventProps {
  event: Event
}

export default function TimelineEvent({ event }: TimelineEventProps) {
  const [showQuote, setShowQuote] = useState(false)

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">
        {event.year}: {event.title}
      </h2>
      <Image
        src={event.image || "/placeholder.svg"}
        alt={event.title}
        width={400}
        height={300}
        className="rounded-lg shadow-md mx-auto"
      />
      <p className="text-lg">{event.description}</p>
      <Button onClick={() => setShowQuote(!showQuote)}>{showQuote ? "Hide Quote" : "Show Quote"}</Button>
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-100 p-4 rounded-md"
          >
            <p className="text-blue-800 italic">"{event.quote}"</p>
            <p className="text-blue-600 text-right mt-2">- Mahatma Gandhi</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

