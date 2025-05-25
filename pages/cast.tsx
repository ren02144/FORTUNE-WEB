// pages/cast.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hexagram } from '@/types/hexagram'

const coinImages = {
  front: '/assets/images/coin/front.png',
  back: '/assets/images/coin/back.png',
}

const lineMeaning = {
    6: '⚋ 老阴（动）',
    7: '⚊ 少阳',
    8: '⚋ 少阴',
    9: '⚊ 老阳（动）',
  }
  
  const CastPage = () => {
    const [lines, setLines] = useState<number[]>([])
    const [coinsList, setCoinsList] = useState<number[][]>([])
    const [hexagram, setHexagram] = useState<Hexagram | null>(null)
    const [changedHexagram, setChangedHexagram] = useState<Hexagram | null>(null)
    const [flip, setFlip] = useState(false)
  
    const handleCast = async () => {
      setFlip(false)
      const newLines: number[] = []
      const newCoins: number[][] = []
      for (let i = 0; i < 6; i++) {
        const coins = Array.from({ length: 3 }, () => (Math.random() < 0.5 ? 2 : 3))
        const value = coins.reduce((a, b) => a + b, 0)
        newLines.push(value)
        newCoins.push(coins)
      }
      setLines(newLines)
      setCoinsList(newCoins)
      setFlip(true)
  
      const getId = (arr: number[], changed = false) => {
        return parseInt(
          arr
            .map((v) => {
              const bit = v % 2 === 1 ? 1 : 0
              if (!changed) return bit
              return v === 6 || v === 9 ? 1 - bit : bit
            })
            .reverse()
            .join(''),
          2
        ) + 1
      }
  
      const originalId = getId(newLines)
      const changedId = getId(newLines, true)
  
      const [original, changed] = await Promise.all([
        fetch(`/api/hexagrams/${originalId}`).then((res) => res.json()),
        fetch(`/api/hexagrams/${changedId}`).then((res) => res.json()),
      ])
      setHexagram(original)
      setChangedHexagram(changed)
    }
  
    const activeMovingLines = lines
      .map((v, i) => (v === 6 || v === 9 ? i : null))
      .filter((x) => x !== null) as number[]
  
    return (
      <main className="min-h-screen bg-cover bg-center px-4 py-6" style={{ backgroundImage: "url('/assets/images/canvas.jpg')" }}>
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">心中默念所求之事，掷硬币起卦</h1>
          <div className="text-center mb-6">
            <button
              onClick={handleCast}
              className="px-8 py-4 text-lg sm:text-xl bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
            >
              掷卦
            </button>
          </div>
  
          <AnimatePresence>
            {lines.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-center text-lg">六爻（从下往上）</p>
                <div className="space-y-4">
                  {lines.map((line, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="flex gap-4" style={{ "display": "flex"}}>
                        {coinsList[i].map((c, j) => {
                          const isHeads = c === 3
                          return (
                            <div key={j} className="coin-container">
                              <div className={`coin ${flip ? 'flip' : ''}`}> {/* 翻转类控制 */}
                                <img
                                  src={isHeads ? coinImages.front : coinImages.back}
                                  alt={isHeads ? '正面' : '反面'}
                                />
                                <img
                                  src={isHeads ? coinImages.back : coinImages.front}
                                  alt={isHeads ? '反面' : '正面'}
                                  className="back"
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="mt-2 text-base">{lineMeaning[line as 6 | 7 | 8 | 9]}</div>
                    </div>
                  ))}
                </div>
  
                {hexagram && (
                  <div className="mt-6 bg-white/90 backdrop-blur rounded shadow p-4">
                    <h2 className="text-xl font-semibold mb-1">本卦：{hexagram.id}. {hexagram.name}</h2>
                    <p className="text-sm text-gray-700 mb-1 italic">{hexagram.brief}</p>
                    <p className="text-sm text-gray-800 mb-2">{hexagram.description}</p>
                    <p className="text-sm font-semibold">卦辞：{hexagram.judgment}</p>
                    {activeMovingLines.length > 0 && (
                      <>
                        <p className="mt-2 text-sm text-gray-600">动爻：</p>
                        <ul className="list-disc list-inside text-sm">
                          {activeMovingLines.map((i) => (
                            <li key={i}>第 {i + 1} 爻：{hexagram.lines?.[i] ?? '（缺失）'}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
  
                {changedHexagram && activeMovingLines.length > 0 && (
                  <div className="mt-4 bg-white/80 backdrop-blur rounded shadow p-4">
                    <h2 className="text-xl font-semibold mb-1">变卦：{changedHexagram.id}. {changedHexagram.name}</h2>
                    <p className="text-sm text-gray-700 italic mb-1">{changedHexagram.brief}</p>
                    <p className="text-sm text-gray-800">{changedHexagram.description}</p>
                    <p className="text-sm font-semibold mt-1">卦辞：{changedHexagram.judgment}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    )
  }
  
  export default CastPage