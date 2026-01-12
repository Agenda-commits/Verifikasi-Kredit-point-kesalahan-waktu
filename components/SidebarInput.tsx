
import React from 'react';
import { formatClean } from '../utils';

interface SidebarInputProps {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  fullWidth?: boolean;
}

const SidebarInput: React.FC<SidebarInputProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder,
  type = 'number',
  fullWidth = true
}) => {
  // Jika tipe adalah number, format dengan titik. Jika text, gunakan nilai mentah.
  const displayValue = type === 'number' && typeof value === 'number' 
    ? formatClean(value) 
    : value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    if (type === 'number') {
      // Bersihkan karakter non-angka untuk input numerik
      const numericValue = rawValue.replace(/[^0-9]/g, '');
      onChange(numericValue);
    } else {
      // Kirim teks mentah untuk input teks
      onChange(rawValue);
    }
  };

  return (
    <div className={`${fullWidth ? 'w-full' : 'flex-1'}`}>
      {label && (
        <label className="block text-[7px] uppercase font-bold text-zinc-600 mb-1 tracking-widest">
          {label}
        </label>
      )}
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-[#111] border border-[#222] text-[#ccc] p-2 text-[10px] font-bold italic focus:outline-none focus:border-red-600 transition-colors uppercase placeholder:text-zinc-800 tracking-widest"
      />
    </div>
  );
};

export default SidebarInput;
