// pages/api/hexagrams/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  if (req.method === 'GET') {
    try {
      const hexagram = await prisma.hexagram.findUnique({
        where: { id: id }
      });
      if (hexagram) {
        res.status(200).json(hexagram);
      } else {
        res.status(404).json({ error: '未找到该卦象' });
      }
    } catch (error) {
      res.status(500).json({ error: '查询失败' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `不支持 ${req.method} 方法` });
  }
}
