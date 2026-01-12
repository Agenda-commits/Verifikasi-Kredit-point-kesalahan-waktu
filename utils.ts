
export const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('Rp', 'RP');
};

export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat('id-ID').format(amount);
};

/**
 * Memformat angka penuh menjadi string dengan titik pemisah (IDR Style).
 * Contoh: 15000000 -> 15.000.000
 */
export const formatClean = (amount: number): string => {
  if (isNaN(amount)) return '0';
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Mengubah string berformat (misal: 15.000.000) kembali menjadi angka murni.
 */
export const parseNumber = (value: string): number => {
  const cleanValue = value.replace(/[^0-9]/g, '');
  return Number(cleanValue) || 0;
};
