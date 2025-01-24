import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface CompletionScreenProps {
  score: number
  totalEvents: number
  onRestart: () => void
}

export default function CompletionScreen({ score, totalEvents, onRestart }: CompletionScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-lg p-6 text-center"
    >
      <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
      <p className="text-xl mb-4">You've completed Gandhi's Life Journey</p>
      <p className="text-lg mb-4">
        Your final score: {score} / {totalEvents * 20}
      </p>
      <p className="mb-6">
        You've explored all the major events in Mahatma Gandhi's life. His principles of non-violence and civil
        disobedience continue to inspire people around the world. Gandhi's journey from a shy lawyer to the 'Father of
        the Nation' is a testament to the power of perseverance and moral courage.
      </p>
      <Button onClick={onRestart} className="text-lg">
        Play Again
      </Button>
    </motion.div>
  )
}

