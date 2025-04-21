// pages/hexagrams/index.tsx
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import prisma from '../../lib/prisma';       // 引入 Prisma 客户端实例
import { Hexagram } from '../../types/hexagram';

type HexagramListProps = {
  hexagrams: Hexagram[];
};

const HexagramListPage: NextPage<HexagramListProps> = ({ hexagrams }) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">六十四卦列表</h1>
      <ul>
        {hexagrams.map(h => (
          <li key={h.id} className="py-2 border-b">
            <Link href={`/hexagrams/${h.id}`}>
              <a className="text-blue-600 hover:underline">
                {h.id}. {h.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HexagramListProps> = async () => {
  // 从数据库获取所有卦
  const hexagrams = await prisma.hexagram.findMany({
    orderBy: { id: 'asc' }  // 按id排序，确保1~64顺序
  });
  return {
    props: { hexagrams },
    revalidate: 60  // 可选：ISR增量静态再生，60秒后重新生成页面
  };
};

export default HexagramListPage;
