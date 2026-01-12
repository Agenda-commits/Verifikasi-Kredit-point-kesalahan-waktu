
import React from 'react';
import { Clock, Database, Globe, AlertTriangle } from 'lucide-react';
import { DashboardData } from '../../types';

interface Props {
  data: DashboardData;
}

const KeterlambatanReport: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-12 gap-10 animate-in fade-in duration-500 h-full content-start">
      <div className="col-span-12 border-b border-zinc-100 pb-6 mb-4">
        <h2 className="text-[14px] font-bold tracking-[0.8em] text-black uppercase">ANALISIS KETERLAMBATAN & SINKRONISASI MILANO</h2>
        <p className="text-[10px] text-zinc-400 tracking-[0.2em] mt-2 uppercase italic">Monitoring latensi jaringa dan integritas feed data real-time.</p>
      </div>
      
      <div className="col-span-8 grid grid-cols-2 gap-8">
        <div className="bg-[#f9f9f9] p-10 border-l-[12px] border-[#b91c1c] shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.3em] uppercase">DEVIASI DELAY SIKLUS</p>
            <Clock size={16} className="text-zinc-300" />
          </div>
          <p className="text-6xl font-mono-tech font-bold text-black">{data.deviasiWaktu}</p>
          <p className="text-[9px] text-zinc-400 mt-6 leading-relaxed tracking-widest uppercase">
            Sistem mendeteksi fluktuasi sinkronisasi pada node pusat. <br/>
            Deviasi saat ini masih dalam batas pengawasan protokol Milano.
          </p>
        </div>

        <div className="bg-[#f9f9f9] p-10 border-l-[12px] border-black shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.3em] uppercase">BUFFER_GATE STATUS</p>
            <Database size={16} className="text-zinc-300" />
          </div>
          <p className="text-4xl font-serif-armani italic font-bold text-black uppercase">{data.bufferStatus}</p>
          <div className="w-full bg-zinc-200 h-[2px] mt-8 overflow-hidden">
            <div className="bg-black h-full w-[85%]"></div>
          </div>
          <p className="text-[8px] font-bold tracking-[0.2em] text-zinc-400 mt-4 uppercase">LOAD: 85% / SECURE FEED</p>
        </div>

        <div className="col-span-2 border border-zinc-100 p-8 flex items-center gap-10">
          <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center border border-zinc-100">
            <Globe size={32} className="text-zinc-300 animate-spin-slow" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.3em] mb-2 uppercase">MILANO CENTRAL NODE</p>
            <p className="text-2xl font-bold tracking-tighter text-black uppercase">SYNC-ID: {data.securityHash}</p>
            <p className="text-[9px] text-zinc-400 mt-1 italic uppercase tracking-widest">Enkripsi session aktif untuk transmisi data siklus pemulihan.</p>
          </div>
        </div>
      </div>

      <div className="col-span-4 flex flex-col gap-8">
        <div className="bg-black text-white p-10 h-full flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-3 text-[#eab308] mb-6">
              <AlertTriangle size={20} />
              <span className="text-[12px] font-bold tracking-[0.5em] uppercase">SYSTEM ADVISORY</span>
            </div>
            <p className="text-[14px] leading-relaxed tracking-wider italic font-serif-armani opacity-80">
              "Pastikan konektivitas tetap stabil selama siklus pemulihan berlangsung. Latensi di atas 0.5s dapat membatalkan token."
            </p>
          </div>
          <div className="pt-8 border-t border-zinc-800">
            <p className="text-[9px] font-bold tracking-[0.4em] text-zinc-600 uppercase">GA-SEC PROTECTION LAYER</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeterlambatanReport;
