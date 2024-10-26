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
  email: Zod.string().email(),
});

type SendResetMailFormProps = {
  setEmail: (email: string) => void;
};

function SendResetMailForm({ setEmail }: SendResetMailFormProps) {
  const [serverErrors, setServerErrors] = useState<string[] | null>(null);

  const form = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const { status, mutateAsync, isPending } = useMutation({
    mutationKey: ["send-reset-mail"],
    mutationFn: async (data: Zod.infer<typeof schema>) => {
      return axiosCall({
        method: "POST",
        urlPath: ApiUrls.password.forgot,
        data: data,
      });
    },
    onSuccess: () => {
      toast.success("Password reset code sent to your email.");
      setEmail(form.getValues().email);
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
              name="email"
              render={({ field }) => (
                <InputField
                  type="email"
                  label="Email Address"
                  placeholder="example@mail.com"
                  field={field}
                />
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Send Reset Code"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default SendResetMailForm;
