"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TimelineEvent from "../components/TimelineEvent"
import QuizSection from "../components/QuizSection"
import GameEnd from "../components/GameEnd"
import { Button } from "@/components/ui/button"

const events = [
  {
    year: 1869,
    title: "Gandhi's Birth",
    description:
      "Mohandas Karamchand Gandhi is born on October 2nd in Porbandar, Gujarat, India. He is born into a Hindu merchant caste family. His father, Karamchand Gandhi, serves as the diwan (chief minister) of Porbandar state.",
    quote: "Where there is love there is life.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi's+Birthplace",
  },
  {
    year: 1883,
    title: "Marriage to Kasturba",
    description:
      "At the age of 13, Gandhi is married to 14-year-old Kasturba Makhanji in an arranged marriage. Their marriage lasts for 62 years until Kasturba's death in 1944. Despite the early difficulties, their relationship grows to be one of mutual respect and support.",
    quote: "The weak can never forgive. Forgiveness is the attribute of the strong.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi's+Marriage",
  },
  {
    year: 1888,
    title: "Studies in London",
    description:
      "Gandhi leaves for London to study law at the Inner Temple. This marks his first trip outside of India. In London, he faces numerous challenges, including adapting to Western customs while maintaining his vegetarian diet and Hindu beliefs.",
    quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi+in+London",
  },
  {
    year: 1893,
    title: "Arrives in South Africa",
    description:
      "Gandhi arrives in South Africa to work as a lawyer for an Indian company. His experiences with racial discrimination in South Africa prove to be a turning point in his life, shaping his social activism and political views.",
    quote: "The best way to find yourself is to lose yourself in the service of others.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi+in+South+Africa",
  },
  {
    year: 1906,
    title: "Satyagraha in South Africa",
    description:
      "Gandhi leads his first large-scale act of civil disobedience, called Satyagraha (truth-force), in South Africa. He and other Indians burn their identification cards to protest the Transvaal Asiatic Registration Act. This marks the beginning of his nonviolent resistance method.",
    quote:
      "A small body of determined spirits fired by an unquenchable faith in their mission can alter the course of history.",
    image: "/placeholder.svg?height=300&width=400&text=Satyagraha+Movement",
  },
  {
    year: 1915,
    title: "Return to India",
    description:
      "Gandhi returns to India after 21 years in South Africa. He is welcomed as a national hero. He joins the Indian National Congress and begins to play a significant role in the Indian independence movement.",
    quote: "Be the change that you wish to see in the world.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi's+Return+to+India",
  },
  {
    year: 1919,
    title: "Rowlatt Act Protests",
    description:
      "Gandhi organizes nationwide protests against the repressive Rowlatt Act, which allowed the British to imprison Indians without trial. This leads to the tragic Jallianwala Bagh massacre, where British troops kill hundreds of peaceful protesters.",
    quote: "An eye for an eye leaves the whole world blind.",
    image: "/placeholder.svg?height=300&width=400&text=Rowlatt+Act+Protests",
  },
  {
    year: 1920,
    title: "Non-Cooperation Movement",
    description:
      "Gandhi launches the Non-Cooperation Movement, calling for Indians to boycott British goods, institutions, and government positions. This mass civil disobedience campaign significantly challenges British colonial authority.",
    quote: "First they ignore you, then they laugh at you, then they fight you, then you win.",
    image: "/placeholder.svg?height=300&width=400&text=Non-Cooperation+Movement",
  },
  {
    year: 1930,
    title: "Salt March",
    description:
      "Gandhi leads the Salt March, a nonviolent protest against the British salt monopoly. He and his followers walk 240 miles to the sea to make their own salt. This act of civil disobedience sparks similar protests across India and becomes a pivotal moment in the independence movement.",
    quote: "In a gentle way, you can shake the world.",
    image: "/placeholder.svg?height=300&width=400&text=Salt+March",
  },
  {
    year: 1932,
    title: "Hunger Strike for Untouchables",
    description:
      "Gandhi begins a hunger strike to protest the British government's decision to separate electoral seats for untouchables. His actions lead to the Poona Pact, which ensures better representation for marginalized communities.",
    quote: "To other countries, I may go as a tourist, but to India, I come as a pilgrim.",
    image: "/placeholder.svg?height=300&width=400&text=Hunger+Strike",
  },
  {
    year: 1942,
    title: "Quit India Movement",
    description:
      "Gandhi launches the Quit India Movement, demanding an immediate end to British rule in India. This leads to the arrest of Gandhi and other Congress leaders, but it also marks a turning point in the struggle for independence.",
    quote: "Freedom is not worth having if it does not include the freedom to make mistakes.",
    image: "/placeholder.svg?height=300&width=400&text=Quit+India+Movement",
  },
  {
    year: 1944,
    title: "Kasturba's Death",
    description:
      "Kasturba Gandhi dies in detention at the Aga Khan Palace in Pune, where she and Gandhi were imprisoned. Her death deeply affects Gandhi, who continues his struggle for independence while mourning his lifelong companion.",
    quote: "Love never claims, it ever gives.",
    image: "/placeholder.svg?height=300&width=400&text=Kasturba's+Death",
  },
  {
    year: 1947,
    title: "Indian Independence",
    description:
      "India gains independence on August 15. While this is a moment of triumph, it's also marked by the partition of India and Pakistan, which deeply saddens Gandhi. He works tirelessly to promote peace between Hindus and Muslims during this tumultuous time.",
    quote: "The future depends on what you do today.",
    image: "/placeholder.svg?height=300&width=400&text=Indian+Independence",
  },
  {
    year: 1948,
    title: "Gandhi's Assassination",
    description:
      "On January 30, Gandhi is assassinated in New Delhi by Nathuram Godse, a Hindu nationalist who opposed Gandhi's philosophy of nonviolence and his efforts to promote Hindu-Muslim unity. His death is mourned worldwide, and his legacy continues to inspire movements for civil rights and freedom across the globe.",
    quote: "My life is my message.",
    image: "/placeholder.svg?height=300&width=400&text=Gandhi's+Assassination",
  }
];

