import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getBaseQuery } from "../../init/baseQuery";
import { GetAlatResponse } from "./type";

export const useGetAlat = <T>(
  path: string,
  page: number
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: ["Alat", path, page],
    queryFn: async () => await getBaseQuery(`${path}?page=${page}`),
  });
};
