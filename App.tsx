
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { SHAPES } from './constants';
import { SoulCodeResult, ShapeType } from './types';
import { getAnalysisResultByCode } from './utils';

// 靈魂能量星圖組件 - 夢幻視覺深色大圖版
const SoulStarChart: React.FC<{ permutation: ShapeType[] }> = ({ permutation }) => {
  const dimensions = [
    { type: ShapeType.Circle, label: '勇氣', icon: '●' },
    { type: ShapeType.Triangle, label: '直覺', icon: '▲' },
    { type: ShapeType.Square, label: '執行力', icon: '■' },
    { type: ShapeType.Spiral, label: '適應力', icon: '◎' },
    { type: ShapeType.Cross, label: '社交力', icon: '✚' }
  ];

  const centerX = 50;
  const centerY = 50;
  const maxRadius = 36;
  const angles = dimensions.map((_, i) => (i * 72 - 90) * (Math.PI / 180));

  const points = dimensions.map((dim, i) => {
    const rankIndex = permutation.indexOf(dim.type);
    const strength = (5 - rankIndex) / 5;
    const r = strength * maxRadius;
    const labelDistance = maxRadius + 10;
    return {
      x: centerX + r * Math.cos(angles[i]),
      y: centerY + r * Math.sin(angles[i]),
      labelX: centerX + labelDistance * Math.cos(angles[i]),
      labelY: centerY + labelDistance * Math.sin(angles[i]),
      label: dim.label,
      icon: dim.icon,
      color: '#ffffff'
    };
  });

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  const sparkles = Array.from({ length: 25 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 0.4 + 0.1,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <div className="mt-16 bg-gradient-to-br from-[#5a5d8f] to-[#8e94f2] rounded-[3.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group">
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-[#f4b0d7]/20 rounded-full blur-2xl opacity-50"></div>

      <div className="text-center mb-8 relative z-10">
        <span className="text-[9px] font-bold text-white/40 tracking-[0.6em] uppercase block mb-3">Internal resonance graph</span>
        <h3 className="text-2xl font-bold text-white tracking-widest font-serif-code">2026 內在能量分佈</h3>
      </div>

      <div className="relative w-full max-w-[380px] mx-auto aspect-square z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {sparkles.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.size} fill="white" opacity={s.opacity}>
              <animate attributeName="opacity" values={`${s.opacity};${s.opacity * 2};${s.opacity}`} dur={`${3 + Math.random() * 4}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((r, i) => (
            <path
              key={i}
              d={angles.map((a, j) => `${j === 0 ? 'M' : 'L'} ${centerX + r * maxRadius * Math.cos(a)} ${centerY + r * maxRadius * Math.sin(a)}`).join(' ') + ' Z'}
              fill="none"
              stroke="white"
              strokeWidth="0.3"
              opacity="0.3"
            />
          ))}
          {angles.map((a, i) => (
            <line key={i} x1={centerX} y1={centerY} x2={centerX + maxRadius * Math.cos(a)} y2={centerY + maxRadius * Math.sin(a)} stroke="white" strokeWidth="0.2" opacity="0.2" />
          ))}
          <defs>
            <radialGradient id="starGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#f4b0d7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8e94f2" stopOpacity="0.3" />
            </radialGradient>
            <filter id="starGlow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <polygon
            points={polygonPath}
            fill="url(#starGradient)"
            stroke="white"
            strokeWidth="0.8"
            filter="url(#starGlow)"
            className="animate-pulse"
            style={{ animationDuration: '5s' }}
          />
          {points.map((p, i) => (
            <g key={i}>
              <text x={p.labelX} y={p.labelY - 2} fontSize="4.5" fontWeight="900" textAnchor="middle" fill="#f4b0d7" className="drop-shadow-md">{p.icon}</text>
              <text x={p.labelX} y={p.labelY + 4} fontSize="5" fontWeight="800" textAnchor="middle" fill="white" className="tracking-tighter drop-shadow-md">{p.label}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-14 text-center relative z-10">
        <div className="flex flex-col items-center gap-5">
          <div className="max-w-[300px] space-y-3">
            <p className="text-white text-[15px] font-bold leading-relaxed tracking-widest uppercase">✦ 靈魂能量映射 ✦</p>
            <p className="text-white/80 text-[14px] leading-relaxed italic font-medium">
              「這份星圖是你靈魂此刻的共振頻率，<br/>看見隱藏在潛意識中的光芒，<br/>突出的端點揭示了你 2026 年核心的天賦與動能。」
            </p>
          </div>
          <div className="pt-8 border-t border-white/10 w-full max-w-[240px]">
            <p className="text-[#f4b0d7] text-[11px] font-bold tracking-[0.4em] uppercase leading-loose">截圖分享 啟動你的 2026 能量場</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisCard: React.FC<{ analysis: SoulCodeResult['analysis'][0] }> = ({ analysis }) => {
  const shapeInfo = SHAPES.find(s => s.type === analysis.shape)!;
  const [mainTitle, subTitle] = analysis.description.split('：');

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-[0_20px_50px_rgba(142,148,242,0.15)] transition-all hover:shadow-[0_25px_60px_rgba(142,148,242,0.2)] group">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8e94f2] to-[#f4b0d7] flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 mt-1">
          {analysis.level}
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-xl font-bold text-[#5a5d8f] tracking-wide">{analysis.title}</h4>
          <p className="text-[14px] sm:text-[13px] text-[#8a8eb5] font-normal leading-relaxed max-w-[280px] md:max-w-md">
            {analysis.subtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-5">
        <div 
          className="w-16 h-16 sm:w-14 sm:h-14 p-3.5 sm:p-3 rounded-2xl transition-all duration-300 flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: `${shapeInfo.color}15`, color: shapeInfo.color }}
        >
          <div className="w-full h-full">{shapeInfo.svg}</div>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[10px] sm:text-[9px] text-[#b0b4d4] font-bold uppercase tracking-widest mb-1">{shapeInfo.icon} {shapeInfo.label}</span>
          <span className="text-xl sm:text-2xl font-bold text-[#5a5d8f] leading-tight break-words">
            <span className="text-[#8e94f2]">{mainTitle}</span>：{subTitle}
          </span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [currentResult, setCurrentResult] = useState<SoulCodeResult | null>(null);
  const [error, setError] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = () => {
    const paddedCode = inputCode.padStart(3, '0');
    const result = getAnalysisResultByCode(paddedCode);
    if (result) {
      setCurrentResult(result);
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError('請輸入有效的代碼 (001-120)');
    }
  };

  const handleReset = () => {
    setCurrentResult(null);
    setInputCode('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveImage = async () => {
    if (!captureRef.current) return;
    setIsCapturing(true);
    
    // 給予一點時間讓 UI 更新（隱藏按鈕）
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(captureRef.current!, {
          useCORS: true,
          scale: 2, // 提高解析度
          backgroundColor: '#f8f9ff',
          scrollX: 0,
          scrollY: -window.scrollY,
          onclone: (clonedDoc) => {
            // 在複製的 DOM 中確保背景依然漂亮
            const body = clonedDoc.body;
            body.style.backgroundImage = 'radial-gradient(at 0% 0%, rgba(142, 148, 242, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(244, 176, 215, 0.15) 0px, transparent 50%)';
          }
        });
        
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `2026-SoulCode-${currentResult?.code}.png`;
        link.click();
      } catch (err) {
        console.error('截圖失敗:', err);
        alert('圖卡生成失敗，請手動截圖分享');
      } finally {
        setIsCapturing(false);
      }
    }, 100);
  };

  if (currentResult) {
    return (
      <div className={`transition-all duration-500 ${isCapturing ? 'is-capturing' : ''}`}>
        {/* 懸浮下載按鈕 */}
        <button 
          onClick={handleSaveImage}
          disabled={isCapturing}
          className="hide-on-capture fixed bottom-8 right-6 z-[100] w-16 h-16 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_10px_30px_rgba(142,148,242,0.3)] flex items-center justify-center group active:scale-95 transition-all"
          title="儲存為圖片"
        >
          {isCapturing ? (
            <div className="w-6 h-6 border-2 border-[#8e94f2] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-7 h-7 text-[#8e94f2] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          <span className="absolute -top-10 right-0 bg-[#5a5d8f] text-white text-[10px] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">儲存圖卡</span>
        </button>

        <div ref={captureRef} className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-700">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <button 
                onClick={handleReset}
                className="hide-on-capture text-[#8e94f2] hover:text-[#f4b0d7] flex items-center gap-2 mb-4 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                返回重新查詢
              </button>
              <span className="text-[12px] font-bold text-[#b0b4d4] tracking-[0.5em] uppercase block mb-1">Soul Identity Card</span>
              <h1 className="text-5xl font-serif-code font-bold text-[#5a5d8f]">CODE: {currentResult.code}</h1>
            </div>
          </header>

          <div className="mb-12 relative overflow-hidden bg-gradient-to-br from-[#5a5d8f] to-[#8e94f2] rounded-[3rem] p-10 md:p-14 text-white shadow-2xl">
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-70 block mb-6 text-[#f4b0d7]">Divine Soul Guidance</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">2026 專屬靈魂祝福</h2>
              <div className="space-y-4">
                <p className="text-xl md:text-2xl leading-relaxed text-white/95 font-medium whitespace-pre-wrap italic">
                  「{currentResult.blessing}」
                </p>
              </div>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-[#f4b0d7]/20 rounded-full blur-2xl"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-4">
            {currentResult.analysis.map((a, i) => (
              <AnalysisCard key={i} analysis={a} />
            ))}
          </div>

          <SoulStarChart permutation={currentResult.permutation} />

          <div className="hide-on-capture relative mt-24 mb-20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8e94f2]/5 to-[#f4b0d7]/5 rounded-[3.5rem] -rotate-1 scale-105 -z-10"></div>
            <div className="bg-white/50 backdrop-blur-md rounded-[3.5rem] p-10 md:p-16 border border-white/80 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
              <span className="text-[12px] font-bold text-[#8e94f2] tracking-[0.4em] uppercase block mb-4">Deep Soul Connection</span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5a5d8f] mb-10 font-serif-code whitespace-nowrap inline-block">
                開啟與內在的深度對話
              </h3>
              <div className="max-w-2xl mx-auto space-y-6 mb-12 text-left sm:text-center">
                <p className="text-lg text-[#5a5d8f]/90 leading-relaxed font-medium">
                  在居筆內在繪畫工作室，我們相信每一個筆觸都是潛意識的低語。透過色彩的溫度與構圖的節奏，我們將陪你一同看見那些隱藏在日常之下的真實。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <a href="https://jubiewu.com/analysis/" target="_blank" rel="noopener noreferrer" className="group px-10 py-4 rounded-full border-2 border-[#8e94f2]/30 text-[#8e94f2] font-bold hover:bg-[#8e94f2]/5 transition-all duration-300">瞭解內在繪畫解讀</a>
                <a href="https://lin.ee/veQopyH" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden px-12 py-5 rounded-full bg-gradient-to-r from-[#8e94f2] via-[#a2a8f5] to-[#f4b0d7] text-white font-bold text-xl shadow-[0_15px_35px_rgba(142,148,242,0.3)] hover:shadow-[0_20px_45px_rgba(142,148,242,0.4)] hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">立即預約一對一解讀</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
              </div>
            </div>
          </div>

          <footer className="text-center pb-12">
             <p className="text-[#b0b4d4] text-sm italic mb-8">「繪畫是最真實的內在映射，筆觸間流淌著你未曾察覺的靈魂風景。」</p>
             <p className="text-[10px] text-[#b0b4d4] tracking-widest uppercase text-center w-full">© 2026 Jubie 居筆內在繪畫解讀工作室</p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-1000">
      <div className="text-center mb-16">
        <span className="text-2xl font-bold text-[#b0b4d4] tracking-[0.8em] uppercase block mb-3">2026</span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5a5d8f] mb-4 tracking-[0.2em]">靈魂圖像代碼</h1>
        <p className="text-[#a5a9d6] text-lg font-light tracking-wide">輸入專屬代碼，啟動你的內在探尋旅程</p>
      </div>
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[3rem] p-10 border border-white shadow-[0_30px_60px_rgba(142,148,242,0.15)] text-center relative overflow-hidden group">
        <span className="text-[10px] font-bold text-[#b0b4d4] tracking-[0.5em] uppercase block mb-8">Enter Your Code</span>
        <input
          type="text"
          maxLength={3}
          placeholder="000"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          className="w-full bg-transparent border-none text-center text-8xl font-serif-code font-bold text-[#5a5d8f] focus:ring-0 placeholder-[#8e94f2]/20 mb-8"
        />
        {error && <p className="text-rose-400 text-sm mb-6 animate-bounce">{error}</p>}
        <button onClick={handleAnalyze} className="w-full py-5 rounded-full bg-gradient-to-r from-[#8e94f2] to-[#f4b0d7] text-white font-bold text-lg shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">查看專屬解析</button>
        <p className="mt-8 text-[11px] text-[#a5a9d6] font-light leading-relaxed">若尚未獲取代碼，請先完成圖像排序測驗<br/>系統將根據你的選擇生成專屬靈魂代碼</p>
      </div>
      <div className="mt-12">
        <p className="text-[10px] text-[#b0b4d4] tracking-widest uppercase text-center">© 2026 Jubie 居筆內在繪畫解讀工作室</p>
      </div>
    </div>
  );
};

export default App;
