
import React from 'react';
import { ShapeType, ShapeInfo, AnalysisLevel } from './types';

export const SHAPES: (ShapeInfo & { svg: React.ReactNode })[] = [
  { 
    type: ShapeType.Circle, label: '圓形', symbol: '●', icon: 'Circle', color: '#fb7185',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>
  },
  { 
    type: ShapeType.Triangle, label: '三角形', symbol: '▲', icon: 'Triangle', color: '#2dd4bf',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3L2 20h20L12 3z" /></svg>
  },
  { 
    type: ShapeType.Square, label: '正方形', symbol: '■', icon: 'Square', color: '#818cf8',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
  },
  { 
    type: ShapeType.Spiral, label: '螺旋形', symbol: '◎', icon: 'Spiral', color: '#fb923c',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-3 0-3-4 0-4 5 0 5 9 0 9-7 0-7-14 0-14 9 0 9 19 0 19" />
      </svg>
    )
  },
  { 
    type: ShapeType.Cross, label: '十字型', symbol: '✚', icon: 'Cross', color: '#38bdf8',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M3 12h18" /></svg>
  },
];

export const BLESSINGS_2026: Record<ShapeType, string> = {
  [ShapeType.Circle]: "2026 年是你在獨立中綻放最耀眼光芒的一年。你的畫布將揭示自由的真正邊界。準備好在色彩中遇見那個最純粹、不需妥協的自己了嗎？",
  [ShapeType.Triangle]: "2026 年，你的遠見將化為現實。筆跡會為你勾勒出尚未命名的道路。當你放下理性的佈局，直覺會在畫紙上告訴你什麼未來的秘密？",
  [ShapeType.Square]: "2026 年為你提供了一個穩固的靈魂避風港。內在畫作藏著你追求極致平靜的藍圖。透過色彩的流動，去發現你內心深處最堅實的安全感吧。",
  [ShapeType.Spiral]: "2026 年對你而言是場華麗的蛻變之旅。畫紙上的每一道線條，都是通往未知的冒險。有什麼樣的嶄新自我，正等著被你親手畫進現實？",
  [ShapeType.Cross]: "2026 年，你的生命故事將與無數心靈產生共振。繪畫將顯化那些連結你與世界的無形絲線。在藝術的鏡子裡，你會看見誰正與你的靈魂同行？",
};

export const AFFIRMATIONS_2026: Record<ShapeType, string> = {
  [ShapeType.Circle]: "你的內在擁有一股無比強大的獨行勇氣，這份自信將成為你在 2026 年最堅實的後盾，指引你在喧囂中守住真我。",
  [ShapeType.Triangle]: "你那敏銳的靈感直覺是上天給予的禮物。請相信你洞悉事物核心的能力，它將指引你在混亂的資訊中找到前進的微光。",
  [ShapeType.Square]: "你的責任感與執行力是穩定世界的重要錨點。在 2026 年，這份穩重將為你建立起不可摧毀的成就感，收穫踏實的平安。",
  [ShapeType.Spiral]: "你卓越的適應與應變能力，讓你在瞬息萬變的局勢中總能優雅穿梭。請放手讓靈感帶路，新機遇正因你的靈活而綻放。",
  [ShapeType.Cross]: "你天生的社交磁力與共情天賦，讓你在 2026 年能成為溫暖他人的存在。這份連結的力量將為你匯聚深厚的善緣與奇蹟。",
};

