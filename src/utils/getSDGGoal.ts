import sdgGoals from '@/utils/data/sdgGoals.json';

export const getSDGGoal = (value: string): string | undefined => {
  const sdgGoal = sdgGoals.find((sdgGoal) => sdgGoal.value === value);
  return sdgGoal?.label; // Trả về label nếu tìm thấy, nếu không trả về undefined
};
