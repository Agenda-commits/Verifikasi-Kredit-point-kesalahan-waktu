
import React from 'react';
import { User, AlertCircle, Activity, Lock, HelpCircle } from 'lucide-react';
import { DashboardData } from '../../types';
import { formatClean } from '../../utils';

interface Props {
  data: DashboardData;
}

const LaporanUtama: React.FC<Props> = ({ data }) => {
  const bonusKomisi = data.tokenPemulihanPerUnit * 0.5;
  const estimasiSaldoAkhir = data.saldoAwalBase + data.tokenPemulihanPerUnit + bonusKomisi;

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-700">
      
      {/* USER INFO STRIP */}
      <div className="bg-white border border-zinc-100 shadow-sm p-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50">
            <User size={28} className="text-black" />
          </div>
          <div className="grid grid-cols-4 gap-x-12">
            <div>
              <p className="text-[8px] font-bold text-zinc-400 uppercase mb-1">PEMILIK AKUN</p>
              <p className="text-sm font-black text-black">{data.nama}</p>
            </div>
            <div>
              <p className="text-[8px] font-bold text-zinc-400 uppercase mb-1">BANK PENERIMA</p>
              <p className="text-sm font-black text-black">{data.bank}</p>
            </div>
            <div>
              <p className="text-[8px] font-bold text-zinc-400 uppercase mb-1">NOMOR REKENING</p>
              <p className="text-sm font-black text-black">{data.noRekening}</p>
            </div>
            <div>
              <p className="text-[8px] font-bold text-zinc-400 uppercase mb-1">SIKLUS DETEKSI</p>
              <p className="text-sm font-bold text-red-600 italic">{data.siklusDeteksi}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-bold text-zinc-300 uppercase">KODE KONTRAK</p>
          <p className="text-[10px] font-mono-tech text-zinc-500 font-bold">{data.kodeKontrak}</p>
        </div>
      </div>

      {/* NOMINAL CARDS */}
      <div className="grid grid-cols-12 gap-6">
        {/* CRASH CARD */}
        <div className="col-span-4 bg-white border border-zinc-100 shadow-sm relative p-8 h-40 flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-[#b91c1c]"></div>
          <div className="flex items-center gap-2 text-[#b91c1c] mb-2">
            <AlertCircle size={16} />
            <span className="text-[10px] font-bold tracking-widest uppercase">CRASH NOMINAL (TARGET)</span>
          </div>
          <div className="font-serif-armani italic text-[#b91c1c] flex items-baseline leading-none">
            <span className="text-2xl mr-3 font-normal">RP</span>
            <span className="text-[42px] font-bold">{formatClean(data.targetCrash)}.000</span>
          </div>
          <p className="text-[7px] font-bold text-zinc-400 tracking-wider uppercase mt-4">DETECTION CODE: WD-ERR-0922</p>
        </div>

        {/* VALID CARD */}
        <div className="col-span-4 bg-white border border-zinc-100 shadow-sm relative p-8 h-40 flex flex-col justify-center border-l-[1px] border-zinc-100">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-[#15803d]"></div>
          <div className="flex items-center gap-2 text-[#15803d] mb-2">
            <Activity size={16} />
            <span className="text-[10px] font-bold tracking-widest uppercase">VALID NOMINAL (SYSTEM)</span>
          </div>
          <div className="font-serif-armani italic text-[#15803d] flex items-baseline leading-none">
            <span className="text-2xl mr-3 font-normal">RP</span>
            <span className="text-[42px] font-bold">{formatClean(data.targetValid)}.000</span>
          </div>
          <p className="text-[7px] font-bold text-zinc-400 tracking-wider uppercase mt-4">SYSTEM REQUIREMENT MATCH</p>
        </div>

        {/* TOKEN CARD */}
        <div className="col-span-4 bg-[#0a0a0a] text-white shadow-lg relative p-8 h-40 flex flex-col justify-center">
          <p className="text-[8px] font-bold text-zinc-500 tracking-[0.2em] mb-3 uppercase">TOKEN PEMULIHAN / UNIT</p>
          <div className="font-serif-armani italic flex items-baseline leading-none">
            <span className="text-2xl mr-3 font-light text-zinc-500">RP</span>
            <span className="text-[42px] font-black">{formatClean(data.tokenPemulihanPerUnit)}.000</span>
          </div>
          <div className="flex items-center gap-2 text-[#eab308] mt-4">
            <div className="w-2 h-2 rounded-full bg-[#eab308]"></div>
            <span className="text-[8px] font-bold tracking-widest uppercase">SECURITY CLEARANCE NEEDED</span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-12 gap-6 flex-1">
        {/* ANALYSIS TEXT */}
        <div className="col-span-7 bg-white border border-zinc-100 p-10 flex relative border-l-[6px] border-[#b91c1c]">
          <div className="w-16 h-16 rounded-full border border-zinc-100 flex items-center justify-center mr-8 shrink-0 bg-zinc-50">
             <div className="w-10 h-10 rounded-full border-2 border-red-200 flex items-center justify-center text-red-600 font-bold italic text-xl">i</div>
          </div>
          <div className="space-y-6">
            <h3 className="text-[14px] font-black text-black tracking-[0.3em] uppercase">ANALISA TEKNIS & KETERANGAN PEMULIHAN</h3>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-bold uppercase italic">
              KESALAHAN PENARIKAN PADA SIKLUS PERTAMA. JUMLAH INPUT <span className="text-red-600">RP {formatClean(data.targetCrash)}.000</span> TIDAK SESUAI DENGAN VALIDASI SISTEM <span className="text-green-600 text-[11px]">RP {formatClean(data.targetValid)}.000</span>.
            </p>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-bold uppercase">
              SISTEM MENDETEKSI CRASH DAN TELAH MENGUNCI SALURAN PENARIKAN OTOMATIS. HARAP SELESAIKAN PEMBAYARAN TOKEN SEBESAR <span className="text-red-600 underline">RP {formatClean(data.tokenPemulihanPerUnit)}.000</span> GUNA UNTUK MEMPERBARUI DATABASE DAN MELEPASKAN KUNCI KEAMANAN PENARIKAN.
            </p>
            
            <div className="flex items-center gap-3 pt-6 text-zinc-300">
               <HelpCircle size={14} />
               <p className="text-[8px] font-bold tracking-[0.4em] uppercase">WD-SEC-LOCK / FREQUENCY ERROR</p>
            </div>
          </div>
        </div>

        {/* CALCULATION SUMMARY */}
        <div className="col-span-5 bg-white border border-zinc-100 p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-black mb-4 pb-2 border-b border-zinc-100">
              <Activity size={14} />
              <h3 className="text-[10px] font-black tracking-[0.2em] uppercase">RINCIAN BIAYA RE-VALIDASI</h3>
            </div>
            
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              <span>PEMBAYARAN SIKLUS INI</span>
              <span className="text-zinc-800">RP {formatClean(data.tokenPemulihanPerUnit)}.000</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-[#15803d]">
              <span>BONUS KOMISI (50%)</span>
              <span>+ RP {formatClean(bonusKomisi)}.000</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              <span>BIAYA ADMINISTRASI</span>
              <span>RP {formatClean(data.biayaAdministrasi)}.00</span>
            </div>
          </div>

          <div className="bg-black p-6 mt-8 relative border-l-[10px] border-[#eab308] shadow-xl overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800/10 rounded-full -mr-16 -mt-16"></div>
             <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-2 italic">ESTIMASI SALDO AKHIR</p>
             <div className="font-serif-armani italic text-[#eab308] flex items-baseline leading-none">
                <span className="text-xl mr-3 font-normal">RP</span>
                <span className="text-5xl font-black">{formatClean(estimasiSaldoAkhir)}.000</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanUtama;
