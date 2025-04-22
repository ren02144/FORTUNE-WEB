export interface Hexagram {
  id: number;           // 卦序号（1 ~ 64）
  name: string;         // 卦名，例如 "乾为天"
  brief: string;        // 简要文字，如“天行健，君子以自强不息。”
  description: string;  // 卦象的现代解释
  judgment: string;     // 卦辞原文
  lines: string[];      // 六爻爻辞
}