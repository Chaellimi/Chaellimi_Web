const CATEGORY_KOR_MAP = {
  Health: '건강',
  Productivity: '생산성',
  Creativity: '창의성',
  Learning: '학습',
} as const;

export const ChangeKOR = (item: string): string => {
  const result = CATEGORY_KOR_MAP[item as keyof typeof CATEGORY_KOR_MAP];
  if (!result) {
    console.warn(`Unknown category: ${item}`);
    return item;
  }
  return result;
};

export const CATEGORY_EN_MAP = {
  건강: 'Health',
  생산성: 'Productivity',
  창의성: 'Creativity',
  학습: 'Learning',
} as const;

export const ChangeENG = (item: string): string => {
  const result = CATEGORY_EN_MAP[item as keyof typeof CATEGORY_EN_MAP];
  if (!result) {
    console.warn(`Unknown category: ${item}`);
    return item;
  }
  return result;
};