export const ANALYSIS_LEVELS: AnalysisLevel[] = [
  {
    title: '第一順位：核心生命動能',
    subtitle: '這代表你靈魂深處最迫切的渴望，也是驅動你所有行為的潛意識原動力。',
    descriptions: {
      [ShapeType.Circle]: '獨立自主：追求靈魂的絕對主導權，渴望在獨立中守護自我邊界，不喜歡被外界干涉。',
      [ShapeType.Triangle]: '行事有規劃：具備清晰的遠見與佈局，渴望掌握生命發展的羅盤，凡事講求效率與目標。',
      [ShapeType.Square]: '真實誠懇：崇尚極致的真實與坦白，渴望在穩定的秩序中建立深層的內在安全感。',
      [ShapeType.Spiral]: '冒險改變：靈魂深處跳動著冒險因子，渴望透過不斷打破現狀、尋求變化來換取生命成長。',
      [ShapeType.Cross]: '社交連結：渴望在人群中尋找共振，透過與他人的深度連結與交流，確認自我的存在意義。',
    },
  },
  {
    title: '第二順位：潛藏天賦資源',
    subtitle: '這是你與生俱來的內在優勢，常在你最放鬆或面臨挑戰時不經意流露。',
    descriptions: {
      [ShapeType.Circle]: '自信勇氣：擁有無所畏懼的獨行勇氣，具備強大的自我驅動力，能從孤獨中萃取創造力。',
      [ShapeType.Triangle]: '靈感直覺：具備驚人的預判與洞察天賦，能輕易看見事物背後隱藏的邏輯與未來趨勢。',
      [ShapeType.Square]: '責任心執行力：擁有極高密度的執行意志，是團隊中穩定人心的力量，能在混亂中建立結構。',
      [ShapeType.Spiral]: '適應應變：具備卓越的環境演化能力，思想靈活不設限，總能從變動中精準捕捉新的轉機。',
      [ShapeType.Cross]: '社交協調能力：擁有強大的共情天賦與人際磁力，能輕易化解衝突，是天然的凝聚者。',
    },
  },
  {
    title: '第三順位：當前生命狀態',
    subtitle: '這反映了你現階段如何與世界互動，以及你目前最關注的生活層面。',
    descriptions: {
      [ShapeType.Circle]: '實現獨立自我：正處於重塑邊界的過程，努力在繁雜的關係中切割出屬於自己的自由空間。',
      [ShapeType.Triangle]: '追逐理想目標：處於意志高度集中的攀爬期，目前正為了某個明確的理想或事業全力衝刺。',
      [ShapeType.Square]: '穩定生活秩序：正致力於修復與鞏固生活的基石，追求一種踏實、規律且無憂的平靜。',
      [ShapeType.Spiral]: '改變當下框架：靈魂正處於躁動的蛻變前夕，渴望換個環境或嘗試全新視角，打破陳舊枷鎖。',
      [ShapeType.Cross]: '拓展社交影響：正積極向外投射影響力，尋求更寬廣的人際共感、社會價值與他人認同。',
    },
  },
  {
    title: '第四順位：靈魂修復能源',
    subtitle: '當你感到疲憊或能量枯竭時，這是能讓你重新獲得支持與修復的關鍵路徑。',
    descriptions: {
      [ShapeType.Circle]: '更多獨處空間：徹底的靜謐與個人空間，能讓你的感官得到洗滌，是你能量枯竭時的救贖。',
      [ShapeType.Triangle]: '明確短標成就：設立並達成一個微小的明確目標，能瞬間點燃你的成就感，為靈魂重新充電。',
      [ShapeType.Square]: '內在安全感：規律的生活節奏與可預測的環境，能讓你的神經系統獲得深度的放鬆與安慰。',
      [ShapeType.Spiral]: '尋找新鮮事物：打破常規的新鮮體驗與跨界知識的碰撞，能喚醒你對生命幾乎熄滅的熱情。',
      [ShapeType.Cross]: '團隊合作支持：一場具質感的深度對談或獲得團體的歸屬感，能為你提供持久且溫暖的動力。',
    },
  },
  {
    title: '第五順位：潛意識避風港（逃避區）',
    subtitle: '這是你壓力下最想躲開的事物，也可能是你目前生命中最不敢直視的陰影。',
    descriptions: {
      [ShapeType.Circle]: '依賴他人：恐懼失去掌控權，將任何形式的「依賴」或「束縛」視為威脅，可能因過度獨立而疲累。',
      [ShapeType.Triangle]: '理想主義崩塌：害怕願景僅是空洞的幻想，因此在壓力下可能會刻意無視那些不完美的現實節點。',
      [ShapeType.Square]: '承擔沈重責任：對突如其來的責任感到極大的沈重壓力，擔憂生活節奏被打亂而產生排斥感。',
      [ShapeType.Spiral]: '安於現狀的矛盾：雖然渴望改變，但內心深處其實也恐懼著一旦邁步就無法回頭，在穩定與變動間掙扎。',
      [ShapeType.Cross]: '無意義社交壓力：對低質量的社交感到乾涸，正試圖逃離那些令你透支的人際偽裝與應酬。',
    },
  },
];
