
import React from 'react';
import { BarChart3, Star, Calculator, RefreshCcw, Tag, FileText, CheckCircle2, ShieldAlert, ShieldCheck, Award, Zap } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const SkorKreditReport: React.FC<Props> = ({ data }) => {
  const costPoin = data.moneyIn;
  const bonusKomisi = costPoin * 0.5;
  const neededPoints = Math.max(0, data.targetPoint - data.currentPoint);
  const grandTotal = (data.saldoAkunKerja || 0) + costPoin + bonusKomisi;

  const getNarasiFontSize = (text: string) => {
    const len = text.length;
    if (len > 500) return 'text-[10px]';
    return 'text-[11.5px]';
  };

  return (
    <div className="flex flex-col h-full animate-in space-y-3 max-h-full overflow-hidden">
      {/* Header Laporan */}
      <div className="border-b-[2px] border-zinc-900 pb-2 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-[17px] font-black tracking-tight text-black uppercase leading-none">
            LAPORAN PEMULIHAN KREDIT POINT & AUDIT DANA
          </h2>
          <p className="text-[8px] text-zinc-400 tracking-[0.25em] mt-1.5 uppercase italic font-bold">
            INTERNAL SECURITY AUDIT SYSTEM - NODE-MILANO-X9
          </p>
        </div>
        <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-black text-white rounded-[2px] text-[8px] font-black tracking-widest flex items-center gap-2 shadow-md border border-zinc-800">
                <Star size={10} className="text-[#eab308] fill-[#eab308]" />
                PRIORITY RECOVERY
            </div>
        </div>
      </div>

      {/* Grid Atas: Status Kredit & Info User */}
      <div className="grid grid-cols-12 gap-3 shrink-0">
        <div className="col-span-4 bg-[#0a0a0a] p-4 border-l-[8px] border-[#eab308] shadow-sm flex flex-col justify-center min-h-[100px] rounded-sm relative overflow-hidden">
           <div className="absolute top-2 right-2 opacity-10 text-white">
              <BarChart3 size={28} />
           </div>
           <div className="relative z-10">
              <p className="text-[7px] font-black text-zinc-500 tracking-[0.3em] uppercase italic mb-1">STATUS KREDIT POINT</p>
              <div className="flex items-baseline gap-2 leading-none">
                 <p className="text-[42px] font-black text-[#eab308] tracking-tighter italic uppercase leading-none">
                    {data.skorKredit}
                 </p>
                 <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-400 font-black uppercase italic leading-none">POINT</span>
                    <span className="text-[6px] bg-red-600 text-white px-1 mt-1 font-bold uppercase tracking-wider">RESTRICTED</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="col-span-8 bg-white border border-zinc-200 p-4 flex items-center justify-between rounded-sm shadow-sm relative overflow-hidden">
           <div className="grid grid-cols-3 gap-8">
              <div>
                 <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">NAMA LENGKAP ANGGOTA</p>
                 <p className="text-[12px] font-black text-black uppercase truncate">{data.nama}</p>
              </div>
              <div>
                 <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">INSTITUSI PERBANKAN</p>
                 <p className="text-[12px] font-black text-black uppercase truncate">{data.bank}</p>
              </div>
              <div>
                 <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">NOMOR REKENING TUJUAN</p>
                 <p className="text-[12px] font-mono-tech font-bold text-black tracking-wider">{data.noRekening}</p>
              </div>
           </div>
           <div className="flex flex-col items-end gap-1 opacity-10">
              <p className="text-[6px] font-mono text-zinc-400 uppercase">AUTH_ID</p>
              <p className="text-[7px] font-mono text-zinc-900 font-bold uppercase">{data.securityHash}</p>
           </div>
        </div>
      </div>

      {/* Grid Utama: Invoice Style Details */}
      <div className="grid grid-cols-12 gap-3 flex-1 min-h-0 overflow-hidden">
        {/* Panel Kiri: Summary Invoice */}
        <div className="col-span-5 bg-[#0a0a0a] text-white p-6 border-t-[5px] border-[#eab308] shadow-xl flex flex-col justify-between rounded-sm relative">
           <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-2 text-[#eab308] border-b border-zinc-800/80 pb-3 mb-4">
                 <FileText size={12} />
                 <p className="text-[10px] font-black tracking-[0.3em] uppercase italic">DETAIL INVOICE PENCAIRAN AKUMULASI</p>
              </div>
              
              <div className="space-y-4 flex-1">
                 {/* Items with baseline alignment for precision */}
                 <div className="flex justify-between items-baseline border-b border-zinc-800/40 pb-3">
                    <div className="space-y-0.5">
                       <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">SALDO AKUN KERJA AKTIF</p>
                       <p className="text-[9px] text-zinc-500 italic font-medium leading-none">Internal balance validation</p>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-[10px] font-black text-zinc-600 italic">RP</span>
                       <p className="text-[17px] font-black text-white italic tracking-tight">{formatClean(data.saldoAkunKerja)}</p>
                    </div>
                 </div>

                 <div className="flex justify-between items-baseline border-b border-zinc-800/40 pb-3">
                    <div className="space-y-0.5">
                       <p className="text-[8px] font-black text-red-500 uppercase tracking-widest">PEMULIHAN POIN ({neededPoints} PT)</p>
                       <p className="text-[9px] text-[#eab308] italic font-black leading-none uppercase tracking-tight">RATE: RP {formatClean(data.hargaPerPoint)}/PT</p>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-[10px] font-black text-zinc-600 italic">RP</span>
                       <p className="text-[17px] font-black text-white italic tracking-tight">{formatClean(costPoin)}</p>
                    </div>
                 </div>

                 <div className="flex justify-between items-baseline border-b border-zinc-800/40 pb-3">
                    <div className="space-y-0.5">
                       <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">INSENTIF VALIDASI (50%)</p>
                       <p className="text-[9px] text-zinc-500 italic font-medium leading-none">Bonus commission payout</p>
                    </div>
                    <div className="flex items-baseline gap-1.5 text-emerald-400">
                       <span className="text-[10px] font-black italic">+ RP</span>
                       <p className="text-[17px] font-black italic tracking-tight">{formatClean(bonusKomisi)}</p>
                    </div>
                 </div>

                 <div className="flex items-center justify-end gap-2 pt-1">
                    <CheckCircle2 size={10} className="text-emerald-500" />
                    <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-[0.2em]">NETWORK SECURE SYNC</span>
                 </div>
              </div>

              {/* Grand Total Footer - Resized for precision */}
              <div className="mt-auto pt-4 border-t-[2px] border-zinc-800 flex flex-col items-end">
                  <p className="text-[9px] font-black text-[#eab308] uppercase tracking-[0.4em] italic mb-1.5">JUMLAH TOTAL PENARIKAN BERSIH</p>
                  <div className="flex items-baseline gap-3 leading-none">
                      <span className="text-[18px] font-black text-zinc-600 italic">RP</span>
                      <p className="text-[44px] font-black text-white tracking-tighter leading-none italic uppercase">
                          {formatClean(grandTotal)}
                      </p>
                  </div>
              </div>
           </div>
           <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>

        {/* Panel Kanan: Visualisasi Pencairan Penuh & Security Note */}
        <div className="col-span-7 bg-white border border-zinc-200 p-6 flex flex-col justify-between rounded-sm shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-start mb-1">
              <div>
                 <p className="text-[8px] font-black text-zinc-400 tracking-[0.2em] uppercase italic mb-1.5">SALDO AKUN KERJA SAAT INI</p>
                 <div className="flex items-baseline gap-3 leading-none">
                    <span className="text-[16px] font-black text-zinc-200 italic uppercase">RP</span>
                    <p className="text-[44px] font-black text-black tracking-tighter leading-none italic uppercase">
                       {formatClean(data.saldoAkunKerja)}
                    </p>
                 </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-100 shadow-inner">
                 <RefreshCcw size={22} className="text-zinc-300 animate-spin-slow" />
              </div>
           </div>

           {/* SECURITY NOTE - Compacted */}
           <div className="mb-4 bg-red-50/50 border border-red-200 px-4 py-3 rounded-sm flex items-start gap-3 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>
              <ShieldAlert size={16} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                 <p className="text-[8px] font-black text-red-700 uppercase tracking-widest mb-0.5 italic">SECURITY ADVISORY NOTE:</p>
                 <p className="text-[11px] font-bold text-red-900 leading-tight italic">
                    Protokol ini sudah dilakukan pengecekan secara berkala oleh tim, dan tindakan perlu dilakukan untuk menghindari resiko likuidasi.
                 </p>
              </div>
           </div>

           {/* BAGIAN ATURAN KREDIT POIN 100 - REFINED PRECISION */}
           <div className="bg-[#fafafa] border border-zinc-200 p-5 rounded-sm relative shadow-inner overflow-hidden border-l-[10px] border-zinc-900 flex-1 flex flex-col justify-center max-h-[220px]">
              <div className="flex items-center gap-2.5 mb-4 relative z-10 border-b border-zinc-200 pb-2.5">
                <ShieldCheck size={14} className="text-zinc-900" />
                <p className="text-[10.5px] font-black text-zinc-900 tracking-[0.25em] uppercase italic leading-none">
                  PROTOKOL INTEGRITAS KREDIT POIN (STANDARD 100 PT)
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3.5 relative z-10">
                 <div className="flex items-start gap-3.5">
                    <Award size={14} className="text-[#eab308] mt-0.5 shrink-0" />
                    <p className="text-[10px] font-bold text-zinc-500 leading-relaxed uppercase italic">
                       Skor 100 Poin adalah <span className="text-black font-black underline decoration-1 underline-offset-2">ambang batas mutlak</span> kepercayaan sistem untuk membuka enkripsi penarikan pada Node Milano-X9.
                    </p>
                 </div>
                 <div className="flex items-start gap-3.5">
                    <Zap size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-[10px] font-bold text-zinc-500 leading-relaxed uppercase italic">
                       Hanya akun dengan indeks kepercayaan 1:1 (100 PT) yang berhak menerima <span className="text-emerald-700 font-black">Validasi Otomatis</span> tanpa intervensi audit manual lebih lanjut.
                    </p>
                 </div>
                 <div className="flex items-start gap-3.5">
                    <ShieldAlert size={14} className="text-red-500 mt-0.5 shrink-0" />
                    <p className="text-[10px] font-bold text-zinc-500 leading-relaxed uppercase italic">
                       Kekurangan poin (<span className="text-red-700 font-black">{neededPoints} PT</span>) dideteksi sebagai anomali perilaku yang mewajibkan sinkronisasi database sebelum dana dapat dilepaskan.
                    </p>
                 </div>
              </div>

              {/* Background Watermark */}
              <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none transform translate-x-1/4 translate-y-1/4">
                 <Award size={160} className="text-black" />
              </div>
           </div>
        </div>
      </div>

      {/* Bagian Narasi Bawah - Compact Height for Stability */}
      <div className="bg-[#fffbeb] border border-[#fde047] px-6 py-3.5 shadow-sm relative border-l-[10px] border-[#fbbf24] flex items-center gap-6 shrink-0 h-[100px] rounded-r-sm overflow-hidden">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-full border border-amber-200 bg-white flex items-center justify-center shadow-sm">
             <RefreshCcw size={22} className="animate-spin-slow text-[#b45309]" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden justify-center h-full">
          <div className="flex items-center gap-2 mb-1 shrink-0 text-[#b45309]">
            <Tag size={12} />
            <h3 className="text-[10.5px] font-black tracking-[0.2em] uppercase italic leading-none">PROTOKOL SINKRONISASI KREDIT POINT</h3>
          </div>
          <div className="overflow-y-auto custom-scrollbar pr-4">
            <p className={`font-roboto-medium text-[#78350f] font-bold text-justify leading-snug italic whitespace-pre-wrap ${getNarasiFontSize(data.keteranganKredit)}`}>
              {data.keteranganKredit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkorKreditReport;
