
import React from 'react';
import { Clock, Activity, Wallet2, Landmark, User, CreditCard, ShieldCheck, RefreshCcw, Info, Hash, ShieldAlert, CpuIcon, Database, KeyRound, ServerCrash, ZapOff, TimerOff, ShieldEllipsis, AlertTriangle, Terminal, Cpu, LayoutList, Lock } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const KesalahanWaktuReport: React.FC<Props> = ({ data }) => {
  const bonusKomisi = data.moneyIn * 0.5;

  // Ukuran font ditingkatkan secara signifikan sesuai permintaan
  const getFontSize = (text: string) => {
    const len = text.length;
    if (len > 800) return 'text-[11px] leading-snug';
    if (len > 500) return 'text-[13px] leading-relaxed';
    return 'text-[15px] leading-relaxed';
  };

  return (
    <div className="flex flex-col h-full animate-in space-y-2 max-h-full">
      {/* 1. JUDUL LAPORAN */}
      <div className="border-b-[1px] border-zinc-200 pb-1.5 flex justify-between items-end shrink-0">
        <div className="space-y-0">
          <h2 className="text-[18px] font-black tracking-[0.1em] text-black uppercase font-roboto-medium leading-tight">
            LAPORAN AKUN BISNIS MENGIKUTI SINKRONISASI WAKTU
          </h2>
          <p className="text-[9px] text-zinc-400 tracking-[0.2em] uppercase italic font-bold">
            Data validasi sistem sinkronisasi node milano v4.0.52
          </p>
        </div>
        <div className="p-1 border-[1.5px] border-black rounded-md">
          <Clock size={18} className="text-black" />
        </div>
      </div>

      {/* 2. AREA METRIK UTAMA */}
      <div className="grid grid-cols-12 gap-3 shrink-0">
        <div className="col-span-4 bg-white border border-zinc-200 shadow-sm p-4 relative overflow-hidden flex flex-col justify-center min-h-[180px] rounded-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
          <div className="flex items-center justify-between mb-2 relative z-10">
            <div className="flex items-center gap-2 text-red-600">
              <Activity size={12} />
              <span className="text-[8px] font-black tracking-[0.3em] uppercase">Batas waktu penanganan</span>
            </div>
            <div className="flex items-center gap-1 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded">
               <ZapOff size={9} className="text-red-600" />
               <span className="text-[6px] font-black text-red-600 uppercase">Crash</span>
            </div>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <h1 className="text-[75px] font-black text-black tracking-tighter leading-none">
              {data.deviasiWaktu.split(' ')[0]}
            </h1>
            <div className="flex flex-col items-start gap-1 mt-1">
              <span className="text-xl font-black text-black tracking-tight uppercase leading-none">
                {data.deviasiWaktu.split(' ')[1] || 'MENIT'}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="bg-[#e11d48] text-white px-1.5 py-0.5 text-[7px] font-black tracking-[0.1em] uppercase rounded-sm shadow-md">
                  {data.bufferStatus.split(' ')[0] || 'KRITIS'}
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -right-2 -bottom-4 opacity-[0.03] scale-[1.2]">
            <TimerOff size={100} className="text-red-900" />
          </div>
        </div>

        <div className="col-span-4 bg-white border border-zinc-200 shadow-sm p-0 flex flex-col relative overflow-hidden rounded-sm">
           <div className="bg-zinc-50 border-b border-zinc-100 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-800">
                <div className="p-1 bg-black rounded text-white"><User size={9} /></div>
                <h3 className="text-[8px] font-black tracking-[0.2em] uppercase">PROFIL AKUN</h3>
              </div>
              <span className="text-[7px] font-black text-amber-600 uppercase tracking-widest">PERLU VERIFIKASI</span>
           </div>
           <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-center">
              <div className="space-y-0">
                 <p className="text-[6px] font-bold text-zinc-400 uppercase tracking-widest">PEMILIK REKENING</p>
                 <p className="text-base font-black text-black uppercase tracking-tight border-b border-zinc-50 truncate">{data.nama}</p>
              </div>
              <div className="space-y-0">
                 <p className="text-[6px] font-bold text-zinc-400 uppercase tracking-widest">BANK</p>
                 <div className="flex items-center gap-2 border-b border-zinc-50">
                    <Landmark size={12} className="text-zinc-400" />
                    <p className="text-sm font-black text-black uppercase tracking-tight">{data.bank}</p>
                 </div>
              </div>
              <div className="space-y-0">
                 <p className="text-[6px] font-bold text-zinc-400 uppercase tracking-widest">NOMOR REKENING</p>
                 <div className="flex items-center gap-2">
                    <CreditCard size={12} className="text-zinc-400" />
                    <p className="text-sm font-mono-tech font-bold text-zinc-800 tracking-wider">{data.noRekening}</p>
                 </div>
              </div>
           </div>
           <div className="px-4 py-1.5 bg-emerald-600 text-white flex justify-center items-center gap-2">
              <ShieldCheck size={9} />
              <p className="text-[6px] font-black tracking-[0.1em] uppercase">IDENTITAS TERVALIDASI</p>
           </div>
        </div>

        <div className="col-span-4 bg-white border border-zinc-200 shadow-sm p-0 flex flex-col relative overflow-hidden rounded-sm">
          <div className="bg-zinc-50 border-b border-zinc-100 px-4 py-2 flex items-center gap-2 text-zinc-800">
            <div className="p-1 bg-black rounded text-white"><Wallet2 size={9} /></div>
            <h3 className="text-[8px] font-black tracking-[0.2em] uppercase">rincian pembayaran</h3>
          </div>
          <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-center pb-0.5 border-b border-zinc-50">
               <p className="text-[7px] text-zinc-400 font-bold uppercase">SALDO AKUN</p>
               <p className="text-sm font-black text-black">RP {formatClean(data.saldoAkunKerja)}</p>
            </div>
            <div className="flex justify-between items-center pb-0.5 border-b border-zinc-50">
               <p className="text-[7px] text-zinc-400 font-bold uppercase">PEMULIHAN</p>
               <p className="text-sm font-black text-black">RP {formatClean(data.moneyIn)}</p>
            </div>
            <div className="flex justify-between items-center bg-amber-50 px-1.5 py-1 border-l-2 border-amber-400">
               <p className="text-[6px] text-amber-700 font-black uppercase italic">KOMISI (50%)</p>
               <p className="text-sm font-black text-amber-600">+ RP {formatClean(bonusKomisi)}</p>
            </div>
            <div className="pt-1 mt-0.5 border-t border-dashed border-zinc-200">
               <div className="flex flex-col items-center justify-center p-1.5 bg-emerald-50 border border-emerald-100 rounded-sm">
                  <p className="text-[7px] text-emerald-800 font-black uppercase mb-0.5">TOTAL PENARIKAN</p>
                  <p className="text-[26px] font-black tracking-tighter text-emerald-700 leading-none">
                    RP {formatClean(data.moneyTotal)}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LOG KETERANGAN - MENGGUNAKAN TEKS REVISI BARU */}
      <div className="bg-[#fffbeb] border border-[#fde047] px-8 py-6 shadow-[0_4px_25px_rgba(251,191,36,0.12)] relative border-l-[16px] border-[#fbbf24] flex items-stretch gap-8 flex-1 overflow-hidden min-h-0 rounded-r-lg">
        <div className="flex-shrink-0 flex flex-col justify-center">
          <div className="bg-white border-2 border-[#fbbf24] p-4 rounded-full text-[#b45309] shadow-md flex items-center justify-center animate-pulse">
            <AlertTriangle size={42} fill="#fbbf24" strokeWidth={2.5} className="text-white" />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="bg-[#b45309] text-white p-1 rounded shadow-sm">
                 <Terminal size={14} strokeWidth={2.5} />
              </div>
              <h3 className="text-[12px] font-black tracking-[0.3em] text-[#92400e] uppercase flex items-center gap-3">
                 KETERANGAN ANALISA TEKNIS <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]"></span>
              </h3>
            </div>
            <span className="text-[9px] font-black text-amber-600 italic tracking-widest">TS-SYNC-992-SEC</span>
          </div>
          
          <div className="overflow-y-auto custom-scrollbar pr-4 max-h-[140px]">
            <p className={`font-roboto-medium text-[#78350f] tracking-wide font-black text-justify whitespace-pre-wrap ${getFontSize(data.keteranganWaktu)}`}>
              {data.keteranganWaktu}
            </p>
          </div>
        </div>

        <div className="w-[200px] flex-shrink-0 border-l border-amber-200/50 pl-8 flex flex-col justify-center space-y-4">
           <div className="space-y-1">
              <p className="text-[7px] font-black text-amber-600 uppercase tracking-[0.2em]">SYNC STATUS</p>
              <div className="flex items-center gap-2">
                 <RefreshCcw size={10} className="text-amber-800 animate-spin-slow" />
                 <span className="text-[10px] font-black text-amber-900 uppercase">IN-PROGRESS</span>
              </div>
           </div>
           <div className="space-y-1">
              <p className="text-[7px] font-black text-amber-600 uppercase tracking-[0.2em]">DB INTEGRITY</p>
              <div className="flex items-center gap-2">
                 <Database size={10} className="text-red-700" />
                 <span className="text-[10px] font-black text-red-800 uppercase italic">CRASH-MODE</span>
              </div>
           </div>
           <div className="space-y-1">
              <p className="text-[7px] font-black text-amber-600 uppercase tracking-[0.2em]">ACCESS MODE</p>
              <div className="flex items-center gap-2">
                 <Lock size={10} className="text-zinc-500" />
                 <span className="text-[10px] font-black text-zinc-800 uppercase">RESTRICTED</span>
              </div>
           </div>
        </div>
      </div>

      {/* 4. DETAIL AUDIT */}
      <div className="bg-white border border-zinc-300 shadow-md overflow-hidden flex flex-col rounded-sm shrink-0">
        <div className="flex items-center justify-between bg-black px-5 py-2.5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
             <ShieldCheck size={14} className="text-zinc-400" />
             <h3 className="text-[10px] font-black tracking-[0.3em] text-white uppercase">
               RINCIAN DETAIL AUDIT KEAMANAN (TECHNICAL AUDIT LOG)
             </h3>
          </div>
        </div>
        <div className="p-4 grid grid-cols-4 gap-4 bg-white">
          <div className="space-y-3 border-r border-zinc-100 pr-3">
             <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">DATA SISTEM</span>
                <span className="text-[13px] font-mono-tech font-bold text-black border-b border-zinc-900">#D-SEC-1745</span>
             </div>
          </div>
          <div className="space-y-3 border-r border-zinc-100 pr-3">
             <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">VERIFIKASI</span>
                <span className="text-[13px] font-black text-emerald-700 border-b border-emerald-700">VX-992-AUTH</span>
             </div>
          </div>
          <div className="space-y-3 border-r border-zinc-100 pr-3">
             <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">NODE</span>
                <span className="text-[13px] font-mono-tech font-bold text-blue-800 underline underline-offset-2">SEC-NODE-X9</span>
             </div>
          </div>
          <div className="space-y-3">
             <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">PROTOKOL</span>
                <div className="flex items-center gap-1.5">
                   <span className="text-[11px] font-black text-black">TLS 1.3</span>
                   <span className="text-[8px] font-black text-blue-500 italic">AES-256</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KesalahanWaktuReport;
