import { Category } from "@/types/Categories";
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import ApiUrls from "@/lib/api-urls";
import { axiosCall } from "@/lib/axios-call";

export default function useCategory(
  options?: Omit<UseQueryOptions<QueryKey, QueryFunction>, string>,
) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const response = await axiosCall({
        method: "GET",
        urlPath: ApiUrls.user.categories,
      });
      return response;
    },
    ...options,
  });
}
