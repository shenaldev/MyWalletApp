import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import ApiUrls from "@/lib/api-urls";
import { axiosCall } from "@/lib/axios-call";

export default function useRemoveCookies(
  options?: Omit<UseQueryOptions<QueryKey, QueryFunction>, string>,
) {
  return useQuery({
    queryKey: ["remove-cookies"],
    queryFn: async (): Promise<any> => {
      const response = await axiosCall({
        method: "POST",
        urlPath: ApiUrls.auth.clearCookies,
      });
      return response;
    },
    ...options,
  });
}
