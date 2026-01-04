
import React, { useState } from 'react';
import { SHAPES } from './constants';
import { SoulCodeResult } from './types';
import { getAnalysisResultByCode } from './utils';

const AnalysisCard: React.FC<{ analysis: SoulCodeResult['analysis'][0] }> = ({ analysis }) => {
  const shapeInfo = SHAPES.find(s => s.type === analysis.shape)!;
  const [mainTitle, subTitle] = analysis.description.split('：');

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-[0_20px_50px_rgba(142,148,242,0.15)] transition-all hover:shadow-[0_25px_60px_rgba(142,148,242,0.2)] group">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8e94f2] to-[#f4b0d7] flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
          {analysis.level}
        </div>
        <div>
          <h4 className="text-lg font-bold text-[#5a5d8f]">{analysis.title}</h4>
          <p className="text-[11px] text-[#a5a9d6] font-light leading-snug max-w-[280px] md:max-w-md">{analysis.subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-5">
        <div 
          className="w-16 h-16 sm:w-14 sm:h-14 p-3.5 sm:p-3 rounded-2xl transition-all duration-300 flex-shrink-0 flex items-center justify-center"
          style={{ 
            backgroundColor: `${shapeInfo.color}15`, 
            color: shapeInfo.color 
          }}
        >
          <div className="w-full h-full">
            {shapeInfo.svg}
          </div>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[10px] sm:text-[9px] text-[#b0b4d4] font-bold uppercase tracking-widest mb-1">
            {shapeInfo.icon} {shapeInfo.label}
          </span>
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

  if (currentResult) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-700">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <button 
              onClick={handleReset}
              className="text-[#8e94f2] hover:text-[#f4b0d7] flex items-center gap-2 mb-4 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              返回重新查詢
            </button>
            <span className="text-[12px] font-bold text-[#b0b4d4] tracking-[0.5em] uppercase block mb-1">Soul Identity Card</span>
            <h1 className="text-5xl font-serif-code font-bold text-[#5a5d8f]">CODE: {currentResult.code}</h1>
          </div>
        </header>

        {/* 2026 Blessing Section */}
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

        <div className="grid grid-cols-1 gap-8 mb-20">
          {currentResult.analysis.map((a, i) => (
            <AnalysisCard key={i} analysis={a} />
          ))}
        </div>

        {/* 優化後的 CTA Section */}
        <div className="relative mb-20">
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
              <p className="text-[#5a5d8f]/70 leading-relaxed">
                無論是關係的迷惘、壓力的釋放，或是對未來的渴望，當你被「看見」，改變就已然發生。無需任何繪畫基礎和技巧，只要帶著你的心，拿起自由的筆，讓我們一起在畫布上找回力量。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <a 
                href="https://jubiewu.com/analysis/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group px-10 py-4 rounded-full border-2 border-[#8e94f2]/30 text-[#8e94f2] font-bold hover:bg-[#8e94f2]/5 transition-all duration-300"
              >
                <span>瞭解內在繪畫解讀</span>
                <div className="h-0.5 w-0 group-hover:w-full bg-[#8e94f2] transition-all duration-500"></div>
              </a>
              
              <a 
                href="https://lin.ee/veQopyH" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group overflow-hidden px-12 py-5 rounded-full bg-gradient-to-r from-[#8e94f2] via-[#a2a8f5] to-[#f4b0d7] text-white font-bold text-xl shadow-[0_15px_35px_rgba(142,148,242,0.3)] hover:shadow-[0_20px_45px_rgba(142,148,242,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  立即預約一對一解讀
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>
            
            <p className="mt-8 text-[11px] text-[#a5a9d6] font-medium tracking-wider">
              ✦ 每次解讀約 60-90 分鐘 ✦ 實體工作室與線上服務同步進行中 ✦
            </p>
          </div>
        </div>

        <footer className="text-center pb-12">
           <p className="text-[#b0b4d4] text-sm italic mb-8">「繪畫是最真實的內在映射，筆觸間流淌著你未曾察覺的靈魂風景。」</p>
           <p className="text-[10px] text-[#b0b4d4] tracking-widest uppercase text-center w-full">© 2026 Jubie 居筆內在繪畫解讀工作室</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-1000">
      <div className="text-center mb-16">
        <span className="text-2xl font-bold text-[#b0b4d4] tracking-[0.8em] uppercase block mb-3">2026</span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5a5d8f] mb-4 tracking-[0.2em]">
          靈魂圖像代碼
        </h1>
        <p className="text-[#a5a9d6] text-lg font-light tracking-wide">
          輸入專屬代碼，啟動你的內在探尋旅程
        </p>
      </div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[3rem] p-10 border border-white shadow-[0_30px_60px_rgba(142,148,242,0.15)] text-center relative overflow-hidden group">
        <span className="text-[10px] font-bold text-[#b0b4d4] tracking-[0.5em] uppercase block mb-8">
          Enter Your Code
        </span>

        <input
          type="text"
          maxLength={3}
          placeholder="000"
          value={inputCode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setInputCode(val);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          className="w-full bg-transparent border-none text-center text-8xl font-serif-code font-bold text-[#5a5d8f] focus:ring-0 placeholder-[#8e94f2]/20 mb-8"
        />

        {error && <p className="text-rose-400 text-sm mb-6 animate-bounce">{error}</p>}

        <button
          onClick={handleAnalyze}
          className="w-full py-5 rounded-full bg-gradient-to-r from-[#8e94f2] to-[#f4b0d7] text-white font-bold text-lg shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          查看專屬解析
        </button>

        <p className="mt-8 text-[11px] text-[#a5a9d6] font-light leading-relaxed">
          若尚未獲取代碼，請先完成圖像排序測驗<br/>
          系統將根據你的選擇生成專屬靈魂代碼
        </p>
      </div>

      <div className="mt-20 flex gap-4">
        <div className="w-2 h-2 rounded-full bg-[#8e94f2]/40 animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-[#f4b0d7]/40 animate-pulse delay-75" />
        <div className="w-2 h-2 rounded-full bg-[#8e94f2]/40 animate-pulse delay-150" />
      </div>

      <p className="mt-12 text-[10px] text-[#b0b4d4] tracking-widest uppercase">© 2026 Jubie 居筆內在繪畫解讀工作室</p>
    </div>
  );
};

export default App;