const questions = [
  {
 question: "In which year was Mahatma Gandhi born?",
 options: [1865, 1869, 1872, 1875],
 correctAnswer: 1869,
  },
  {
 question: "How old was Gandhi when he got married?",
 options: [10, 13, 16, 18],
 correctAnswer: 13,
  },
  {
 question: "What did Gandhi study in London?",
 options: ["Medicine", "Engineering", "Law", "Philosophy"],
 correctAnswer: "Law",
  },
  {
 question: "In which year did Gandhi arrive in South Africa?",
 options: [1890, 1893, 1896, 1899],
 correctAnswer: 1893,
  },
  {
 question: "What was the name of Gandhi's nonviolent resistance method?",
 options: ["Ahimsa", "Satyagraha", "Swaraj", "Dharma"],
 correctAnswer: "Satyagraha",
  },
  {
 question: "How many years did Gandhi spend in South Africa before returning to India?",
 options: [15, 18, 21, 25],
 correctAnswer: 21,
  },
  {
 question: "How many miles did Gandhi walk during the Salt March?",
 options: [150, 200, 240, 300],
 correctAnswer: 240,
  },
  {
 question: "What was the name of the movement Gandhi launched in 1942?",
 options: ["Freedom Movement", "Quit India Movement", "Swaraj Movement", "Independence Now"],
 correctAnswer: "Quit India Movement",
  },
  {
 question: "On which date did India gain independence?",
 options: ["January 26", "August 15", "October 2", "December 1"],
 correctAnswer: "August 15",
  },
  {
 question: "In which year was Gandhi assassinated?",
 options: [1945, 1947, 1948, 1950],
 correctAnswer: 1948,
  },
  {
 question: "What was the name of Gandhi's wife?",
 options: ["Indira", "Kasturba", "Kamala", "Savitri"],
 correctAnswer: "Kasturba",
  },
  {
 question: "What protest did Gandhi lead against the British salt monopoly?",
 options: ["Salt Strike", "Salt Walk", "Salt March", "Salt Rebellion"],
 correctAnswer: "Salt March",
  },
  {
 question: "In which country did Gandhi first develop his method of nonviolent resistance?",
 options: ["India", "South Africa", "England", "United States"],
 correctAnswer: "South Africa",
  },
  {
 question: "What principle was central to Gandhi's philosophy of resistance?",
 options: ["Violence", "Compromise", "Nonviolence", "Retribution"],
 correctAnswer: "Nonviolence",
  },
  {
 question: "Which organization did Gandhi join upon returning to India?",
 options: ["Muslim League", "Indian National Congress", "British Parliament", "Servants of the People Society"],
 correctAnswer: "Indian National Congress",
  }
 ];

export default function GandhiTimelineGame() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [gamePhase, setGamePhase] = useState<"start" | "timeline" | "quiz" | "end">("start")
  const [score, setScore] = useState(0)

  const changeToTimeline = () => {
    setGamePhase("timeline")
  }

  const handleNext = () => {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1)
    } else {
      setGamePhase("quiz")
    }
  }

  const handlePrevious = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1)
    }
  }

  const handleQuizComplete = (quizScore: number) => {
    setScore(quizScore)
    setGamePhase("end")
  }

  const restartGame = () => {
    setCurrentEventIndex(0)
    setGamePhase("start")
    setScore(0)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Gandhi's Life Journey: An Interactive Timeline</h1>
      <AnimatePresence mode="wait">
        {gamePhase === "start" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5 }}
              
            >
            <div className = "flex justify-between  mx-auto w-fit ">
              <Button className = "text-4xl py-8 px-4" onClick={changeToTimeline}>Start</Button>
            </div>
            </motion.div>
          )}
          </AnimatePresence>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8" hidden={gamePhase === "start"}>
        <AnimatePresence mode="wait">
        
          {gamePhase === "timeline" && (
            <motion.div
              key={currentEventIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <TimelineEvent event={events[currentEventIndex]} />
              <div className="flex justify-between mt-8">
                <Button onClick={handlePrevious} disabled={currentEventIndex === 0}>
                  Previous Event
                </Button>
                <Button onClick={handleNext}>
                  {currentEventIndex === events.length - 1 ? "Start Quiz" : "Next Event"}
                </Button>
              </div>
            </motion.div>
          )}
          {gamePhase === "quiz" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <QuizSection questions={questions} onComplete={handleQuizComplete} />
            </motion.div>
          )}
          {gamePhase === "end" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              
            >
              <GameEnd score={score} totalQuestions={questions.length} onRestart={restartGame} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

