
export enum ShapeType {
  Circle = 'Circle',
  Triangle = 'Triangle',
  Square = 'Square',
  Spiral = 'Spiral',
  Cross = 'Cross'
}

export interface ShapeInfo {
  type: ShapeType;
  label: string;
  icon: string;
  symbol: string;
  color: string;
}

export interface AnalysisLevel {
  title: string;
  subtitle: string;
  descriptions: Record<ShapeType, string>;
}

export interface SoulCodeResult {
  code: string;
  permutation: ShapeType[];
  blessing: string;
  affirmation: string;
  analysis: {
    level: number;
    title: string;
    subtitle: string;
    shape: ShapeType;
    description: string;
  }[];
}
