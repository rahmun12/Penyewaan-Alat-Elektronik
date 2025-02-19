import { Penyewaan } from "@/types/penyewaan";

export interface GetAllPenyewaanResponse {
  data: Penyewaan[];
  message: string;
  success: boolean;
}

export interface GetPenyewaanResponse {
  data: Penyewaan;
  message: string;
  success: boolean;
}