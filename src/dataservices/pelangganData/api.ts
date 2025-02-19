import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getBaseQuery } from "../../init/baseQuery";
import { GetPelangganDataResponse } from "./type";

export const useGetPelangganData = (
  path: string,
  page: number
): UseQueryResult<GetPelangganDataResponse, Error> => {
  return useQuery<GetPelangganDataResponse, Error>({
    queryKey: ["PelangganData", path, page],
    queryFn: async () => await getBaseQuery(`${path}?page=${page}`),
  });
};
