import { Kategori } from "@/types/kategori";

export interface GetKategoriResponse {
  data: Kategori[];
  message: string;
  success: boolean;
}
