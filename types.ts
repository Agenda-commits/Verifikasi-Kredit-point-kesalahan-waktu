
export interface DashboardData {
  nama: string;
  bank: string;
  noRekening: string;
  siklusDeteksi: string;
  kodeKontrak: string;
  saldoAwalBase: number;
  saldoSelesaiSiklus1: number;
  targetCrash: number;
  targetValid: number;
  tokenPemulihanPerUnit: number;
  biayaAdministrasi: number;
  
  // Fitur Kesalahan Waktu
  latensiMs: number;
  deviasiWaktu: string;
  bufferStatus: string;
  lastSync: string;
  
  // Fitur Skor Kredit
  skorKredit: string; // Format tampilan '10/100'
  currentPoint: number;
  targetPoint: number;
  hargaPerPoint: number;
  tierAkun: string;
  trustIndex: number;
  limitHarian: number;
  
  // Fitur Verifikasi
  kycLevel: string;
  securityHash: string;
  biometricStatus: string;
  deviceFingerprint: string;

  // Keterangan Manual (Terpisah per modul)
  keteranganManual: string; // Legacy field
  keteranganKredit: string;
  keteranganWaktu: string;
  keteranganVerif: string;

  // Manajemen Dana
  saldoAkunKerja: number;
  moneyIn: number;       
  moneyTotal: number;    
}

export type ActiveReport = 'SKOR KREDIT' | 'KESALAHAN WAKTU' | 'VERIFIKASI AKUN';
