
import { ShapeType, SoulCodeResult } from './types';
import { SHAPES, ANALYSIS_LEVELS, BLESSINGS_2026, AFFIRMATIONS_2026 } from './constants';

export const getAllPermutations = (): ShapeType[][] => {
  const baseOrder = [ShapeType.Circle, ShapeType.Triangle, ShapeType.Square, ShapeType.Spiral, ShapeType.Cross];
  const results: ShapeType[][] = [];

  const permute = (arr: ShapeType[], memo: ShapeType[] = []) => {
    if (arr.length === 0) {
      results.push(memo);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), memo.concat(next));
      }
    }
  };

  permute(baseOrder);
  return results;
};

export const getPermutationFromCode = (code: string): ShapeType[] | null => {
  const all = getAllPermutations();
  const index = parseInt(code, 10) - 1;
  if (index >= 0 && index < all.length) {
    return all[index];
  }
  return null;
};

/**
 * 核心邏輯：融合第一順位祝福與第二順位肯定語
 */
const getCombinedBlessing = (p1: ShapeType, p2: ShapeType): string => {
  const blessing = BLESSINGS_2026[p1];
  const affirmation = AFFIRMATIONS_2026[p2];
  
  // 以句點切割第一順位祝福
  const sentences = blessing.split('。').filter(s => s.trim() !== '');
  const firstSentence = sentences[0] ? sentences[0] + '。' : '';
  const remainingPart = sentences.slice(1).join('。') + (sentences.length > 1 ? '。' : '');
  
  // 組合：第一句 + 肯定語 + 換行 + 剩餘部分
  return `${firstSentence}${affirmation}\n${remainingPart}`;
};

export const getAnalysisResultByCode = (code: string): SoulCodeResult | null => {
  const permutation = getPermutationFromCode(code);
  if (!permutation) return null;

  const analysis = permutation.map((shape, index) => {
    const levelConfig = ANALYSIS_LEVELS[index];
    return {
      level: index + 1,
      title: levelConfig.title,
      subtitle: levelConfig.subtitle,
      shape: shape,
      description: levelConfig.descriptions[shape],
    };
  });

  const combinedBlessing = getCombinedBlessing(permutation[0], permutation[1]);
  const affirmation = AFFIRMATIONS_2026[permutation[1]];

  return { 
    code, 
    permutation, 
    analysis, 
    blessing: combinedBlessing, // 這裡存入的是融合後的完整版本
    affirmation 
  };
};
