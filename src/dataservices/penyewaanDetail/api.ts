import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getBaseQuery } from "../../init/baseQuery";
import { GetPenyewaanDetailResponse } from "./type";

export const useGetPenyewaanDetail = (
  path: string,
  page: number
): UseQueryResult<GetPenyewaanDetailResponse, Error> => {
  return useQuery<GetPenyewaanDetailResponse, Error>({
    queryKey: ["PenyewaanDetail", path, page],
    queryFn: async () => await getBaseQuery(`${path}?page=${page}`),
  });
};
