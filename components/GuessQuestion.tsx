import { Button } from "@/components/ui/button"

interface GuessQuestionProps {
  question: string
  options: (string | number)[]
  correctAnswer: number
  onAnswer: (isCorrect: boolean) => void
}

export default function GuessQuestion({ question, options, correctAnswer, onAnswer }: GuessQuestionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Button key={index} onClick={() => onAnswer(index === correctAnswer)} className="text-lg py-4">
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}

