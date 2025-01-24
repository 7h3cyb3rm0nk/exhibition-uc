import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Question {
  question: string
  options: (string | number)[]
  correctAnswer: string | number
}

interface QuizSectionProps {
  questions: Question[]
  onComplete: (score: number) => void
}

export default function QuizSection({ questions, onComplete }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswer = (selectedAnswer: string | number) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      onComplete(score + (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0))
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Quiz Time!</h2>
      <p className="text-lg mb-2">
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <Button key={index} onClick={() => handleAnswer(option)} className="text-lg py-4">
              {option}
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

