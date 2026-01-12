
import React from 'react';
import { Clock, Activity, Wallet2, Landmark, User, CreditCard, ShieldCheck, RefreshCcw, Terminal, AlertTriangle, Database, Lock } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const KesalahanWaktuReport: React.FC<Props> = ({ data }) => {
  const bonusKomisi = data.moneyIn * 0.5;

  const getFontSize = (text: string) => {
    const len = text.length;
    if (len > 800) return 'text-[10px] leading-snug';
    if (len > 500) return 'text-[11px] leading-relaxed';
    return 'text-[13px] leading-relaxed';
  };

  return (
    <div className="flex flex-col h-full animate-in space-y-3 max-h-full overflow-hidden">
      <div className="border-b-[1px] border-zinc-200 pb-2 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-[18px] font-black tracking-[0.1em] text-black uppercase leading-tight">
            LAPORAN AKUN BISNIS MENGIKUTI SINKRONISASI WAKTU
          </h2>
          <p className="text-[8px] text-zinc-400 tracking-[0.2em] uppercase italic font-bold">
            Data validasi sistem sinkronisasi node milano v4.0.52
          </p>
        </div>
        <div className="p-1 border-[1.5px] border-black rounded-md">
          <Clock size={18} className="text-black" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 shrink-0">
        <div className="col-span-4 bg-white border border-zinc-200 shadow-sm p-4 relative overflow-hidden flex flex-col justify-center min-h-[160px] rounded-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-red-600">
              <Activity size={12} />
              <span className="text-[8px] font-black tracking-[0.3em] uppercase italic">Batas waktu penanganan</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-[64px] font-black text-black tracking-tighter leading-none italic">
              {data.deviasiWaktu.split(' ')[0]}
            </h1>
            <div className="flex flex-col items-start gap-1">
              <span className="text-lg font-black text-black uppercase leading-none">{data.deviasiWaktu.split(' ')[1] || 'MENIT'}</span>
              <span className="bg-[#e11d48] text-white px-2 py-0.5 text-[7px] font-black uppercase rounded-sm italic shadow-sm">
                {data.bufferStatus.split(' ')[0] || 'KRITIS'}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-white border border-zinc-200 p-4 flex flex-col justify-center gap-2 rounded-sm shadow-sm">
           <div className="flex items-center gap-2 text-zinc-400 mb-1">
              <User size={10} />
              <span className="text-[7px] font-black tracking-[0.2em] uppercase">PROFIL AKUN</span>
           </div>
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase">PEMILIK REKENING</p>
              <p className="text-sm font-black text-black uppercase truncate border-b border-zinc-50">{data.nama}</p>
           </div>
           <div className="grid grid-cols-2 gap-2">
              <div>
                 <p className="text-[7px] font-bold text-zinc-400 uppercase">BANK</p>
                 <p className="text-[11px] font-black text-black uppercase">{data.bank}</p>
              </div>
              <div>
                 <p className="text-[7px] font-bold text-zinc-400 uppercase">REKENING</p>
                 <p className="text-[11px] font-mono-tech font-bold text-zinc-800">{data.noRekening}</p>
              </div>
           </div>
        </div>

        <div className="col-span-4 bg-zinc-50 border border-zinc-200 p-4 flex flex-col justify-center gap-1 rounded-sm shadow-sm">
            <div className="flex justify-between items-center pb-1 border-b border-zinc-200">
               <p className="text-[7px] text-zinc-500 font-bold uppercase">SALDO KERJA</p>
               <p className="text-sm font-black text-black italic">RP {formatClean(data.saldoAkunKerja)}</p>
            </div>
            <div className="flex justify-between items-center pb-1 border-b border-zinc-200">
               <p className="text-[7px] text-zinc-500 font-bold uppercase">PEMULIHAN</p>
               <p className="text-sm font-black text-black italic">RP {formatClean(data.moneyIn)}</p>
            </div>
            <div className="flex justify-between items-center py-1">
               <p className="text-[7px] text-amber-700 font-black uppercase italic">KOMISI (50%)</p>
               <p className="text-sm font-black text-amber-600 italic">+ RP {formatClean(bonusKomisi)}</p>
            </div>
            <div className="pt-2 mt-1 border-t border-dashed border-zinc-300">
               <p className="text-[8px] text-emerald-800 font-black uppercase text-center mb-1 italic">TOTAL PENARIKAN AKHIR</p>
               <p className="text-[32px] font-black tracking-tighter text-emerald-700 leading-none text-center italic uppercase">
                 RP {formatClean(data.moneyTotal)}
               </p>
            </div>
        </div>
      </div>

      <div className="bg-[#fffbeb] border border-[#fde047] px-8 py-4 shadow relative border-l-[12px] border-[#fbbf24] flex items-stretch gap-8 flex-1 overflow-hidden min-h-0 rounded-r-lg">
        <div className="flex-shrink-0 flex flex-col justify-center">
            <AlertTriangle size={40} className="text-[#fbbf24] animate-pulse" />
        </div>
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <div className="flex items-center gap-2 mb-2 shrink-0">
             <Terminal size={12} className="text-[#b45309]" />
             <h3 className="text-[11px] font-black tracking-[0.2em] text-[#92400e] uppercase italic">KETERANGAN ANALISA TEKNIS SINKRONISASI</h3>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-4 flex-1">
            <p className={`font-roboto-medium text-[#78350f] font-black text-justify whitespace-pre-wrap ${getFontSize(data.keteranganWaktu)}`}>
              {data.keteranganWaktu}
            </p>
          </div>
        </div>
        <div className="w-[180px] shrink-0 border-l border-amber-200/50 pl-6 flex flex-col justify-center gap-3">
           <div className="flex flex-col">
              <span className="text-[7px] font-black text-amber-600 uppercase italic">SYNC STATUS</span>
              <span className="text-[10px] font-black text-amber-900 uppercase">IN-PROGRESS</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[7px] font-black text-amber-600 uppercase italic">ACCESS MODE</span>
              <span className="text-[10px] font-black text-zinc-800 uppercase italic">RESTRICTED</span>
           </div>
        </div>
      </div>

      <div className="bg-black text-white px-5 py-3 flex items-center justify-between rounded-sm shrink-0">
         <div className="flex items-center gap-3">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase">AUDIT TRAIL LOG: #SEC-NODE-X9 / TLS 1.3 ENCRYPTED</span>
         </div>
         <span className="text-[8px] font-mono-tech text-zinc-500 italic">VX-992-AUTH-MILANO</span>
      </div>
    </div>
  );
};

export default KesalahanWaktuReport;
