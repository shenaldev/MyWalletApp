import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import useAuth from "./use-auth";

export default function useOAuthValidation(hash: string) {
  const { oAuth } = useAuth();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (token: string) => {
      return oAuth("api/v1/oauth/google", token);
    },
    onError() {
      toast.error("Error logging in with Google");
    },
    retry: 0,
  });

  useEffect(() => {
    if (hash.length > 0) {
      const hashToParams = new URLSearchParams(hash.substring(1));
      const accessToken = hashToParams.get("access_token");
      if (accessToken && accessToken?.length > 0) {
        mutateAsync(accessToken);
      }
    }
  }, [hash, mutateAsync]);

  return { isAuthenticating: isPending };
}
