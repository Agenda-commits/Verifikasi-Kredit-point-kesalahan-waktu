
import React from 'react';
import { ShieldCheck, User, Calculator, RefreshCcw, Terminal, Landmark, CheckCircle2 } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const VerifikasiReport: React.FC<Props> = ({ data }) => {
  const previousBalance = data.saldoAkunKerja;
  const verifCost = data.moneyIn;
  const commission = verifCost * 0.5;
  const grandTotal = data.moneyTotal;

  const getFontSize = (text: string) => {
    const len = text.length;
    if (len > 800) return 'text-[10px] leading-snug';
    if (len > 500) return 'text-[11px] leading-relaxed';
    if (len > 250) return 'text-[12px] leading-relaxed';
    return 'text-[14px] leading-relaxed'; 
  };

  return (
    <div className="flex flex-col h-full animate-in max-h-full overflow-hidden space-y-3">
      {/* Header Laporan */}
      <div className="border-b-2 border-zinc-900 pb-2 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-[18px] font-black tracking-[0.1em] text-black uppercase leading-none">
            OTORISASI PENCAIRAN & VERIFIKASI AKUN GLOBAL
          </h2>
          <p className="text-[8px] text-zinc-400 tracking-[0.2em] mt-1 uppercase italic font-bold">
            Validasi Transmisi Dana Node-Milano | Status: Sinkronisasi Selesai
          </p>
        </div>
        <div className="px-3 py-1 bg-black text-white rounded text-[8px] font-black tracking-widest flex items-center gap-2 shadow-lg">
            <ShieldCheck size={12} className="text-emerald-500" />
            SECURED BY MILANO-X9
        </div>
      </div>

      {/* Profil Singkat Anggota */}
      <div className="grid grid-cols-12 gap-3 shrink-0">
        <div className="col-span-12 bg-zinc-50 border border-zinc-200 p-4 flex items-center justify-between rounded-sm shadow-sm">
           <div className="flex items-center gap-8">
              <div className="w-10 h-10 rounded-full border-2 border-white shadow bg-black flex items-center justify-center text-[#eab308]">
                 <User size={20} />
              </div>
              <div className="grid grid-cols-3 gap-8">
                 <div>
                    <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">IDENTITAS ANGGOTA</p>
                    <p className="text-sm font-black text-black uppercase">{data.nama}</p>
                 </div>
                 <div>
                    <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">INSTITUSI BANK</p>
                    <p className="text-sm font-black text-black uppercase">{data.bank}</p>
                 </div>
                 <div>
                    <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">REKENING TUJUAN</p>
                    <p className="text-sm font-mono-tech font-bold text-black tracking-wider">{data.noRekening}</p>
                 </div>
              </div>
           </div>
           <div className="text-right pl-6">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded text-[8px] font-black tracking-widest border border-emerald-200 uppercase">
                READY TO PAY
              </span>
           </div>
        </div>
      </div>

      {/* Konten Utama: Panel Bank & Kalkulasi */}
      <div className="grid grid-cols-12 gap-3 flex-1 min-h-0 overflow-hidden">
        {/* Panel Bank Permata (Logo diperbesar & Tata letak disempurnakan) */}
        <div className="col-span-3 flex flex-col h-full overflow-hidden">
           <div className="bg-white border border-zinc-100 p-8 flex flex-col items-center justify-center text-center shadow-sm relative flex-1 rounded-sm overflow-hidden min-h-0">
              <div className="w-full flex-1 flex flex-col items-center justify-center space-y-8">
                {/* Logo Area - Diperbesar */}
                <div className="w-full h-[140px] flex items-center justify-center relative z-10">
                   <img 
                     src="https://logowik.com/content/uploads/images/permata-bank-new-20245093.logowik.com.webp" 
                     alt="Permata Bank"
                     className="max-w-[95%] max-h-full object-contain drop-shadow-sm"
                   />
                </div>
                
                {/* Text Content Area - Diposisikan Presisi di Tengah */}
                <div className="space-y-2 relative z-10 w-full flex flex-col items-center justify-center">
                  <div className="w-12 h-[2px] bg-zinc-100 mb-4"></div>
                  <p className="text-[10px] font-black text-zinc-400 tracking-[0.5em] uppercase leading-none">OFFICIAL PARTNER</p>
                  <p className="text-[28px] font-black text-black tracking-tighter uppercase leading-none py-1">PERMATA BANK</p>
                  <div className="flex items-center gap-2 text-blue-600 mt-4 leading-none bg-blue-50/80 px-4 py-2 rounded-full border border-blue-100/50 shadow-sm">
                      <Landmark size={14} />
                      <p className="text-[9px] font-black tracking-[0.15em] uppercase italic">AUTHORIZED SYSTEM</p>
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* Rincian Akumulasi Dana */}
        <div className="col-span-9 bg-black text-white p-6 relative overflow-hidden flex flex-col border-r-[8px] border-[#eab308] shadow-2xl rounded-sm">
           <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-2.5 text-[#eab308] border-b border-zinc-800 pb-3 mb-5 shrink-0">
                 <Calculator size={16} />
                 <p className="text-[10px] font-black tracking-[0.3em] uppercase italic">AKUMULASI RINCIAN DANA PENCAIRAN</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4 shrink-0">
                 <div className="border border-zinc-800 p-4 rounded-sm bg-zinc-900/40 flex flex-col justify-center">
                    <p className="text-[7px] font-bold text-zinc-500 uppercase mb-1.5 tracking-widest">DANA TERPROSES SEBELUMNYA</p>
                    <p className="text-2xl font-black text-white tracking-tight italic">RP {formatClean(previousBalance)}</p>
                 </div>
                 <div className="border border-zinc-800 p-4 rounded-sm bg-zinc-900/40 flex flex-col justify-center">
                    <p className="text-[7px] font-bold text-zinc-500 uppercase mb-1.5 tracking-widest">BIAYA VERIFIKASI AKTIF</p>
                    <p className="text-2xl font-black text-white tracking-tight italic">RP {formatClean(verifCost)}</p>
                 </div>
              </div>

              <div className="mb-4 shrink-0">
                 <div className="flex justify-between items-center p-4 bg-zinc-900/60 border-l-[6px] border-emerald-500 rounded-r-sm shadow-inner">
                    <div className="space-y-0.5">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] italic">KOMISI PENCAIRAN (50%)</p>
                        <p className="text-[8px] text-zinc-400 font-bold uppercase italic leading-tight">Incentive validasi node milano</p>
                    </div>
                    <p className="text-3xl font-black text-emerald-400 tracking-tighter italic">+ RP {formatClean(commission)}</p>
                 </div>
              </div>

              <div className="mt-auto shrink-0 flex justify-between items-end border-t border-zinc-800 pt-4">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-[#eab308] uppercase tracking-[0.3em] italic">TOTAL AKUMULASI PENCAIRAN AKHIR</p>
                    <p className="text-[64px] font-black text-[#22c55e] tracking-tighter leading-none select-none uppercase italic drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                       RP {formatClean(grandTotal)}
                    </p>
                 </div>
                 <div className="flex flex-col items-end gap-3 mb-2">
                    <div className="flex items-center gap-2 border border-emerald-900/80 bg-emerald-950/30 px-4 py-1.5 rounded-sm">
                       <CheckCircle2 size={12} className="text-emerald-500" />
                       <span className="text-[8px] font-black tracking-[0.3em] text-emerald-500 uppercase">SYSTEM_READY</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Kesimpulan Analisa Teknis (Kotak Kuning) */}
      <div className="bg-[#fffbeb] border border-[#fde047] px-6 py-4 shadow-sm relative border-l-[10px] border-[#fbbf24] flex items-center gap-6 shrink-0 h-[130px] rounded-r-lg overflow-hidden">
        <div className="shrink-0 bg-white/50 p-2 rounded-full border border-amber-200">
          <RefreshCcw size={32} className="animate-spin-slow text-[#b45309]" />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden justify-center h-full">
          <div className="flex items-center gap-2 mb-2 shrink-0">
            <Terminal size={12} className="text-[#b45309]" />
            <h3 className="text-[11px] font-black tracking-[0.2em] text-[#92400e] uppercase italic">KESIMPULAN ANALISA TEKNIS</h3>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-4 flex-1">
            <p className={`font-roboto-medium text-[#78350f] font-black text-justify whitespace-pre-wrap leading-relaxed ${getFontSize(data.keteranganVerif)}`}>
              {data.keteranganVerif}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifikasiReport;
