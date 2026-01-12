
import React from 'react';
import { Clock, Activity, User, ShieldCheck, Terminal, AlertTriangle } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const KesalahanWaktuReport: React.FC<Props> = ({ data }) => {
  const bonusKomisi = data.moneyIn * 0.5;

  return (
    <div className="flex flex-col h-full animate-in space-y-4 max-h-full overflow-hidden">
      {/* Header Laporan */}
      <div className="border-b-[1px] border-zinc-200 pb-2 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-[18px] font-black tracking-[0.05em] text-black uppercase leading-tight">
            LAPORAN AKUN BISNIS MENGIKUTI SINKRONISASI WAKTU
          </h2>
          <p className="text-[8px] text-zinc-400 tracking-[0.2em] uppercase italic font-bold">
            Data validasi sistem sinkronisasi node milano v4.0.52
          </p>
        </div>
        <div className="p-1.5 border-[1.5px] border-black rounded-md">
          <Clock size={16} className="text-black" />
        </div>
      </div>

      {/* Grid Utama: Metrik Atas */}
      <div className="grid grid-cols-12 gap-4 shrink-0">
        <div className="col-span-4 bg-white border border-zinc-200 shadow-sm p-5 flex flex-col justify-center min-h-[130px] rounded-sm">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <Activity size={12} />
            <span className="text-[8px] font-black tracking-[0.3em] uppercase italic">DEVIASI SINKRONISASI</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-[52px] font-black text-black tracking-tighter leading-none italic">
              {data.deviasiWaktu.split(' ')[0]}
            </h1>
            <div className="flex flex-col items-start">
              <span className="text-sm font-black text-black uppercase leading-none">{data.deviasiWaktu.split(' ')[1] || 'MENIT'}</span>
              <span className="mt-1 bg-[#e11d48] text-white px-2 py-0.5 text-[7px] font-black uppercase rounded-sm italic">
                {data.bufferStatus.split(' ')[0] || 'KRITIS'}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-white border border-zinc-200 p-5 flex flex-col justify-center gap-2 rounded-sm shadow-sm">
           <div className="flex items-center gap-2 text-zinc-400 mb-1">
              <User size={10} />
              <span className="text-[7px] font-black tracking-[0.2em] uppercase">VERIFIKASI IDENTITAS</span>
           </div>
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase">NAMA PEMILIK</p>
              <p className="text-[13px] font-black text-black uppercase truncate border-b border-zinc-50">{data.nama}</p>
           </div>
           <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                 <p className="text-[7px] font-bold text-zinc-400 uppercase">INSTITUSI</p>
                 <p className="text-[10px] font-black text-black uppercase truncate">{data.bank}</p>
              </div>
              <div>
                 <p className="text-[7px] font-bold text-zinc-400 uppercase">REKENING</p>
                 <p className="text-[10px] font-mono-tech font-bold text-zinc-800">{data.noRekening}</p>
              </div>
           </div>
        </div>

        <div className="col-span-4 bg-zinc-50 border border-zinc-200 p-5 flex flex-col justify-center gap-1 rounded-sm shadow-sm">
            <div className="flex justify-between items-center pb-1 border-b border-zinc-200">
               <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">SALDO BERJALAN</p>
               <p className="text-[11px] font-black text-black italic uppercase">RP {formatClean(data.saldoAkunKerja)}</p>
            </div>
            <div className="flex justify-between items-center pb-1 border-b border-zinc-200">
               <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">BIAYA PEMULIHAN</p>
               <p className="text-[11px] font-black text-black italic uppercase">RP {formatClean(data.moneyIn)}</p>
            </div>
            <div className="flex justify-between items-center py-1">
               <p className="text-[7px] text-amber-700 font-black uppercase italic tracking-widest">KOMISI VALIDASI (50%)</p>
               <p className="text-[11px] font-black text-amber-600 italic uppercase">+ RP {formatClean(bonusKomisi)}</p>
            </div>
            <div className="pt-1 mt-1 border-t border-dashed border-zinc-300 flex justify-between items-end">
               <p className="text-[7px] text-emerald-800 font-black uppercase italic tracking-[0.2em]">TOTAL PENARIKAN</p>
               <p className="text-[28px] font-black tracking-tighter text-emerald-700 leading-none italic uppercase">
                 RP {formatClean(data.moneyTotal)}
               </p>
            </div>
        </div>
      </div>

      {/* Bagian Keterangan Analisa Teknis */}
      <div className="bg-[#fffbeb] border border-[#fde047] max-h-[300px] overflow-hidden rounded-sm shadow-sm flex items-stretch">
        {/* Ikon Alert Kiri */}
        <div className="w-14 shrink-0 flex items-center justify-center border-r border-amber-200/40 bg-amber-50/10">
           <AlertTriangle size={24} className="text-[#fbbf24]" strokeWidth={1.5} />
        </div>

        {/* Konten Narasi Tengah */}
        <div className="flex-1 p-8 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-4 shrink-0">
             <Terminal size={12} className="text-[#b45309]" />
             <h3 className="text-[11px] font-black tracking-[0.2em] text-[#92400e] uppercase italic">
               KETERANGAN ANALISA TEKNIS SINKRONISASI
             </h3>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-6 flex-1">
             <div className="font-roboto-medium text-[#78350f] text-justify leading-relaxed">
                <span className="font-black block mb-2 text-[17px] tracking-tight uppercase">Diagnosa Sistem:</span>
                <p className="whitespace-pre-wrap italic opacity-95 text-[15px] leading-relaxed">
                   {data.keteranganWaktu.replace('Diagnosa Sistem:', '').trim()}
                </p>
             </div>
          </div>
        </div>

        {/* Status Panel Kanan */}
        <div className="w-[210px] shrink-0 border-l border-amber-300/40 bg-amber-50/20 p-8 flex flex-col justify-center gap-7">
           <div className="space-y-1">
              <p className="text-[7px] font-black text-amber-600 uppercase tracking-[0.2em] italic">SYNC STATUS</p>
              <p className="text-[12px] font-black text-amber-900 uppercase tracking-widest leading-none">IN-PROGRESS</p>
           </div>
           <div className="space-y-1">
              <p className="text-[7px] font-black text-amber-600 uppercase tracking-[0.2em] italic">ACCESS MODE</p>
              <p className="text-[12px] font-black text-zinc-800 uppercase italic tracking-widest leading-none">RESTRICTED</p>
           </div>
           <div className="mt-2 pt-5 border-t border-amber-300/30">
              <p className="text-[6px] font-mono-tech text-zinc-400 tracking-[0.4em] uppercase opacity-60">NODE_ID: MILANO-X9</p>
           </div>
        </div>
      </div>

      {/* Footer Audit */}
      <div className="bg-black text-white px-6 py-3 flex items-center justify-between rounded-sm shrink-0 mt-auto">
         <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-1 bg-emerald-500/10 rounded">
               <ShieldCheck size={12} className="text-emerald-500" />
            </div>
            <span className="text-[8px] font-black tracking-[0.25em] uppercase italic">AUDIT TRAIL LOG: #SEC-NODE-X9 / TLS 1.3 ENCRYPTED PROTOCOL</span>
         </div>
         <span className="text-[7px] font-mono-tech text-zinc-500 italic uppercase tracking-[0.3em]">VX-992-AUTH-MILANO-GLOBAL</span>
      </div>
    </div>
  );
};

export default KesalahanWaktuReport;
