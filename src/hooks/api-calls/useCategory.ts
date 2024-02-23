import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";
import { Category } from "@/types/Categories";
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

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
