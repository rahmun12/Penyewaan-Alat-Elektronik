export interface Penyewaan {
  id: number;
  pelanggan_id: number;
  penyewaan_tglsewa: Date;
  penyewaan_tglkembali: Date;
  penyewaan_stspembayaran: string;
  penyewaan_sttskembali: string;
  penyewaan_totalharga: number;
  alat_nama: string;
}
