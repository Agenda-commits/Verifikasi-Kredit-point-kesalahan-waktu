
import React, { useState } from 'react';
import { Camera, X, LayoutDashboard, Send, Clock, Star, ShieldCheck, FileText, User, MessageSquareText, Settings2, Terminal, Wifi, Activity, Calculator, ShieldAlert } from 'lucide-react';
import { DashboardData, ActiveReport } from './types';
import { parseNumber } from './utils';
import SidebarInput from './components/SidebarInput';

// Import Modul Laporan
import KesalahanWaktuReport from './components/reports/KesalahanWaktuReport';
import SkorKreditReport from './components/reports/SkorKreditReport';
import VerifikasiReport from './components/reports/VerifikasiReport';

const App: React.FC = () => {
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveReport>('SKOR KREDIT');
  const [data, setData] = useState<DashboardData>({
    nama: 'KEN',
    bank: 'BANK BRI',
    noRekening: '015282821745153',
    siklusDeteksi: 'S3 (SIKLUS 1)',
    kodeKontrak: 'C79F-1T70-5QLL',
    saldoAwalBase: 150000000,
    saldoSelesaiSiklus1: 125000000,
    targetCrash: 50000000,
    targetValid: 50000000,
    tokenPemulihanPerUnit: 17560000,
    biayaAdministrasi: 0,
    latensiMs: 142,
    deviasiWaktu: '42 MENIT',
    bufferStatus: 'KRITIS / TERHAMBAT',
    lastSync: 'NODE-MILANO-X9',
    currentPoint: 90,
    targetPoint: 100,
    hargaPerPoint: 1000000,
    skorKredit: '90/100',
    tierAkun: 'AKSES DIBATASI',
    trustIndex: 12,
    limitHarian: 500000000,
    kycLevel: 'LEVEL 3 - TERVERIFIKASI PENUH',
    securityHash: 'GA-882-MILANO-X9',
    biometricStatus: 'PERMATA BANK (READY)',
    deviceFingerprint: 'IP-202.162.XXX.XX',
    keteranganManual: '', 
    keteranganKredit: 'Diagnosa Sistem:\nTerjadi penurunan credit point akibat adanya proses pelanggaran yang terdeteksi oleh sistem.\nDampak dari pelanggaran tersebut menyebabkan akun bisnis dikenakan pembatasan, sehingga nilai credit point mengalami penurunan.\nSaat ini diperlukan proses penanganan dan pemulihan credit point agar akun dapat kembali memenuhi syarat penuh 100 point sesuai dengan ketentuan yang berlaku.',
    keteranganWaktu: 'Diagnosa Sistem:\nTerdeteksi adanya ketidaksesuaian dalam proses penanganan pemulihan, di mana tahapan pemulihan tidak dilakukan sesuai dengan ketentuan sistem yang berlaku.\nKondisi tersebut berdampak pada penolakan saldo saat proses penarikan dilakukan.\nOleh karena itu, diperlukan proses pemulihan ulang dengan 1 (satu) frekuensi penanganan agar sistem dapat memverifikasi ulang akun dan mengembalikan status penarikan ke kondisi normal.',
    keteranganVerif: 'Tujuan verifikasi membantu validasi seluruh data, karena proses pelanggaran telah terjadi guna terhindar crash berskala dan pencairan langsung dilakukan tanpa adanya penarikan ulang.',
    saldoAkunKerja: 15000000,
    moneyIn: 10000000, 
    moneyTotal: 30000000, 
  });

  const updateData = (key: keyof DashboardData, value: string) => {
    const numericFields = [
      'saldoAwalBase', 'saldoSelesaiSiklus1', 'targetCrash', 'targetValid', 
      'tokenPemulihanPerUnit', 'biayaAdministrasi', 'latensiMs', 
      'trustIndex', 'limitHarian', 'saldoAkunKerja', 'moneyIn', 'moneyTotal',
      'currentPoint', 'targetPoint', 'hargaPerPoint'
    ];

    const newData = { ...data };

    if (numericFields.includes(key as string)) {
      const parsed = parseNumber(value);
      (newData as any)[key] = parsed;

      const recalculate = () => {
        if (activeTab === 'SKOR KREDIT') {
            const needed = (newData.targetPoint || 0) - (newData.currentPoint || 0);
            const autoCost = Math.max(0, needed * (newData.hargaPerPoint || 0));
            newData.moneyIn = autoCost;
            newData.skorKredit = `${newData.currentPoint}/${newData.targetPoint}`;
            newData.moneyTotal = (newData.saldoAkunKerja || 0) + autoCost + (autoCost * 0.5);
        } else if (activeTab === 'VERIFIKASI AKUN' || activeTab === 'KESALAHAN WAKTU') {
            const cost = newData.moneyIn || 0;
            const previous = newData.saldoAkunKerja || 0;
            const bonus = cost * 0.5;
            newData.moneyTotal = previous + cost + bonus;
        }
      };

      if (['currentPoint', 'targetPoint', 'hargaPerPoint', 'saldoAkunKerja', 'moneyIn'].includes(key as string)) {
        recalculate();
      }
    } else {
      (newData as any)[key] = value;
    }

    setData(newData);
  };

  const getActiveKeteranganKey = (): keyof DashboardData => {
    if (activeTab === 'SKOR KREDIT') return 'keteranganKredit';
    if (activeTab === 'KESALAHAN WAKTU') return 'keteranganWaktu';
    return 'keteranganVerif';
  };

  const renderSidebarInputs = () => {
    const cost = data.moneyIn;
    const bonus = cost * 0.5;
    const activeKeteranganKey = getActiveKeteranganKey();
    
    return (
      <div className="animate-in">
        <section className="space-y-3">
          <div className="flex items-center text-zinc-500 mb-4">
            <LayoutDashboard size={14} className="mr-2" />
            <h3 className="text-[10px] font-bold tracking-widest uppercase">DATA IDENTITAS</h3>
          </div>
          <SidebarInput label="NAMA LENGKAP" type="text" value={data.nama} onChange={(val) => updateData('nama', val)} />
          <SidebarInput label="INSTITUSI BANK" type="text" value={data.bank} onChange={(val) => updateData('bank', val)} />
          <SidebarInput label="NOMOR REKENING" type="text" value={data.noRekening} onChange={(val) => updateData('noRekening', val)} />
        </section>

        {activeTab === 'VERIFIKASI AKUN' ? (
          <section className="mt-4 pt-4 border-t border-[#222] space-y-3">
            <div className="flex items-center text-emerald-500 mb-2">
              <ShieldAlert size={14} className="mr-2" />
              <h3 className="text-[10px] font-bold tracking-widest uppercase">VERIFIKASI & KOMISI</h3>
            </div>
            <SidebarInput label="DANA TERPROSES SEBELUMNYA" value={data.saldoAkunKerja} onChange={(val) => updateData('saldoAkunKerja', val)} />
            <SidebarInput label="BIAYA VERIFIKASI AKTIF (RP)" value={data.moneyIn} onChange={(val) => updateData('moneyIn', val)} />
            
            <div className="bg-[#050505] p-3 border border-emerald-900/30 rounded flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">Komisi Tambahan (50%):</span>
                  <span className="text-[11px] text-emerald-500 font-black">+ RP {new Intl.NumberFormat('id-ID').format(bonus)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-900">
                  <span className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">TOTAL PENCAIRAN AKHIR:</span>
                  <span className="text-[13px] text-white font-black italic">RP {new Intl.NumberFormat('id-ID').format(data.moneyTotal)}</span>
                </div>
            </div>
          </section>
        ) : activeTab === 'KESALAHAN WAKTU' ? (
          <section className="mt-4 pt-4 border-t border-[#222] space-y-3">
            <div className="flex items-center text-red-500 mb-2">
              <Clock size={14} className="mr-2" />
              <h3 className="text-[10px] font-bold tracking-widest uppercase">KONTROL SINKRONISASI WAKTU</h3>
            </div>
            <SidebarInput label="DEVIASI WAKTU (Mis: 42 MENIT)" type="text" value={data.deviasiWaktu} onChange={(val) => updateData('deviasiWaktu', val)} />
            <SidebarInput label="STATUS BUFFER (Mis: KRITIS)" type="text" value={data.bufferStatus} onChange={(val) => updateData('bufferStatus', val)} />
            
            <div className="mt-4 space-y-3">
               <div className="flex items-center text-zinc-500 mb-2">
                <Calculator size={14} className="mr-2" />
                <h3 className="text-[10px] font-bold tracking-widest uppercase">RINCIAN BIAYA PEMULIHAN</h3>
              </div>
              <SidebarInput label="SALDO AKUN SAAT INI (RP)" value={data.saldoAkunKerja} onChange={(val) => updateData('saldoAkunKerja', val)} />
              <SidebarInput label="BIAYA PEMULIHAN NODE (RP)" value={data.moneyIn} onChange={(val) => updateData('moneyIn', val)} />
              
              <div className="bg-[#050505] p-3 border border-red-900/30 rounded flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">Komisi Pemulihan (50%):</span>
                    <span className="text-[11px] text-emerald-500 font-black">+ RP {new Intl.NumberFormat('id-ID').format(bonus)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-900">
                    <span className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">ESTIMASI PENARIKAN:</span>
                    <span className="text-[13px] text-white font-black italic">RP {new Intl.NumberFormat('id-ID').format(data.moneyTotal)}</span>
                  </div>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="mt-4 pt-4 border-t border-[#222] space-y-3">
              <div className="flex items-center text-yellow-500 mb-2">
                <Star size={14} className="mr-2" />
                <h3 className="text-[10px] font-bold tracking-widest uppercase">KALKULATOR POIN MANUAL</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <SidebarInput label="POINT SAAT INI" value={data.currentPoint} onChange={(val) => updateData('currentPoint', val)} />
                <SidebarInput label="TARGET POINT" value={data.targetPoint} onChange={(val) => updateData('targetPoint', val)} />
              </div>
              
              <SidebarInput label="HARGA PER 1 POINT (RP)" value={data.hargaPerPoint} onChange={(val) => updateData('hargaPerPoint', val)} />
              
              <div className="bg-[#050505] p-3 border border-yellow-900/30 rounded flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">Kekurangan:</span>
                  <span className="text-[11px] text-yellow-500 font-black italic">{Math.max(0, (data.targetPoint || 0) - (data.currentPoint || 0))} POINT</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-900">
                  <span className="text-[7px] text-zinc-400 font-bold uppercase tracking-widest">TOTAL PENCAIRAN AKHIR:</span>
                  <span className="text-[13px] text-white font-black italic">RP {new Intl.NumberFormat('id-ID').format(data.moneyTotal)}</span>
                </div>
              </div>
            </section>
          </>
        )}

        <section className="mt-4 pt-4 border-t border-[#222]">
          <div className="flex items-center text-zinc-500 mb-3">
            <MessageSquareText size={14} className="mr-2" />
            <h3 className="text-[10px] font-bold tracking-widest uppercase">PENULISAN NARASI MANUAL ({activeTab})</h3>
          </div>
          <textarea
            value={(data as any)[activeKeteranganKey] as string}
            onChange={(e) => updateData(activeKeteranganKey, e.target.value)}
            className="w-full h-40 bg-[#0a0a0a] border border-[#222] text-[#eee] p-3 text-[10px] font-roboto-medium focus:outline-none focus:border-zinc-500 transition-all leading-relaxed resize-none custom-scrollbar italic"
            placeholder={`Ketik narasi instruksi manual untuk ${activeTab} di sini...`}
          />
        </section>
      </div>
    );
  };

  return (
    <div className={`flex h-screen overflow-hidden font-roboto-medium ${isScreenshotMode ? 'bg-white' : 'bg-[#0a0a0a]'}`}>
      {!isScreenshotMode && (
        <aside className="w-[340px] bg-[#050505] text-white flex flex-col h-full border-r border-[#1a1a1a] overflow-y-auto custom-scrollbar z-50 shadow-2xl">
          <div className="p-8 border-b border-[#1a1a1a] bg-[#000]">
            <div className="flex items-center space-x-4 mb-3">
              <div className="bg-white text-black p-2 rounded shadow-lg">
                <Settings2 size={18} />
              </div>
              <div>
                <h1 className="text-[13px] font-black tracking-[0.2em] text-white uppercase">PUSAT KONTROL</h1>
                <p className="text-[8px] text-zinc-600 tracking-widest font-bold">MILANO SYSTEM V4.0.52</p>
              </div>
            </div>
          </div>
          <div className="p-8 space-y-8">
            <section>
              <div className="flex items-center text-zinc-500 mb-5">
                <LayoutDashboard size={14} className="mr-3" />
                <h3 className="text-[10px] font-bold tracking-widest uppercase">MODUL SISTEM</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setActiveTab('SKOR KREDIT')}
                  className={`w-full h-[54px] text-[10px] font-black tracking-[0.15em] transition-all rounded-[4px] uppercase ${activeTab === 'SKOR KREDIT' ? 'bg-white text-black shadow-xl' : 'bg-[#0e0e0e] text-zinc-600 border border-zinc-900'}`}
                >
                  KREDIT POINT (MANUAL)
                </button>
                <button 
                  onClick={() => setActiveTab('KESALAHAN WAKTU')}
                  className={`w-full h-[54px] text-[10px] font-black tracking-[0.15em] transition-all rounded-[4px] uppercase ${activeTab === 'KESALAHAN WAKTU' ? 'bg-white text-black shadow-xl' : 'bg-[#0e0e0e] text-zinc-600 border border-zinc-900'}`}
                >
                  KESALAHAN WAKTU
                </button>
                <button 
                  onClick={() => setActiveTab('VERIFIKASI AKUN')}
                  className={`w-full h-[54px] text-[10px] font-black tracking-[0.15em] transition-all rounded-[4px] uppercase ${activeTab === 'VERIFIKASI AKUN' ? 'bg-white text-black shadow-xl' : 'bg-[#0e0e0e] text-zinc-600 border border-zinc-900'}`}
                >
                  VERIFIKASI AKUN
                </button>
              </div>
            </section>
            <div className="pt-2">
              {renderSidebarInputs()}
            </div>
          </div>
          <div className="p-8 bg-black border-t border-[#1a1a1a] mt-auto">
            <button 
              onClick={() => setIsScreenshotMode(true)}
              className="w-full py-4 bg-white text-black font-black text-[11px] tracking-[0.2em] flex items-center justify-center hover:bg-zinc-200 transition-all uppercase rounded shadow-2xl"
            >
              <Send size={14} className="mr-3" />
              <span>CETAK LAPORAN FINAL</span>
            </button>
          </div>
        </aside>
      )}
      <main className={`flex-1 flex flex-col bg-[#f5f5f5] overflow-auto ${isScreenshotMode ? 'p-0 items-center justify-center' : 'p-12'}`}>
        {!isScreenshotMode && (
          <div className="mb-8 flex justify-between items-center max-w-[1500px] mx-auto w-full px-4">
            <div className="flex items-center gap-4 text-black uppercase">
               <ShieldCheck size={20} />
               <h2 className="text-2xl font-black tracking-[0.1em]">MONITOR ANALISIS {activeTab}</h2>
            </div>
            <button 
              onClick={() => setIsScreenshotMode(true)}
              className="bg-black text-white px-8 py-3.5 text-[11px] font-black flex items-center tracking-[0.2em] uppercase shadow-2xl hover:bg-zinc-800 transition-all rounded-sm"
            >
              <Camera size={16} className="mr-3" /> PRATINJAU DOKUMEN
            </button>
          </div>
        )}
        {isScreenshotMode && (
          <button 
            onClick={() => setIsScreenshotMode(false)} 
            className="fixed top-5 right-5 z-[100] p-4 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            <X size={24} />
          </button>
        )}
        <div 
          className={`bg-white shadow-[0_60px_120px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col transition-all`}
          style={{ width: '1634px', height: '866px', minWidth: '1634px', minHeight: '866px' }}
        >
          {/* HEADER GIORGIO ARMANI */}
          <div className="w-full pt-4 px-16 relative">
             <div className="flex justify-between items-center opacity-30 border-b border-zinc-200 pb-2 mb-2">
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2">
                      <Terminal size={10} />
                      <span className="text-[7px] font-black tracking-widest uppercase italic">Node: SEC-MILANO-X9</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Wifi size={10} />
                      <span className="text-[7px] font-black tracking-widest uppercase italic">Prot: TLS 1.3 / AES-256</span>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <Activity size={10} />
                   <span className="text-[7px] font-black tracking-widest uppercase italic">Integritas: Terjamin</span>
                </div>
             </div>

             <div className="flex justify-end space-x-6 absolute top-12 right-16 opacity-40">
                <div className="p-1.5 border border-zinc-900 rounded"><FileText size={14} className="text-black" /></div>
                <div className="p-1.5 border border-zinc-900 rounded"><User size={14} className="text-black" /></div>
             </div>

             <h1 className="text-[64px] text-center tracking-[0.12em] text-black font-black leading-none mt-2 select-none uppercase">
                GIORGIO ARMANI
             </h1>

             <div className="flex justify-center space-x-12 mt-4 text-[10px] font-black tracking-[0.25em] text-zinc-400 uppercase">
                <span className="hover:text-black cursor-pointer transition-colors">DATA ANALISIS</span>
                <span className="hover:text-black cursor-pointer transition-colors">LAPORAN</span>
                <span className="text-black border-b-[2px] border-black pb-1">STATUS AKUN</span>
                <span className="hover:text-black cursor-pointer transition-colors">KONFIGURASI</span>
             </div>
             
             <div className="w-full h-[1px] bg-zinc-200 mt-4"></div>
          </div>

          <div className="w-full flex-1 px-16 py-6 overflow-hidden">
             {activeTab === 'KESALAHAN WAKTU' ? (
               <KesalahanWaktuReport data={data} />
             ) : activeTab === 'SKOR KREDIT' ? (
               <SkorKreditReport data={data} />
             ) : (
               <VerifikasiReport data={data} />
             )}
          </div>
          
          <div className="w-full py-4 flex justify-center border-t border-zinc-100 mt-auto bg-zinc-50">
             <p className="text-[10px] font-black tracking-[0.6em] text-zinc-300 uppercase">
                INTERNAL SECURITY AUDIT SYSTEM - MILANO GLOBAL NODE
             </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
