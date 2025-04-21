// pages/api/hexagrams/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const hexagrams = await prisma.hexagram.findMany({
        orderBy: { id: 'asc' }
      });
      res.status(200).json(hexagrams);
    } catch (error) {
      res.status(500).json({ error: '获取数据失败' });
    }
  } else {
    // 如果有需要，也可以在这里处理 POST 等其他请求方法
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `不支持 ${req.method} 方法` });
  }
}
