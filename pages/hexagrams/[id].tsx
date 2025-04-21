// pages/hexagrams/[id].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import prisma from '../../lib/prisma';
import { Hexagram } from '../../types/hexagram';

type HexagramPageProps = {
  hexagram: Hexagram;
};

const HexagramPage: NextPage<HexagramPageProps> = ({ hexagram }) => {
  if (!hexagram) {
    return <div>未找到该卦象。</div>;
  }
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{hexagram.id}. {hexagram.name}</h1>
      <p className="text-gray-700 whitespace-pre-line">
        {hexagram.description}
      </p>
      {/* 你可以在这里添加更多卦象相关的信息展示，例如象征意义、详细分析等 */}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // 查询所有卦的id，用于生成路径
  const hexagrams = await prisma.hexagram.findMany({
    select: { id: true }
  });
  const paths = hexagrams.map((h: { id: any; }) => ({
    params: { id: String(h.id) }
  }));
  return {
    paths,
    fallback: false  // 未列出的路径返回404
  };
};

export const getStaticProps: GetStaticProps<HexagramPageProps> = async (context) => {
  const id = Number(context.params?.id);
  const hexagram = await prisma.hexagram.findUnique({
    where: { id: id }
  });
  if (!hexagram) {
    return { notFound: true };
  }
  return {
    props: { hexagram }
  };
};

export default HexagramPage;
