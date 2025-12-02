"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(input)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground z-10" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="pl-10 pr-20 py-3 h-auto bg-card border-primary/20 focus-visible:ring-primary/20 focus-visible:border-primary/50"
        />
        <Button
          type="submit"
          className="absolute right-2 top-1 bottom-1 px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
