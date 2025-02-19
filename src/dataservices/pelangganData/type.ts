import { PelangganData } from "@/types/pelangganData";

export interface GetPelangganDataResponse {
  page: number;
  results: PelangganData[];
  total_pages: number;
  total_results: number;
}
