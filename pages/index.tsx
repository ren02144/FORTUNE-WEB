// pages/index.tsx
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Hexagram } from '@/types/hexagram'

type Props = {
  hexagrams: Hexagram[]
}

export default function Home({ hexagrams }: Props) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="heading text-4xl font-bold text-center sm:text-left mb-4 sm:mb-0">六十四卦总览</h1>
        <Link href="/cast" className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition">
          掷卦起卦
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hexagrams.map((h) => (
          <li key={h.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition">
            <Link href={`/hexagrams/${h.id}`} className="block">
              <h2 className="text-2xl font-semibold mb-1">{h.id}. {h.name}</h2>
              <p className="text-lg text-gray-700 line-clamp-2">{h.brief}</p>
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