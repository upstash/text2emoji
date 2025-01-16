import EmojiSearch from '@/components/EmojiSearch'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <header className="w-full p-4 flex justify-end">
        <ThemeToggle />
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Emoji Semantic Search</h1>
        <EmojiSearch />
      </main>
      <footer className="w-full py-4 text-center bg-gray-100 dark:bg-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Powered by <a 
            href="https://upstash.com/docs/vector/overall/whatisvector?utm_source=upstash_emoji_search" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >Upstash Vector</a>, created with <a 
            href="https://v0.dev/?utm_source=upstash_emoji_search"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >Vercel v0</a>, and 100% <a 
            href="https://github.com/upstash/text2emoji"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >Open Source</a>
        </p>
      </footer>
    </div>
  )
}

