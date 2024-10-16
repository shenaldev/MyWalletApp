import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";

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
