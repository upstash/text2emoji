import { useState, useEffect } from 'react'

export function useEmojis(searchTerm: string) {
  const [emojis, setEmojis] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEmojis() {
      if (!searchTerm) {
        setEmojis([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/search-emojis?q=${encodeURIComponent(searchTerm)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch emojis')
        }
        const data = await response.json()
        setEmojis(data.emojis)
      } catch (err) {
        setError('Failed to fetch emojis')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmojis()
  }, [searchTerm])

  return { emojis, isLoading, error }
}

