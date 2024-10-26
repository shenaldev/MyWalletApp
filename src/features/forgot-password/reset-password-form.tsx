import { useState } from "react";

import { ApiErrorRes } from "@/types/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as Zod from "zod";

import { InputField } from "@/components/form-elements";
import ServerErrorAlert from "@/components/ui-elements/server-error-alert";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";

import ApiUrls from "@/lib/api-urls";
import { axiosCall } from "@/lib/axios-call";
import getServerErrorsArray from "@/lib/server-errors-handler";

const schema = Zod.object({
  token: Zod.string(),
  password: Zod.string().min(6, "Password must be at least 6 characters"),
  password_confirmation: Zod.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

type ResetPasswordFormProps = {
  email: string;
  setIsSuccess: (isSuccess: boolean) => void;
};

function ResetPasswordForm({ email, setIsSuccess }: ResetPasswordFormProps) {
  const [serverErrors, setServerErrors] = useState<string[] | null>(null);

  const form = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { status, mutateAsync, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (data: Zod.infer<typeof schema>) => {
      return axiosCall({
        method: "POST",
        urlPath: ApiUrls.password.reset,
        data: {
          email: email,
          ...data,
        },
      });
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("You'r password has been reset successfully.");
    },
    onError: (error: ApiErrorRes) => {
      const er = getServerErrorsArray(error, true);
      setServerErrors(er || []);
    },
  });

  function submitHandler(data: Zod.infer<typeof schema>) {
    mutateAsync(data);
  }

  return (
    <>
      {status === "error" && (
        <ServerErrorAlert className="mb-4" errors={serverErrors} />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <InputField
                  type="text"
                  label="Token"
                  placeholder="Enter the token sent to your email"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <InputField
                  type="password"
                  label="New Password"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <InputField
                  type="password"
                  label="Confirm New Password"
                  field={field}
                />
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Loading..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default ResetPasswordForm;
