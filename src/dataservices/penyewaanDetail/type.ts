import { PenyewaanDetail } from "@/types/penyewaanDetail";

export interface GetPenyewaanDetailResponse {
  page: number;
  results: PenyewaanDetail[];
  total_pages: number;
  total_results: number;
}
