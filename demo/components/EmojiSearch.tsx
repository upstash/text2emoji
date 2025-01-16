'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useDebounce } from '@/hooks/useDebounce'
import { useEmojis } from '@/hooks/useEmojis'
import toast from 'react-hot-toast'

export default function EmojiSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { emojis, isLoading, error } = useEmojis(debouncedSearchTerm)

  const copyToClipboard = (emoji: string) => {
    navigator.clipboard.writeText(emoji).then(() => {
      toast.success(`${emoji} copied to clipboard!`, {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }).catch(err => {
      console.error('Failed to copy emoji: ', err);
      toast.error('Failed to copy emoji', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    });
  };

  return (
    <div className="w-full max-w-md">
      <Input
        type="text"
        placeholder="Search for emojis..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-4">
          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>
          ) : emojis.length > 0 ? (
            <div className="grid grid-cols-5 gap-4">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="text-4xl text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-2 transition-colors"
                  onClick={() => copyToClipboard(emoji)}
                  title={`Copy ${emoji} to clipboard`}
                  aria-label={`Copy ${emoji} to clipboard`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No emojis found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

