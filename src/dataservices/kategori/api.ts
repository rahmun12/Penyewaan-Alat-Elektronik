import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getBaseQuery } from "../../init/baseQuery";

export const useGetKategori = <T>(
  path: string,
  page: number
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: ["Kategori", path, page],
    queryFn: async () => await getBaseQuery(`${path}?page=${page}`),
  });
};
