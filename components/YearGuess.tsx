import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Event {
  year: number
  title: string
  description: string
  quote: string
  image: string
}

interface YearGuessProps {
  onGuess: (year: number) => void
  event: Event
}

export default function YearGuess({ onGuess, event }: YearGuessProps) {
  const [guessedYear, setGuessedYear] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const year = Number.parseInt(guessedYear)
    if (!isNaN(year)) {
      onGuess(year)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Guess the Year</h2>
      <p className="text-lg">Based on what you've learned, can you guess the year of Gandhi's assassination?</p>
      <p className="text-md italic">{event.description}</p>
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <Input
          type="number"
          value={guessedYear}
          onChange={(e) => setGuessedYear(e.target.value)}
          placeholder="Enter year (e.g., 1948)"
          className="flex-grow"
        />
        <Button type="submit">Submit Guess</Button>
      </form>
    </div>
  )
}

