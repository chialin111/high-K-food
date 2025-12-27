
import React, { useState, useMemo } from 'react';
import { StrategyLevel } from './types';
import { STRATEGIES, ADDITIVES, BIOAVAILABILITY_DATA } from './constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [potassiumLevel, setPotassiumLevel] = useState<number>(4.5);
  const [riskFactorCount, setRiskFactorCount] = useState<number>(0);

  // Determine current strategy based on ASN Guidance Figure 3
  const currentStrategy = useMemo(() => {
    if (potassiumLevel > 5.5) return StrategyLevel.INTENSIVE;
    if (potassiumLevel > 5.0 || riskFactorCount >= 2) return StrategyLevel.ADVANCED;
    return StrategyLevel.BASIC;
  }, [potassiumLevel, riskFactorCount]);

  const riskFactors = [
    "晚期 CKD (Stage 4-5)",
    "服用影響血鉀藥物 (如 ACEi, ARB, MRA)",
    "合併糖尿病或代謝性酸中毒",
    "長期便秘 (腸道排鉀減少)",
    "飲食中鉀來源不明 (常食加工食品)"
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-16 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">腎友控鉀互動指南</h1>
          <p className="text-xl text-blue-100 opacity-90 leading-relaxed">
            依據 ASN 2025 最新文獻與 KDIGO 2024 指南，<br/>為您打造階梯式的精準控鉀策略
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-12 space-y-12">
        
        {/* Risk Assessment Component */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                個人化風險評估
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  當前血鉀濃度 (Potassium Level): <span className="text-blue-600 font-bold">{potassiumLevel.toFixed(1)} mmol/L</span>
                </label>
                <input 
                  type="range" 
                  min="3.0" 
                  max="7.0" 
                  step="0.1" 
                  value={potassiumLevel}
                  onChange={(e) => setPotassiumLevel(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>3.0 (偏低)</span>
                  <span>5.0 (理想上限)</span>
                  <span>7.0 (危險高鉀)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">風險因子勾選 (請勾選符合項目):</label>
                <div className="space-y-2">
                  {riskFactors.map((factor, idx) => (
                    <label key={idx} className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        onChange={(e) => setRiskFactorCount(prev => e.target.checked ? prev + 1 : prev - 1)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-600">{factor}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 bg-blue-50 rounded-xl p-6 border border-blue-100 sticky top-4">
              <div className="text-center">
                <p className="text-sm font-medium text-blue-700 mb-1">評估建議策略等級</p>
                <div className={`text-2xl font-bold py-2 px-4 rounded-full inline-block mt-2 ${
                  currentStrategy === StrategyLevel.BASIC ? 'bg-green-100 text-green-700' :
                  currentStrategy === StrategyLevel.ADVANCED ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                }`}>
                  {STRATEGIES[currentStrategy].title.split('：')[0]}
                </div>
              </div>
              <hr className="my-4 border-blue-200" />
              <p className="text-sm text-blue-800 leading-relaxed">
                {STRATEGIES[currentStrategy].description}
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <button 
                  onClick={() => document.getElementById('strategy-details')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors"
                >
                  查看執行重點
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bioavailability Knowledge Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">控鉀新思維：不僅是「量」，更看「來源」</h2>
            <p className="text-gray-500 mt-2">根據 ASN 指南，不同食物來源的鉀吸收率差異顯著</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BIOAVAILABILITY_DATA} layout="vertical" margin={{ left: 40, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="source" type="category" width={100} tick={{fontSize: 12}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="rate" radius={[0, 10, 10, 0]} label={{ position: 'right', formatter: (v: number) => `${v}%` }}>
                    {BIOAVAILABILITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {BIOAVAILABILITY_DATA.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-lg border-l-4" style={{ borderColor: item.color }}>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{item.source} 吸收率約 {item.rate}%</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="p-4 bg-green-50 rounded-lg text-sm text-green-800 italic">
                💡 <strong>專家提醒：</strong>天然蔬果雖然含鉀，但其吸收率低且富含膳食纖維（KDIGO 指南強調），有助於腸道排鉀，除非血鉀嚴重超標，否則不應過度限制。
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Details Tabs */}
        <section id="strategy-details" className="space-y-6">
          <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
            {(Object.keys(STRATEGIES) as StrategyLevel[]).map(level => (
              <button
                key={level}
                onClick={() => setPotassiumLevel(level === StrategyLevel.BASIC ? 4.5 : level === StrategyLevel.ADVANCED ? 5.2 : 6.0)}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  currentStrategy === level 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {STRATEGIES[level].title.split('：')[0]}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">{STRATEGIES[currentStrategy].title}</h3>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-bold text-blue-900 text-sm uppercase tracking-wider mb-1">醫學依據 (Rationale)</h4>
                  <p className="text-blue-800">{STRATEGIES[currentStrategy].rationale}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {STRATEGIES[currentStrategy].tips.map((tip, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 items-start">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/3 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">必須警惕的隱形鉀添加劑</h4>
                <div className="space-y-4">
                  {ADDITIVES.map((add, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-blue-700">{add.name}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded font-bold uppercase">{add.impact} Impact</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1 leading-tight"><strong className="text-gray-700">功能:</strong> {add.function}</p>
                      <p className="text-xs text-gray-500 leading-tight"><strong className="text-gray-700">常見於:</strong> {add.products}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-xs text-yellow-800 leading-relaxed">
                  ⚠️ <strong>標籤閱讀法：</strong>加工食品標籤若出現「磷酸」、「檸檬酸」、「乳酸」搭配「鉀」或英文「Potassium」字樣，請務必謹慎。
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Cooking Tips (ASN Supplemental Figure 1) */}
        <section className="bg-blue-900 rounded-3xl p-10 text-white overflow-hidden relative">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">居家去鉀化技巧：汆燙大法</h2>
              <p className="text-blue-100 opacity-90 leading-relaxed">
                鉀具有極強的水溶性。正確的處理方式可以有效降低天然食材 30%-50% 的鉀含量。
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center font-bold">1</div>
                  <span><strong>切小塊：</strong>增加接觸面積，讓鉀更易溶出。</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center font-bold">2</div>
                  <span><strong>先浸泡：</strong>使用清水浸泡 30-60 分鐘。</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center font-bold">3</div>
                  <span><strong>大火沸煮：</strong>沸水中煮 5-10 分鐘，並丟棄水。</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h4 className="font-bold mb-4 text-xl">注脂肉與醃漬肉警告</h4>
              <p className="text-sm text-blue-50 leading-relaxed mb-6">
                歷史上，廠商常使用食鹽 (NaCl) 保水。為推行「低鈉」策略，現多改用「磷酸鉀」。這種添加鉀的吸收率極高，且常見於：
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['冷凍禽肉', '平價牛排', '漢堡肉餅', '早餐火腿'].map((item, i) => (
                  <div key={i} className="bg-white/20 rounded-lg py-2 px-4 text-center text-sm font-medium">{item}</div>
                ))}
              </div>
              <p className="mt-6 text-xs text-blue-200 italic">
                *ASN 指南明確指出：注脂肉類的鉀含量可能比天然肉類高出數倍。
              </p>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </section>
      </main>

      <footer className="mt-20 border-t border-gray-200 py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <p className="text-gray-400 text-sm">
            本工具僅供衛教參考，具體飲食計畫應諮詢您的主治醫師或腎臟專業營養師。
          </p>
          <div className="flex justify-center gap-8 text-xs font-medium text-gray-500 uppercase tracking-widest">
            <span>Reference: ASN 2025 KHG</span>
            <span>Reference: KDIGO 2024</span>
          </div>
          <p className="text-gray-300 text-[10px]">© 2024 腎友控鉀互動指南. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
