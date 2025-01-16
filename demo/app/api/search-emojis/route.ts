import { NextResponse } from 'next/server'
import Text2Emoji from '@upstash/text2emoji'

const text2emoji = new Text2Emoji({
  vectorRestUrl: process.env.UPSTASH_VECTOR_REST_URL!,
  vectorRestToken: process.env.UPSTASH_VECTOR_REST_TOKEN!
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const emojis = await text2emoji.get(query, 10)
    return NextResponse.json({ emojis })
  } catch (error) {
    console.error('Error fetching emojis:', error)
    return NextResponse.json({ error: 'Failed to fetch emojis' }, { status: 500 })
  }
}

