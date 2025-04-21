import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">欢迎来到卜卦网站</h1>
      <p className="mb-6 text-gray-600">探索六十四卦的智慧</p>
      <Link legacyBehavior href="/hexagrams">
        <a className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
          查看六十四卦
        </a>
      </Link>
    </main>
  )
}