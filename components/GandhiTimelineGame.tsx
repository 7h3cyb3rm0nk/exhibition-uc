"use client"

import { useState, useEffect } from "react"
import Timeline from "./Timeline"
import EventDisplay from "./EventDisplay"
import CompletionScreen from "./CompletionScreen"
import YearGuess from "./YearGuess"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const events = [
  {
    year: 1869,
    title: "Gandhi's Birth",
    description: "Mohandas Karamchand Gandhi is born in Porbandar, India.",
    detailedInfo:
      "Gandhi was born into a Hindu merchant caste family. His father, Karamchand Gandhi, was the diwan (chief minister) of Porbandar state.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi's+Birthplace",
    quote: "Where there is love there is life.",
  },
  {
    year: 1888,
    title: "Studies in London",
    description: "Gandhi leaves for London to study law.",
    detailedInfo:
      "In London, Gandhi studied law and jurisprudence and enrolled at the Inner Temple with the intention of becoming a barrister.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi+in+London",
    quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  },
  {
    year: 1893,
    title: "Arrives in South Africa",
    description: "Gandhi arrives in South Africa to work as a lawyer.",
    detailedInfo:
      "Gandhi's time in South Africa was a major turning point in his life, as he faced racial discrimination that shaped his social activism.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi+in+South+Africa",
    quote: "The best way to find yourself is to lose yourself in the service of others.",
  },
  {
    year: 1906,
    title: "Satyagraha in South Africa",
    description: "Gandhi leads his first large-scale act of civil disobedience in South Africa.",
    detailedInfo:
      "Gandhi organized a mass protest against the Transvaal Asiatic Registration Act, using a new method he called Satyagraha (truth-force).",
    image: "/placeholder.svg?height=300&width=400&text=Satyagraha+Movement",
    quote:
      "A small body of determined spirits fired by an unquenchable faith in their mission can alter the course of history.",
  },
  {
    year: 1915,
    title: "Return to India",
    description: "Gandhi returns to India and joins the Indian National Congress.",
    detailedInfo:
      "Upon returning to India, Gandhi began organizing peasants, farmers, and urban laborers to protest against excessive land-tax and discrimination.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi's+Return+to+India",
    quote: "Be the change that you wish to see in the world.",
  },
  {
    year: 1930,
    title: "Salt March",
    description: "Gandhi leads the Salt March, a nonviolent protest against British salt monopoly.",
    detailedInfo:
      "The Salt March was a 24-day march covering 240 miles, from Sabarmati Ashram to Dandi, to produce salt from seawater in defiance of British rule.",
    image: "/placeholder.svg?height=300&width=400&text=Salt+March",
    quote: "In a gentle way, you can shake the world.",
  },
  {
    year: 1942,
    title: "Quit India Movement",
    description: "Gandhi launches the Quit India Movement, demanding an end to British rule in India.",
    detailedInfo:
      "This movement was Gandhi's most radical and resulted in the arrest of tens of thousands of Indian independence activists.",
    image: "/placeholder.svg?height=300&width=400&text=Quit+India+Movement",
    quote: "Freedom is not worth having if it does not include the freedom to make mistakes.",
  },
  {
    year: 1947,
    title: "Indian Independence",
    description: "India gains independence. Gandhi plays a crucial role in the nonviolent movement.",
    detailedInfo:
      "Gandhi's efforts finally culminated in India's independence, but it came with the partition of India and Pakistan, which deeply saddened him.",
    image: "/placeholder.svg?height=300&width=400&text=Indian+Independence",
    quote: "The future depends on what you do today.",
  },
]

export default function GandhiTimelineGame() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [exploredEvents, setExploredEvents] = useState<number[]>([])
  const [showDetailedInfo, setShowDetailedInfo] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [guessMode, setGuessMode] = useState(true)
  const [showQuote, setShowQuote] = useState(false)

  const currentEvent = events[currentEventIndex]

  useEffect(() => {
    if (exploredEvents.length === events.length) {
      setGameCompleted(true)
    }
  }, [exploredEvents])

  const handleYearClick = (index: number) => {
    setCurrentEventIndex(index)
    setShowDetailedInfo(false)
    setShowQuote(false)
    setGuessMode(true)
    if (!exploredEvents.includes(index)) {
      setExploredEvents([...exploredEvents, index])
    }
  }

  const handleNavigation = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentEventIndex - 1 : currentEventIndex + 1
    if (newIndex >= 0 && newIndex < events.length) {
      setCurrentEventIndex(newIndex)
      setShowDetailedInfo(false)
      setShowQuote(false)
      setGuessMode(true)
      if (!exploredEvents.includes(newIndex)) {
        setExploredEvents([...exploredEvents, newIndex])
      }
    }
  }

  const toggleDetailedInfo = () => {
    setShowDetailedInfo(!showDetailedInfo)
  }

  const toggleQuote = () => {
    setShowQuote(!showQuote)
  }

  const handleGuess = (guessedYear: number) => {
    const difference = Math.abs(guessedYear - currentEvent.year)
    let pointsEarned = 0
    if (difference === 0) {
      pointsEarned = 20
    } else if (difference <= 2) {
      pointsEarned = 15
    } else if (difference <= 5) {
      pointsEarned = 10
    } else if (difference <= 10) {
      pointsEarned = 5
    }
    setScore(score + pointsEarned)
    setGuessMode(false)
  }

  const restartGame = () => {
    setCurrentEventIndex(0)
    setScore(0)
    setExploredEvents([])
    setShowDetailedInfo(false)
    setShowQuote(false)
    setGameCompleted(false)
    setGuessMode(true)
  }

  if (gameCompleted) {
    return <CompletionScreen score={score} totalEvents={events.length} onRestart={restartGame} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="mb-4 text-xl font-bold">Score: {score}</div>
      <Timeline
        events={events}
        currentYear={currentEvent.year}
        onYearClick={handleYearClick}
        exploredEvents={exploredEvents}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEventIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {guessMode ? (
            <YearGuess onGuess={handleGuess} />
          ) : (
            <EventDisplay
              event={currentEvent}
              showDetailedInfo={showDetailedInfo}
              onToggleInfo={toggleDetailedInfo}
              showQuote={showQuote}
              onToggleQuote={toggleQuote}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between mt-4">
        <Button onClick={() => handleNavigation("prev")} disabled={currentEventIndex === 0}>
          Previous Event
        </Button>
        <Button onClick={() => handleNavigation("next")} disabled={currentEventIndex === events.length - 1}>
          Next Event
        </Button>
      </div>
    </motion.div>
  )
}

