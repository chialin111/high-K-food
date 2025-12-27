
import { StrategyLevel, FoodAdditive, DietaryStrategy } from './types';

export const STRATEGIES: Record<StrategyLevel, DietaryStrategy> = {
  [StrategyLevel.BASIC]: {
    title: '基礎策略：建立健康飲食型態',
    description: '專注於減少加工食品攝取與份量控制，適合大部分腎友。',
    rationale: '減少高添加鉀食品暴露，並透過植物性纖維緩解血鉀上升速度。',
    tips: [
      '包含至少三類食物（蔬菜、水果、全穀、蛋白質）的平衡餐。',
      '盡量親自烹飪，減少外食與便利食品。',
      '以白水、綠茶或花草茶代替含添加劑的果汁與氣泡飲。',
      '嚴格遵守醫生建議的食物份量。'
    ]
  },
  [StrategyLevel.ADVANCED]: {
    title: '進階策略：精確篩選與處理',
    description: '涉及閱讀食品標籤與運用烹飪技術減少食物中的鉀。',
    rationale: '直接限制高鉀來源，並利用鉀的水溶性進行去鉀化處理。',
    tips: [
      '絕對避免使用「低鈉鹽」（通常含有氯化鉀 KCl）。',
      '檢查成分清單，避開含有「Potassium」或「鉀」字眼的添加劑。',
      '蔬菜與肉類先切片、浸泡並汆燙（5-10分鐘）後再烹調，且不喝湯。',
      '避開「注脂肉」或預先醃漬的肉品（常含磷酸鉀）。'
    ]
  },
  [StrategyLevel.INTENSIVE]: {
    title: '強化策略：個人化深度管理',
    description: '針對高風險或已出現高鉀血症的患者，進行嚴格的飲食監控。',
    rationale: '針對高風險添加劑進行精確規避，並由營養師進行深度飲食分析。',
    tips: [
      '詳細記錄三至五天的飲食日記供醫療團隊分析。',
      '直接規避含有氯化鉀、磷酸鉀、檸檬酸鉀、乳酸鉀的高風險加工食品。',
      '由腎臟科專業營養師進行個人化代換指導。',
      '定期追蹤血鉀濃度與用藥（如 RAS 阻斷劑、RAASi）的交互影響。'
    ]
  }
};

export const ADDITIVES: FoodAdditive[] = [
  { name: '氯化鉀 (Potassium chloride)', function: '代鹽、風味增強', products: '低鈉食品、湯品、麥片、零食條', impact: 'High' },
  { name: '磷酸鉀 (Potassium phosphate)', function: '乳化劑、pH 控制', products: '抹醬、加工起司、加工肉類、冷凍魚類', impact: 'High' },
  { name: '檸檬酸鉀 (Potassium citrate)', function: '乳化劑、營養補充', products: '汽水、果汁、運動飲料、膠囊補充品', impact: 'Likely High' },
  { name: '乳酸鉀 (Potassium lactate)', function: '風味增強、保存', products: '加工肉類、禽肉製品、即食餐', impact: 'Likely High' }
];

export const BIOAVAILABILITY_DATA = [
  { source: '加工食品添加劑', rate: 90, color: '#ef4444', desc: '幾乎完全吸收，對血鉀影響最劇烈' },
  { source: '動物性天然來源', rate: 70, color: '#f97316', desc: '吸收率中等，且缺乏纖維緩衝' },
  { source: '植物性天然來源', rate: 50, color: '#22c55e', desc: '吸收率最低，且纖維有助排鉀' }
];
