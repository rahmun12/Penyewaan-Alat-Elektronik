import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getBaseQuery } from "../../init/baseQuery";
import { GetPenyewaanResponse } from "./type";

export const useGetPenyewaan = <T>(
  path: string,
  page: number
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: ["Penyewaan", path, page],
    queryFn: async () => await getBaseQuery(`${path}?page=${page}`),
  });
};
