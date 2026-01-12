
import React from 'react';
import { Clock, Activity, User, ShieldCheck, Terminal, AlertTriangle, ShieldAlert, Gavel } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const KesalahanWaktuReport: React.FC<Props> = ({ data }) => {
  const bonusKomisi = data.moneyIn * 0.5;

  return (
    <div className="flex flex-col h-full animate-in space-y-3 max-h-full overflow-hidden">
      {/* Header Laporan */}
      <div className="border-b-[1.5px] border-zinc-900 pb-2 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-[17px] font-black tracking-[0.05em] text-black uppercase leading-tight">
            LAPORAN AKUN BISNIS MENGIKUTI SINKRONISASI WAKTU
          </h2>
          <p className="text-[7.5px] text-zinc-400 tracking-[0.2em] uppercase italic font-bold">
            Data validasi sistem sinkronisasi node milano v4.0.52
          </p>
        </div>
        <div className="p-1 border-[1.5px] border-black rounded">
          <Clock size={14} className="text-black" />
        </div>
      </div>

      {/* Grid Utama: Metrik Atas */}
      <div className="grid grid-cols-12 gap-3 shrink-0">
        <div className="col-span-4 bg-white border border-zinc-200 shadow-sm p-4 flex flex-col justify-center min-h-[110px] rounded-sm relative overflow-hidden">
          <div className="flex items-center gap-2 text-red-600 mb-1.5">
            <Activity size={11} />
            <span className="text-[7px] font-black tracking-[0.3em] uppercase italic">DEVIASI SINKRONISASI</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-[48px] font-black text-black tracking-tighter leading-none italic">
              {data.deviasiWaktu.split(' ')[0]}
            </h1>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[11px] font-black text-black uppercase">{data.deviasiWaktu.split(' ')[1] || 'MENIT'}</span>
              <span className="mt-1 bg-[#e11d48] text-white px-1.5 py-0.5 text-[6.5px] font-black uppercase rounded-sm italic tracking-widest">
                {data.bufferStatus.split(' ')[0] || 'KRITIS'}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-white border border-zinc-200 p-4 flex flex-col justify-center gap-1.5 rounded-sm shadow-sm">
           <div className="flex items-center gap-1.5 text-zinc-300 mb-0.5">
              <User size={10} />
              <span className="text-[6.5px] font-black tracking-[0.2em] uppercase">VERIFIKASI IDENTITAS</span>
           </div>
           <div>
              <p className="text-[6.5px] font-bold text-zinc-400 uppercase leading-none mb-1">NAMA PEMILIK</p>
              <p className="text-[12px] font-black text-black uppercase truncate leading-none">{data.nama}</p>
           </div>
           <div className="grid grid-cols-2 gap-2 mt-0.5">
              <div>
                 <p className="text-[6.5px] font-bold text-zinc-400 uppercase leading-none mb-1">INSTITUSI</p>
                 <p className="text-[9.5px] font-black text-black uppercase truncate leading-none">{data.bank}</p>
              </div>
              <div>
                 <p className="text-[6.5px] font-bold text-zinc-400 uppercase leading-none mb-1">REKENING</p>
                 <p className="text-[9.5px] font-mono-tech font-bold text-zinc-800 leading-none">{data.noRekening}</p>
              </div>
           </div>
        </div>

        <div className="col-span-4 bg-zinc-50 border border-zinc-200 p-4 flex flex-col justify-center gap-1 rounded-sm shadow-sm">
            <div className="flex justify-between items-baseline pb-1 border-b border-zinc-200">
               <p className="text-[6.5px] text-zinc-500 font-bold uppercase tracking-widest">SALDO BERJALAN</p>
               <p className="text-[10px] font-black text-black italic uppercase leading-none">RP {formatClean(data.saldoAkunKerja)}</p>
            </div>
            <div className="flex justify-between items-baseline pb-1 border-b border-zinc-200">
               <p className="text-[6.5px] text-zinc-500 font-bold uppercase tracking-widest">BIAYA PEMULIHAN</p>
               <p className="text-[10px] font-black text-black italic uppercase leading-none">RP {formatClean(data.moneyIn)}</p>
            </div>
            <div className="flex justify-between items-baseline py-0.5">
               <p className="text-[6.5px] text-amber-700 font-black uppercase italic tracking-widest">KOMISI VALIDASI (50%)</p>
               <p className="text-[10px] font-black text-amber-600 italic uppercase leading-none">+ RP {formatClean(bonusKomisi)}</p>
            </div>
            <div className="pt-1 mt-0.5 border-t border-dashed border-zinc-300 flex justify-between items-end">
               <p className="text-[6.5px] text-emerald-800 font-black uppercase italic tracking-[0.2em]">TOTAL PENARIKAN</p>
               <p className="text-[24px] font-black tracking-tighter text-emerald-700 leading-none italic uppercase">
                 RP {formatClean(data.moneyTotal)}
               </p>
            </div>
        </div>
      </div>

      {/* Bagian Keterangan Analisa Teknis */}
      <div className="bg-[#fffbeb] border border-[#fde047] h-[160px] shrink-0 overflow-hidden rounded-sm shadow-sm flex items-stretch">
        <div className="w-12 shrink-0 flex items-center justify-center border-r border-amber-200/40 bg-amber-50/10">
           <AlertTriangle size={20} className="text-[#fbbf24]" strokeWidth={2} />
        </div>

        <div className="flex-1 p-5 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-2.5 shrink-0">
             <Terminal size={11} className="text-[#b45309]" />
             <h3 className="text-[10px] font-black tracking-[0.2em] text-[#92400e] uppercase italic leading-none">
               KETERANGAN ANALISA TEKNIS SINKRONISASI
             </h3>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-4 flex-1">
             <div className="font-roboto-medium text-[#78350f] text-justify">
                <p className="whitespace-pre-wrap italic opacity-95 text-[12.5px] leading-relaxed">
                   {data.keteranganWaktu}
                </p>
             </div>
          </div>
        </div>

        <div className="w-[180px] shrink-0 border-l border-amber-300/40 bg-amber-50/20 p-5 flex flex-col justify-center gap-4">
           <div className="space-y-0.5">
              <p className="text-[6.5px] font-black text-amber-600 uppercase tracking-[0.2em] italic leading-none">SYNC STATUS</p>
              <p className="text-[11px] font-black text-amber-900 uppercase tracking-widest leading-none">IN-PROGRESS</p>
           </div>
           <div className="space-y-0.5">
              <p className="text-[6.5px] font-black text-amber-600 uppercase tracking-[0.2em] italic leading-none">ACCESS MODE</p>
              <p className="text-[11px] font-black text-zinc-800 uppercase italic tracking-widest leading-none">RESTRICTED</p>
           </div>
           <div className="mt-1 pt-3 border-t border-amber-300/30">
              <p className="text-[5.5px] font-mono-tech text-zinc-400 tracking-[0.4em] uppercase opacity-60">NODE_ID: MILANO-X9</p>
           </div>
        </div>
      </div>

      {/* Audit Trail Log Bar */}
      <div className="bg-black text-white px-5 py-2 flex items-center justify-between rounded-sm shrink-0">
         <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center p-1 bg-emerald-500/10 rounded-sm">
               <ShieldCheck size={10} className="text-emerald-500" />
            </div>
            <span className="text-[7.5px] font-black tracking-[0.25em] uppercase italic leading-none">AUDIT TRAIL LOG: #SEC-NODE-X9 / TLS 1.3 ENCRYPTED PROTOCOL</span>
         </div>
         <span className="text-[6.5px] font-mono-tech text-zinc-500 italic uppercase tracking-[0.3em] leading-none">VX-992-AUTH-MILANO-GLOBAL</span>
      </div>

      {/* REFINED: BAGIAN KETENTUAN PROTOKOL KEAMANAN GIORGIO ARMANI */}
      <div className="flex-1 border border-zinc-200 bg-white p-5 rounded-sm relative overflow-hidden flex flex-col justify-center">
         {/* Subtle Background Watermark */}
         <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-[0.02] pointer-events-none">
            <Gavel size={110} className="text-black" />
         </div>

         {/* Section Header */}
         <div className="flex items-center gap-2.5 mb-4 shrink-0 relative z-10">
            <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
               <ShieldAlert size={14} className="text-[#eab308]" />
            </div>
            <h3 className="text-[12px] font-black tracking-[0.25em] text-black uppercase leading-none">
               KETENTUAN PROTOKOL KEAMANAN GIORGIO ARMANI
            </h3>
         </div>
         
         {/* Content List with Precision Spacing */}
         <div className="grid grid-cols-2 gap-x-10 gap-y-4 relative z-10 px-1">
            <div className="space-y-3.5">
               <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1 shrink-0"></div>
                  <p className="text-[9.5px] font-bold text-zinc-500 leading-snug uppercase italic">
                     Setiap deviasi waktu yang melampaui batas toleransi sistem (Node Milano) wajib melalui prosedur sinkronisasi ulang manual dalam waktu <span className="text-black font-black underline decoration-1 underline-offset-2">maksimal 1x24 jam</span>.
                  </p>
               </div>
               <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1 shrink-0"></div>
                  <p className="text-[9.5px] font-bold text-zinc-500 leading-snug uppercase italic">
                     Kegagalan dalam melakukan validasi tepat waktu akan memicu <span className="text-red-600 font-black">Protokol Isolasi Akun</span> secara permanen demi menjaga stabilitas database finansial global.
                  </p>
               </div>
            </div>
            <div className="space-y-3.5">
               <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1 shrink-0"></div>
                  <p className="text-[9.5px] font-bold text-zinc-500 leading-snug uppercase italic">
                     Dana akumulasi hanya akan dilepaskan ke rekening tujuan apabila status sinkronisasi telah mencapai nilai <span className="text-emerald-600 font-black">"ZERO DEVIASI"</span> dan terverifikasi oleh Node Milano-X9.
                  </p>
               </div>
               <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1 shrink-0"></div>
                  <p className="text-[9.5px] font-bold text-zinc-500 leading-snug uppercase italic">
                     Seluruh biaya pemulihan bersifat final dan digunakan secara eksklusif untuk memperbarui checksum keamanan pada jalur transmisi data internasional.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default KesalahanWaktuReport;
