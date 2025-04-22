import { GetServerSideProps } from 'next'
import prisma from '@/lib/prisma'
import { Hexagram } from '@/types/hexagram'

type Props = {
  hexagram: Hexagram
}

export default function HexagramDetail({ hexagram }: Props) {
  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{hexagram.id}. {hexagram.name}</h1>
      <p className="mb-4 text-gray-700">{hexagram.brief}</p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">卦辞</h2>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{hexagram.judgment}</p>
      </div>
      {hexagram.lines && (
        <div>
          <h2 className="text-xl font-semibold mb-1">爻辞</h2>
          <ul className="list-decimal list-inside space-y-1 text-gray-800">
            {hexagram.lines.map((line, index) => (
              <li key={index}>第 {index + 1} 爻：{line}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id)
  const hexagram = await prisma.hexagram.findUnique({ where: { id } })

  if (!hexagram) {
    return { notFound: true }
  }

  return {
    props: { hexagram },
  }
}
