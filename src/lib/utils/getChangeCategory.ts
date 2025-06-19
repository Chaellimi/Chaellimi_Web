export const ChangeKOR = (item: string) => {
  if (item === 'Health') return '건강';
  if (item === 'Productivity') return '생산성';
  if (item === 'Creativity') return '창의성';
  if (item === 'Learning') return '학습';
};

export const ChangeENG = (item: string) => {
  if (item === '건강') return 'Health';
  if (item === '생산성') return 'Productivity';
  if (item === '창의성') return 'Creativity';
  if (item === '학습') return 'Learning';
};
