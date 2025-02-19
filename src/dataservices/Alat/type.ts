import { Alat } from "@/types/alat";

// export interface GetAlatResponse {
//   page: number;
//   results: Alat[];
//   total_pages: number;
//   total_results: number;
// }

export interface GetAllAlatResponse {
  data: Alat[];
  message: string;
  success: boolean;
}

export interface GetAlatResponse {
  data: Alat;
  message: string;
  success: boolean;
}
