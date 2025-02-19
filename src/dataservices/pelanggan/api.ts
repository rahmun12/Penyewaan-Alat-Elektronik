import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getBaseQuery } from "../../init/baseQuery";
import { GetPelangganResponse } from "./type";

export const useGetPelanggan = <T>(
  path: string,
  page: number
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: ["Pelanggan", path, page],
    queryFn: async () => await getBaseQuery(`${path}?page=${page}`),
  });
};