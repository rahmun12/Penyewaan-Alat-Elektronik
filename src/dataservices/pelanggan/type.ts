import { Pelanggan } from "@/types/pelanggan";

export interface GetAllPelangganResponse {
  data: Pelanggan[];
  message: string;
  success: boolean;
}

export interface GetPelangganResponse {
  data: Pelanggan;
  message: string;
  success: boolean;
}
