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
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {hexagram.description}
      </p>
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