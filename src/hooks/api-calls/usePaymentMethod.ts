import { PaymentMethod } from "@/types/types";
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";

export default function usePaymentMethod(
  options?: Omit<UseQueryOptions<QueryKey, QueryFunction>, string>,
) {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: async (): Promise<PaymentMethod[]> => {
      const response = await axiosCall({
        method: "GET",
        urlPath: ApiUrls.common.paymentMethods,
      });
      return response;
    },
    ...options,
  });
}
