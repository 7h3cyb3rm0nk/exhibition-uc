import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Event {
  year: number
  title: string
  description: string
  detailedInfo: string
  image: string
  quote: string
}

interface EventDisplayProps {
  event: Event
  showDetailedInfo: boolean
  onToggleInfo: () => void
  showQuote: boolean
  onToggleQuote: () => void
}

export default function EventDisplay({
  event,
  showDetailedInfo,
  onToggleInfo,
  showQuote,
  onToggleQuote,
}: EventDisplayProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-2">
        {event.year}: {event.title}
      </h2>
      <Image
        src={event.image || "/placeholder.svg"}
        alt={event.title}
        width={400}
        height={300}
        className="mb-4 rounded-md"
      />
      <p className="text-gray-700 mb-4">{event.description}</p>
      <div className="flex space-x-4 mb-4">
        <Button onClick={onToggleInfo}>{showDetailedInfo ? "Hide Details" : "Show Details"}</Button>
        <Button onClick={onToggleQuote}>{showQuote ? "Hide Quote" : "Show Quote"}</Button>
      </div>
      {showDetailedInfo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-100 p-4 rounded-md mb-4"
        >
          <p className="text-gray-800">{event.detailedInfo}</p>
        </motion.div>
      )}
      {showQuote && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-blue-100 p-4 rounded-md"
        >
          <p className="text-blue-800 italic">"{event.quote}"</p>
          <p className="text-blue-600 text-right mt-2">- Mahatma Gandhi</p>
        </motion.div>
      )}
    </div>
  )
}

