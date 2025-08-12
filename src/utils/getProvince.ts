import provinces from '@/utils/data/provinces.json';

export const getProvince = (value: string): string | undefined => {
  const province = provinces.find((province) => province.value === value);
  return province?.label; // Trả về label nếu tìm thấy, nếu không trả về undefined
};
