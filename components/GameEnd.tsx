import { Button } from "@/components/ui/button"

interface GameEndProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export default function GameEnd({ score, totalQuestions, onRestart }: GameEndProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Game Over</h2>
      <p className="text-xl mb-4">
        Your final score: {score} out of {totalQuestions}
      </p>
      <p className="text-lg mb-6">You got {percentage}% correct!</p>
      <p className="mb-6">
        {percentage >= 80
          ? "Excellent! You're a Gandhi expert!"
          : percentage >= 60
            ? "Good job! You know quite a bit about Gandhi's life."
            : "Keep learning! There's more to discover about Gandhi's incredible journey."}
      </p>
      <Button onClick={onRestart} className="text-lg">
        Play Again
      </Button>
    </div>
  )
}

