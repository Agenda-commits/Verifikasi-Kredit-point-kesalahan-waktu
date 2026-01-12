
import React from 'react';
import { ShieldCheck, User, Calculator, RefreshCcw, Terminal, ArrowRight, Wallet2, Landmark, CheckCircle2 } from 'lucide-react';
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

  // Ukuran font adaptif untuk narasi manual agar tetap terbaca jelas
  const getFontSize = (text: string) => {
    const len = text.length;
    if (len > 800) return 'text-[11px] leading-snug';
    if (len > 500) return 'text-[12px] leading-relaxed';
    if (len > 250) return 'text-[14px] leading-relaxed';
    return 'text-[16px] leading-relaxed'; 
  };

  return (
    <div className="flex flex-col h-full animate-in max-h-full overflow-hidden space-y-3">
      {/* 1. HEADER DOKUMEN */}
      <div className="border-b-2 border-zinc-900 pb-2 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-[20px] font-black tracking-[0.1em] text-black uppercase font-roboto-medium leading-none">
            OTORISASI PENCAIRAN & VERIFIKASI AKUN GLOBAL
          </h2>
          <p className="text-[9px] text-zinc-400 tracking-[0.2em] mt-1 uppercase italic font-bold">
            Validasi Transmisi Dana Node-Milano | Status: Sinkronisasi Selesai
          </p>
        </div>
        <div className="flex gap-2">
            <div className="px-3 py-1 bg-black text-white rounded text-[8px] font-black tracking-widest flex items-center gap-2">
                <ShieldCheck size={12} className="text-emerald-500" />
                SECURED BY MILANO-X9
            </div>
        </div>
      </div>

      {/* 2. PROFIL PENERIMA */}
      <div className="grid grid-cols-12 gap-3 shrink-0">
        <div className="col-span-12 bg-zinc-50 border-2 border-black p-4 flex items-center justify-between rounded-sm shadow-md">
           <div className="flex items-center gap-8">
              <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg bg-black flex items-center justify-center text-[#eab308]">
                 <User size={24} />
              </div>
              <div className="grid grid-cols-3 gap-10">
                 <div>
                    <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">IDENTITAS ANGGOTA</p>
                    <p className="text-base font-black text-black uppercase">{data.nama}</p>
                 </div>
                 <div>
                    <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">INSTITUSI BANK</p>
                    <p className="text-base font-black text-black uppercase">{data.bank}</p>
                 </div>
                 <div>
                    <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">REKENING TUJUAN</p>
                    <p className="text-base font-mono-tech font-bold text-black tracking-wider">{data.noRekening}</p>
                 </div>
              </div>
           </div>
           <div className="text-right border-l-2 border-zinc-200 pl-6">
              <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">STATUS AKUN</p>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[8px] font-black tracking-widest border border-emerald-200 uppercase">
                READY TO PAY
              </span>
           </div>
        </div>
      </div>

      {/* 3. RINCIAN PEMBAYARAN & KOMISI */}
      <div className="grid grid-cols-12 gap-3 flex-1 min-h-0 overflow-hidden">
        
        {/* LOGO INSTITUSI */}
        <div className="col-span-3 flex flex-col h-full overflow-hidden">
           <div className="bg-white border-2 border-zinc-100 p-6 flex flex-col items-center justify-center text-center shadow-sm relative flex-1 rounded-sm overflow-hidden min-h-0">
              <div className="w-full h-[100px] flex items-center justify-center mb-4 relative z-10">
                 <img 
                   src="https://logowik.com/content/uploads/images/permata-bank-new-20245093.logowik.com.webp" 
                   alt="Permata Bank"
                   className="max-w-[80%] max-h-full object-contain"
                 />
              </div>
              <div className="space-y-1 relative z-10 w-full pt-3 border-t border-zinc-100 flex flex-col items-center justify-center shrink-0">
                <p className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase leading-none">OFFICIAL PARTNER</p>
                <p className="text-xl font-black text-black tracking-tighter uppercase leading-none mt-1">PERMATA BANK</p>
                <div className="flex items-center gap-1.5 text-blue-600 mt-3 leading-none">
                    < Landmark size={10} />
                    <p className="text-[8px] font-bold tracking-[0.2em] uppercase italic">AUTHORIZED SYSTEM</p>
                </div>
              </div>
           </div>
        </div>

        {/* BOX RINCIAN HITAM (UTAMA) */}
        <div className="col-span-9 bg-black text-white p-6 relative overflow-hidden flex flex-col border-r-[10px] border-[#eab308] shadow-2xl rounded-sm">
           <div className="relative z-10 flex flex-col h-full">
              {/* Header Rincian - Font Dikecilkan & Tracking Dirapatkan */}
              <div className="flex items-center gap-2.5 text-[#eab308] border-b border-zinc-800 pb-2 mb-4 shrink-0">
                 <Calculator size={16} />
                 <p className="text-[12px] font-black tracking-[0.3em] uppercase">AKUMULASI RINCIAN DANA PENCAIRAN</p>
              </div>
              
              {/* Grid Atas: Dana Terproses & Biaya Verifikasi */}
              <div className="grid grid-cols-2 gap-3 mb-3 shrink-0">
                 <div className="border border-zinc-800 p-4 rounded-sm bg-zinc-900/40 shadow-inner flex flex-col justify-center">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.1em] mb-1.5">DANA TERPROSES SEBELUMNYA</p>
                    <p className="text-2xl font-black text-white tracking-tight leading-none uppercase italic">RP {formatClean(previousBalance)}</p>
                 </div>
                 <div className="border border-zinc-800 p-4 rounded-sm bg-zinc-900/40 shadow-inner flex flex-col justify-center">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.1em] mb-1.5">BIAYA VERIFIKASI AKTIF</p>
                    <p className="text-2xl font-black text-white tracking-tight leading-none uppercase italic">RP {formatClean(verifCost)}</p>
                 </div>
              </div>

              {/* Baris Tengah: Komisi */}
              <div className="mb-4 shrink-0">
                 <div className="flex justify-between items-center p-4 bg-zinc-900/60 border-l-[4px] border-emerald-500 rounded-r-sm shadow-xl">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                           <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em] italic leading-none">KOMISI PENCAIRAN (50%)</p>
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        </div>
                        <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest italic leading-tight">
                           Incentive validasi otentikasi node milano
                        </p>
                    </div>
                    <p className="text-3xl font-black text-emerald-400 tracking-tighter leading-none italic">+ RP {formatClean(commission)}</p>
                 </div>
              </div>

              {/* Bagian Bawah: Total Besar - Font Diatur Ulang agar proporsional */}
              <div className="mt-auto shrink-0 flex justify-between items-end border-t border-zinc-800 pt-3">
                 <div className="space-y-1">
                    <p className="text-[12px] font-black text-[#eab308] uppercase tracking-[0.4em] mb-0.5 italic">TOTAL AKUMULASI PENCAIRAN AKHIR</p>
                    <p className="text-[78px] font-black text-[#22c55e] tracking-tighter leading-none select-none drop-shadow-[0_0_20px_rgba(34,197,94,0.25)] uppercase italic">
                       RP {formatClean(grandTotal)}
                    </p>
                 </div>
                 
                 <div className="flex flex-col items-end gap-3 mb-1.5">
                    <div className="flex gap-1.5">
                        {[1,2,3,4].map(i => <div key={i} className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div>)}
                    </div>
                    <div className="flex items-center gap-2 border border-emerald-900/80 bg-emerald-950/30 px-3 py-1 rounded-sm shadow-lg">
                       <CheckCircle2 size={10} className="text-emerald-500" />
                       <span className="text-[8px] font-black tracking-[0.3em] text-emerald-500 uppercase">SYSTEM_STABLE_READY</span>
                    </div>
                 </div>
              </div>
           </div>
           {/* Dekorasi Grid Background */}
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>
      </div>

      {/* 4. NARASI DIAGNOSA MANUAL */}
      <div className="bg-[#fffbeb] border border-[#fde047] px-6 py-3.5 shadow-xl relative border-l-[12px] border-[#fbbf24] flex items-center gap-6 shrink-0 h-[130px] rounded-r-lg">
        <div className="shrink-0">
          <div className="bg-white border-4 border-[#fbbf24] p-3 rounded-full text-[#fbbf24] shadow-lg animate-pulse">
            <RefreshCcw size={32} className="animate-spin-slow text-[#b45309]" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden justify-center h-full">
          <div className="flex items-center gap-2 mb-1.5 shrink-0">
            <div className="bg-[#b45309] text-white p-0.5 rounded shadow-sm">
               <Terminal size={12} strokeWidth={2.5} />
            </div>
            <h3 className="text-[12px] font-black tracking-[0.2em] text-[#92400e] uppercase italic leading-none">
               KESIMPULAN ANALISA TEKNIS PENCAIRAN (MANUAL DIAGNOSIS)
            </h3>
            <div className="h-[1px] flex-1 bg-amber-200"></div>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-4 flex-1">
            <p className={`font-roboto-medium text-[#78350f] tracking-wide font-black text-justify whitespace-pre-wrap leading-snug ${getFontSize(data.keteranganVerif)}`}>
              {data.keteranganVerif}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifikasiReport;
