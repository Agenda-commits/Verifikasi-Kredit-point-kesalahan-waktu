
import React from 'react';
import { Award, ShieldCheck, Wallet2, BarChart3, Star, RefreshCcw, User, Landmark, CreditCard, ArrowRight, ShieldAlert, Terminal, Target, Plus, ChevronRight, Calculator } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const SkorKreditReport: React.FC<Props> = ({ data }) => {
  const costPoin = data.moneyIn;
  const bonusKomisi = costPoin * 0.5;
  const neededPoints = Math.max(0, data.targetPoint - data.currentPoint);

  // Ukuran font dinamis yang lebih besar untuk keterbacaan tinggi
  const getFontSize = (text: string) => {
    const len = text.length;
    if (len > 800) return 'text-[11px] leading-snug';
    if (len > 500) return 'text-[13px] leading-relaxed';
    if (len > 250) return 'text-[14px] leading-relaxed';
    return 'text-[16px] leading-relaxed';
  };

  return (
    <div className="flex flex-col h-full animate-in space-y-3 max-h-full overflow-hidden">
      {/* 1. HEADER LAPORAN */}
      <div className="border-b-[1px] border-zinc-200 pb-2 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-[20px] font-black tracking-[0.15em] text-black uppercase font-roboto-medium leading-none">
            LAPORAN PEMULIHAN KREDIT POINT
          </h2>
          <p className="text-[8px] text-zinc-400 tracking-[0.2em] mt-1 uppercase italic font-bold">
            Audit sinkronisasi poin kredibilitas & validasi total penarikan dana.
          </p>
        </div>
        <div className="p-1 border-[1.5px] border-black rounded-md shadow-sm">
          <Star size={16} className="text-black" />
        </div>
      </div>

      {/* 2. TOP SECTION: DATA PENERIMA & REKENING */}
      <div className="grid grid-cols-12 gap-3 shrink-0">
        <div className="col-span-4 bg-black p-4 border-l-[10px] border-[#eab308] relative overflow-hidden shadow-lg flex flex-col justify-center min-h-[140px] rounded-sm">
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                 <BarChart3 size={10} className="text-[#eab308]" />
                 <p className="text-[8px] font-black text-zinc-500 tracking-[0.3em] uppercase italic">KREDIT POINT</p>
              </div>
              <div className="flex items-center gap-3 mb-2">
                 <p className="text-[60px] font-serif-armani italic font-bold text-[#eab308] leading-none tracking-tighter">
                    {data.skorKredit}
                 </p>
                 <div className="flex flex-col">
                    <span className="text-base text-zinc-700 font-black tracking-tight uppercase">POINT</span>
                    <span className="text-[6px] font-black text-zinc-500 uppercase">AKTIF</span>
                 </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-sm">
                 <ShieldAlert size={10} className="text-[#eab308]" />
                 <p className="text-[8px] font-black tracking-[0.3em] text-[#eab308] uppercase">RESTRICTED</p>
              </div>
           </div>
        </div>

        <div className="col-span-4 bg-white border border-zinc-200 p-5 flex flex-col justify-center gap-3 rounded-sm shadow-sm">
           <div className="flex items-center gap-2 text-zinc-300">
              <User size={12} />
              <span className="text-[7px] font-black tracking-[0.4em] uppercase">DATA PENERIMA</span>
           </div>
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5">PEMILIK AKUN</p>
              <p className="text-base font-black text-black uppercase truncate border-b border-zinc-50">{data.nama}</p>
           </div>
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5">BANK PENERIMA</p>
              <p className="text-base font-black text-black uppercase">{data.bank}</p>
           </div>
        </div>

        <div className="col-span-4 bg-white border border-zinc-200 p-5 flex flex-col justify-center gap-3 rounded-sm shadow-sm">
           <div className="flex items-center gap-2 text-zinc-300">
              <CreditCard size={12} />
              <span className="text-[7px] font-black tracking-[0.4em] uppercase">VERIFIKASI REKENING</span>
           </div>
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5">NOMOR REKENING</p>
              <p className="text-base font-mono-tech font-bold text-zinc-800 tracking-wider">
                 {data.noRekening}
              </p>
           </div>
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5">SECURITY PROTOCOL</p>
              <p className="text-[10px] font-mono-tech text-zinc-400 italic uppercase">AES-256-MILANO</p>
           </div>
        </div>
      </div>

      {/* 3. MIDDLE SECTION: FINANCIAL CALCULATION */}
      <div className="grid grid-cols-12 gap-3 flex-1 min-h-0 overflow-hidden">
        
        {/* KIRI: RINCIAN PEMBAYARAN KESELURUHAN */}
        <div className="col-span-5 bg-[#18181b] text-white p-6 border-t-[6px] border-[#eab308] shadow-xl flex flex-col justify-between rounded-sm overflow-hidden">
           <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#eab308] border-b border-zinc-800 pb-2 shrink-0">
                 <Calculator size={14} />
                 <h3 className="text-[11px] font-black tracking-[0.2em] uppercase italic">RINCIAN PEMBAYARAN KESELURUHAN</h3>
              </div>
              
              <div className="space-y-3 px-1">
                 <div className="flex justify-between items-center text-[11px] font-bold text-zinc-400 uppercase">
                    <span>KEKURANGAN POINT ({neededPoints} PT)</span>
                    <span className="text-white font-black text-base">RP {formatClean(costPoin)}</span>
                 </div>

                 <div className="flex justify-between items-center text-[8px] font-bold text-zinc-600 uppercase italic pl-2 border-l border-zinc-800">
                    <span>HARGA PER 1 POINT (RP)</span>
                    <span className="text-zinc-500">RP {formatClean(data.hargaPerPoint)}</span>
                 </div>

                 <div className="flex justify-between items-center text-[11px] font-bold text-emerald-500 uppercase py-1.5 border-y border-zinc-800/40">
                    <span>BONUS KOMISI (50%)</span>
                    <span className="text-emerald-400 font-black text-base">+ RP {formatClean(bonusKomisi)}</span>
                 </div>

                 <div className="flex justify-between items-center text-[11px] font-bold text-zinc-400 uppercase">
                    <span>SALDO AKUN KERJA SAAT INI</span>
                    <span className="text-white font-black text-base">RP {formatClean(data.saldoAkunKerja)}</span>
                 </div>
              </div>
           </div>

           <div className="pt-3 border-t border-dashed border-zinc-700 mt-2 shrink-0">
              <div className="flex flex-col items-end">
                 <span className="text-[8px] font-black tracking-[0.3em] text-[#eab308] uppercase mb-1 italic">TOTAL AKUMULASI DANA AKHIR</span>
                 <p className="text-[44px] font-black text-white leading-none tracking-tighter">
                    RP {formatClean(data.moneyTotal)}
                 </p>
              </div>
           </div>
        </div>

        {/* KANAN: SALDO & TOTAL AKUMULASI */}
        <div className="col-span-7 bg-white border border-zinc-200 p-6 flex flex-col justify-between border-l-[12px] border-zinc-50 rounded-sm shadow-sm overflow-hidden">
           
           <div className="flex justify-between items-start mb-2">
              <div className="space-y-0.5">
                 <p className="text-[10px] font-black text-zinc-400 tracking-[0.3em] uppercase italic">SALDO AKUN KERJA SAAT INI</p>
                 <p className="text-[48px] font-black text-black tracking-tighter leading-none">
                    RP {formatClean(data.saldoAkunKerja)}
                 </p>
              </div>
              <div className="p-2 bg-zinc-50 rounded-full text-zinc-200">
                 <RefreshCcw size={24} className="animate-spin-slow" />
              </div>
           </div>

           <div className="space-y-3">
              <div className="flex items-center justify-between border-y border-zinc-50 py-2">
                 <div className="flex flex-col gap-0.5">
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em]">TARGET AMBANG BATAS POIN</p>
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-4 rounded-full border border-amber-400 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                       </div>
                       <span className="text-lg font-black text-zinc-700 tracking-tight uppercase">
                         {data.targetPoint} POINT REQUIRED
                       </span>
                    </div>
                 </div>
                 
                 <div className="flex flex-col text-right">
                    <span className="text-[7px] font-black text-zinc-400 uppercase mb-0.5">STATUS</span>
                    <span className="text-xl font-black text-emerald-600 tracking-wider uppercase flex items-center gap-1.5">
                      VALIDATED <ShieldCheck size={20} />
                    </span>
                 </div>
              </div>

              <div className="bg-[#f0fdf4] border border-[#10b981]/10 p-5 rounded-sm relative overflow-hidden group shadow-inner">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -mr-12 -mt-12 opacity-30 group-hover:scale-110 transition-transform"></div>
                 <div className="flex items-center gap-2 mb-1.5 relative z-10">
                   <Plus size={12} className="text-emerald-800" />
                   <p className="text-[10px] font-black text-emerald-800 tracking-[0.3em] uppercase italic">
                     TOTAL PENARIKAN SALDO SELURUH (AKUMULASI PENUH)
                   </p>
                 </div>
                 <p className="text-[64px] font-black text-emerald-700 tracking-tighter leading-none relative z-10">
                    {formatClean(data.moneyTotal)}
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* 4. BOTTOM SECTION: PROTOKOL SINKRONISASI KREDIT */}
      <div className="bg-[#fffbeb] border border-[#fde047] px-6 py-4 shadow-sm relative border-l-[12px] border-[#fbbf24] flex items-center gap-6 shrink-0 min-h-[140px] rounded-r-lg">
        <div className="shrink-0">
          <div className="bg-white border border-[#fbbf24] p-3 rounded-full text-[#fbbf24] shadow-sm animate-pulse">
            <ShieldCheck size={40} />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden justify-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-[#b45309] text-white p-1 rounded shadow-sm">
               <Terminal size={12} />
            </div>
            <h3 className="text-[11px] font-black tracking-[0.2em] text-[#92400e] uppercase italic">
               PROTOKOL SINKRONISASI KREDIT
            </h3>
            <div className="h-[1px] flex-1 bg-amber-200"></div>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-2 max-h-[100px]">
            <p className={`font-roboto-medium text-[#78350f] tracking-wide font-black text-justify whitespace-pre-wrap ${getFontSize(data.keteranganKredit)}`}>
              {data.keteranganKredit}
            </p>
          </div>
        </div>
        <div className="w-[160px] border-l border-amber-200 pl-6 flex flex-col justify-center gap-2 shrink-0">
           <div className="flex flex-col">
              <span className="text-[7px] font-black text-amber-600 uppercase tracking-widest">TRANSMISSION</span>
              <span className="text-[10px] font-black text-amber-900 uppercase">ENCRYPTED</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[7px] font-black text-amber-600 uppercase tracking-widest">AUDIT TRAIL</span>
              <span className="text-[10px] font-mono-tech font-bold text-amber-900 truncate">SYNC-LOG-X9</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SkorKreditReport;
