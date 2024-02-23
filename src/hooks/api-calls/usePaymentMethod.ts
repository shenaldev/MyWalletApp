import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { PaymentMethod } from "@/types/types";
import { axiosCall } from "@/lib/axiosCall";
import ApiUrls from "@/lib/ApiUrls";

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
