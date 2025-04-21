// pages/hexagrams/index.tsx
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Hexagram } from '@/types/hexagram'
import prisma from '@/lib/prisma'

type Props = {
  hexagrams: Hexagram[]
}

export default function HexagramList({ hexagrams }: Props) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">六十四卦</h1>
      <ul className="grid grid-cols-2 gap-4">
        {hexagrams.map((h) => (
          <li key={h.id} className="border p-4 rounded shadow hover:bg-gray-50">
            <Link href={`/hexagrams/${h.id}`}>
              <a className="text-lg font-semibold hover:underline">{h.id}. {h.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const hexagrams = await prisma.hexagram.findMany({ orderBy: { id: 'asc' } })
  return {
    props: { hexagrams },
  }
}
