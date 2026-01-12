
import React from 'react';
import { ShieldCheck, User, RefreshCcw, Terminal, BookOpen } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const VerifikasiReport: React.FC<Props> = ({ data }) => {
  const previousBalance = data.saldoAkunKerja;
  const verifCost = data.moneyIn;
  const commission = verifCost * 0.5;
  const grandTotal = previousBalance + verifCost + commission;

  // Penyesuaian font otomatis untuk teks narasi yang panjang agar tidak meluap
  const getNarasiFontSize = (text: string) => {
    const len = text.length;
    if (len > 500) return 'text-[10px]';
    if (len > 300) return 'text-[11px]';
    return 'text-[12.5px]'; 
  };

  return (
    <div className="flex flex-col h-full animate-in max-h-full overflow-hidden space-y-2">
      {/* HEADER SECTION */}
      <div className="border-b-[2px] border-zinc-900 pb-1.5 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-[18px] font-black tracking-tight text-black uppercase leading-none">
            OTORISASI PENCAIRAN & VERIFIKASI AKUN GLOBAL
          </h2>
          <p className="text-[8.5px] text-zinc-400 tracking-[0.25em] mt-1 uppercase italic font-bold">
            INTERNAL SECURITY AUDIT SYSTEM - NODE-MILANO-X9
          </p>
        </div>
        <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-black text-white rounded-[3px] text-[8px] font-black tracking-widest flex items-center gap-1.5 shadow-md border border-zinc-800">
                <ShieldCheck size={11} className="text-emerald-500" />
                SECURED SYSTEM V4.0
            </div>
        </div>
      </div>

      {/* USER INFO STRIP - Scaled Down */}
      <div className="shrink-0">
        <div className="bg-white border border-zinc-200 p-2.5 flex items-center justify-between rounded-sm shadow-sm relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
           <div className="flex items-center gap-6 pl-2">
              <div className="w-9 h-9 rounded-full border border-zinc-200 shadow-sm bg-zinc-50 flex items-center justify-center text-black">
                 <User size={18} />
              </div>
              <div className="grid grid-cols-3 gap-8">
                 <div>
                    <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">NAMA LENGKAP ANGGOTA</p>
                    <p className="text-[12px] font-black text-black uppercase tracking-tight">{data.nama}</p>
                 </div>
                 <div>
                    <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">INSTITUSI PERBANKAN</p>
                    <p className="text-[12px] font-black text-black uppercase tracking-tight">{data.bank}</p>
                 </div>
                 <div>
                    <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">NOMOR REKENING TUJUAN</p>
                    <p className="text-[12px] font-mono-tech font-bold text-black tracking-wider">{data.noRekening}</p>
                 </div>
              </div>
           </div>
           <div className="pr-4">
              <span className="bg-[#10b981] text-white px-3 py-1 rounded-sm text-[8px] font-black tracking-[0.15em] border border-[#059669] shadow-sm uppercase italic">
                READY TO PAY
              </span>
           </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
        {/* LEFT PANEL: BANK LOGO - Scaled Down */}
        <div className="col-span-3 h-full">
           <div className="bg-white border border-zinc-200 h-full flex flex-col items-center justify-center p-6 text-center shadow-sm rounded-sm relative overflow-hidden">
              <div className="w-full flex flex-col items-center space-y-6">
                <img 
                  src="https://logowik.com/content/uploads/images/permata-bank-new-20245093.logowik.com.webp" 
                  alt="Permata Bank"
                  className="w-[70%] object-contain grayscale"
                />
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-zinc-300 tracking-[0.4em] uppercase leading-none">OFFICIAL PARTNER</p>
                  <p className="text-[20px] font-black text-black tracking-tighter uppercase italic leading-none">PERMATA BANK</p>
                  <div className="w-10 h-1 bg-black mx-auto mt-2"></div>
                </div>
              </div>
           </div>
        </div>

        {/* RIGHT PANEL: BLACK BOX (REDUCED TEXT SIZES) */}
        <div className="col-span-9 bg-[#080808] text-white p-5 relative flex flex-col border-r-[8px] border-[#eab308] shadow-2xl rounded-sm">
           <div className="relative z-10 flex flex-col h-full">
              {/* Box Title */}
              <div className="flex items-center gap-2 text-[#eab308] border-b border-zinc-800/80 pb-3 mb-4">
                 <BookOpen size={14} className="fill-[#eab308]/20" />
                 <p className="text-[11px] font-black tracking-[0.35em] uppercase italic">AKUMULASI RINCIAN DANA PENCAIRAN</p>
              </div>
              
              {/* Row 1: Split Details - Smaller */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                 <div className="border border-zinc-800/60 p-4 rounded-sm bg-[#0e0e0e] flex flex-col justify-center min-h-[90px]">
                    <p className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-[0.15em] mb-2">DANA TERPROSES SEBELUMNYA</p>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[14px] font-black text-zinc-600 italic">RP</span>
                        <p className="text-[34px] font-black text-white tracking-tighter italic leading-none uppercase">
                           {formatClean(previousBalance)}
                        </p>
                    </div>
                 </div>
                 <div className="border border-zinc-800/60 p-4 rounded-sm bg-[#0e0e0e] flex flex-col justify-center min-h-[90px]">
                    <p className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-[0.15em] mb-2">BIAYA VERIFIKASI AKTIF</p>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[14px] font-black text-zinc-600 italic">RP</span>
                        <p className="text-[34px] font-black text-white tracking-tighter italic leading-none uppercase">
                           {formatClean(verifCost)}
                        </p>
                    </div>
                 </div>
              </div>

              {/* Row 2: Commission - Smaller */}
              <div className="mb-4">
                 <div className="flex justify-between items-center p-4 bg-[#0c0c0c] border border-zinc-800/80 border-l-[6px] border-[#10b981] shadow-inner">
                    <div className="space-y-0.5">
                        <p className="text-[14px] font-black text-[#10b981] uppercase tracking-[0.25em] italic leading-none">KOMISI PENCAIRAN (50%)</p>
                        <p className="text-[8px] text-zinc-500 font-bold uppercase italic tracking-[0.15em] mt-0.5">INCENTIVE VALIDASI NODE MILANO</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-[20px] font-black text-[#059669] italic">+ RP</span>
                        <p className="text-[44px] font-black text-[#22c55e] tracking-tighter italic uppercase leading-none">
                          {formatClean(commission)}
                        </p>
                    </div>
                 </div>
              </div>

              {/* Row 3: Grand Total - COMPACTED TO FIT */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-col items-start">
                  <p className="text-[10px] font-black text-[#eab308] uppercase tracking-[0.4em] italic mb-1">TOTAL AKUMULASI PENCAIRAN AKHIR</p>
                  <div className="flex items-baseline gap-4">
                      <span className="text-[28px] font-black text-emerald-800 italic">RP</span>
                      <p className="text-[72px] font-black text-[#22c55e] tracking-tighter leading-none italic uppercase drop-shadow-[0_0_20px_rgba(34,197,94,0.35)]">
                          {formatClean(grandTotal)}
                      </p>
                  </div>
              </div>
           </div>
           
           {/* Visual Pattern Background */}
           <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>
      </div>

      {/* YELLOW BOTTOM BOX: TECHNICAL SUMMARY - COMPACTED */}
      <div className="bg-[#fffbeb] border border-[#fde047] px-6 py-3 shadow-sm relative border-l-[10px] border-[#fbbf24] flex items-center gap-6 shrink-0 h-[110px] rounded-r-sm">
        <div className="shrink-0">
          <div className="w-14 h-14 rounded-full border-2 border-amber-200 bg-white flex items-center justify-center shadow-sm">
             <RefreshCcw size={28} className="animate-spin-slow text-[#b45309]" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden justify-center h-full">
          <div className="flex items-center gap-2 mb-1 shrink-0">
            <Terminal size={12} className="text-[#b45309]" />
            <h3 className="text-[11px] font-black tracking-[0.2em] text-[#92400e] uppercase italic leading-none">KESIMPULAN ANALISA TEKNIS VERIFIKASI</h3>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-4">
            <p className={`font-roboto-medium text-[#78350f] font-bold text-justify leading-snug italic whitespace-pre-wrap ${getNarasiFontSize(data.keteranganVerif)}`}>
              {data.keteranganVerif}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifikasiReport;
