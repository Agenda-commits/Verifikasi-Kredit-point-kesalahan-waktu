
import React from 'react';
import { ShieldCheck, BarChart3, Star, User, CreditCard, ShieldAlert, Terminal, Calculator, Plus, RefreshCcw, Tag } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const SkorKreditReport: React.FC<Props> = ({ data }) => {
  const costPoin = data.moneyIn;
  const bonusKomisi = costPoin * 0.5;
  const neededPoints = Math.max(0, data.targetPoint - data.currentPoint);

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
          <h2 className="text-[18px] font-black tracking-[0.15em] text-black uppercase leading-none">
            LAPORAN PEMULIHAN KREDIT POINT
          </h2>
          <p className="text-[8px] text-zinc-400 tracking-[0.2em] mt-1 uppercase italic font-bold">
            Audit sinkronisasi poin kredibilitas & validasi penarikan dana.
          </p>
        </div>
        <div className="p-1 border-[1.5px] border-black rounded-md">
          <Star size={16} className="text-black" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 shrink-0">
        <div className="col-span-4 bg-black p-4 border-l-[8px] border-[#eab308] shadow flex flex-col justify-center min-h-[120px] rounded-sm">
           <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={10} className="text-[#eab308]" />
              <p className="text-[7px] font-black text-zinc-500 tracking-[0.3em] uppercase italic">KREDIT POINT</p>
           </div>
           <div className="flex items-center gap-3 mb-2">
              <p className="text-[50px] font-serif-armani italic font-bold text-[#eab308] leading-none tracking-tighter">
                 {data.skorKredit}
              </p>
              <div className="flex flex-col">
                 <span className="text-sm text-zinc-600 font-black uppercase">POINT</span>
                 <span className="text-[6px] font-black text-zinc-500 uppercase italic">STATUS: RESTRICTED</span>
              </div>
           </div>
        </div>

        <div className="col-span-4 bg-white border border-zinc-200 p-4 flex flex-col justify-center gap-2 rounded-sm shadow-sm">
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5">PEMILIK AKUN</p>
              <p className="text-sm font-black text-black uppercase truncate border-b border-zinc-50">{data.nama}</p>
           </div>
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5">BANK PENERIMA</p>
              <p className="text-sm font-black text-black uppercase">{data.bank}</p>
           </div>
        </div>

        <div className="col-span-4 bg-white border border-zinc-200 p-4 flex flex-col justify-center gap-2 rounded-sm shadow-sm">
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5">NOMOR REKENING</p>
              <p className="text-sm font-mono-tech font-bold text-zinc-800 tracking-wider">
                 {data.noRekening}
              </p>
           </div>
           <div>
              <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5">SECURITY PROTOCOL</p>
              <p className="text-[8px] font-mono-tech text-zinc-400 italic uppercase">AES-256-MILANO</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 flex-1 min-h-0 overflow-hidden">
        {/* MODUL RINCIAN PEMBAYARAN (Sesuai Gambar Referensi) */}
        <div className="col-span-5 bg-[#0e0e10] text-white p-6 border-t-[4px] border-[#eab308] shadow-xl flex flex-col justify-between rounded-sm">
           <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-[#eab308] border-b border-zinc-800 pb-4">
                 <Calculator size={16} />
                 <h3 className="text-[11px] font-black tracking-[0.3em] uppercase italic">RINCIAN PEMBAYARAN</h3>
              </div>
              
              <div className="space-y-5 px-1">
                 {/* HARGA PER 1 POINT - MERAH BOLD */}
                 <div className="flex justify-between items-center text-red-600 font-black">
                    <div className="flex items-center gap-2">
                       <Tag size={12} className="text-red-600" />
                       <span className="text-[10px] uppercase tracking-widest">HARGA PER 1 POINT</span>
                    </div>
                    <span className="text-xl italic">RP {formatClean(data.hargaPerPoint)}</span>
                 </div>

                 {/* KEKURANGAN */}
                 <div className="flex justify-between items-center text-zinc-400 font-bold uppercase">
                    <span className="text-[10px] tracking-widest">KEKURANGAN ({neededPoints} PT)</span>
                    <span className="text-white font-black text-xl italic">RP {formatClean(costPoin)}</span>
                 </div>
                 
                 {/* KOMISI - EMERALD GREEN */}
                 <div className="flex justify-between items-center text-emerald-500 font-black uppercase border-y border-zinc-800/60 py-4">
                    <span className="text-[10px] tracking-widest">KOMISI (50%)</span>
                    <span className="text-2xl italic">+ RP {formatClean(bonusKomisi)}</span>
                 </div>
                 
                 {/* SALDO AKUN KERJA */}
                 <div className="flex justify-between items-center text-zinc-400 font-bold uppercase">
                    <span className="text-[10px] tracking-widest">SALDO AKUN KERJA</span>
                    <span className="text-white font-black text-xl italic">RP {formatClean(data.saldoAkunKerja)}</span>
                 </div>
              </div>
           </div>
           
           <div className="pt-6 border-t border-dashed border-zinc-800 mt-6">
              <div className="flex flex-col items-end">
                 <span className="text-[9px] font-black tracking-[0.3em] text-[#eab308] uppercase italic mb-1">TOTAL AKUMULASI DANA AKHIR</span>
                 <p className="text-[64px] font-black text-white leading-none tracking-tighter italic uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    RP {formatClean(data.moneyTotal)}
                 </p>
              </div>
           </div>
        </div>

        <div className="col-span-7 bg-white border border-zinc-200 p-6 flex flex-col justify-between rounded-sm shadow-sm overflow-hidden">
           <div className="flex justify-between items-start mb-2">
              <div>
                 <p className="text-[8px] font-black text-zinc-400 tracking-[0.2em] uppercase italic mb-1">SALDO AKUN KERJA SAAT INI</p>
                 <p className="text-[42px] font-black text-black tracking-tighter leading-none italic uppercase">
                    RP {formatClean(data.saldoAkunKerja)}
                 </p>
              </div>
              <RefreshCcw size={20} className="text-zinc-200 animate-spin-slow" />
           </div>
           <div className="space-y-3">
              <div className="bg-[#f0fdf4] border border-emerald-100 p-5 rounded-sm relative overflow-hidden">
                 <div className="flex items-center gap-2 mb-2 relative z-10">
                   <Plus size={10} className="text-emerald-800" />
                   <p className="text-[9px] font-black text-emerald-800 tracking-[0.2em] uppercase italic">
                     TOTAL PENARIKAN SALDO SELURUH (AKUMULASI PENUH)
                   </p>
                 </div>
                 <p className="text-[62px] font-black text-emerald-700 tracking-tighter leading-none relative z-10 italic uppercase">
                    {formatClean(data.moneyTotal)}
                 </p>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-[#fffbeb] border border-[#fde047] px-6 py-4 shadow-sm relative border-l-[10px] border-[#fbbf24] flex items-center gap-6 shrink-0 h-[140px] rounded-r-lg overflow-hidden">
        <ShieldCheck size={40} className="text-[#fbbf24] shrink-0" />
        <div className="flex-1 flex flex-col overflow-hidden justify-center h-full">
          <div className="flex items-center gap-2 mb-1.5 shrink-0">
            <Terminal size={12} className="text-[#b45309]" />
            <h3 className="text-[11px] font-black tracking-[0.2em] text-[#92400e] uppercase italic">PROTOKOL SINKRONISASI KREDIT</h3>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-4 flex-1">
            <p className={`font-roboto-medium text-[#78350f] font-black text-justify whitespace-pre-wrap ${getFontSize(data.keteranganKredit)}`}>
              {data.keteranganKredit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkorKreditReport;
