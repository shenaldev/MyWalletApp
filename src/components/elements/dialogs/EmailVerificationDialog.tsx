import * as zod from "zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//IMPORT COMPONENTS
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, FormField } from "@/components/ui/form";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/elements/InputField";
import ServerErrorAlert from "../ServerErrorAlert";
import Spinner from "@/components/ui/spinner";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";
import useTimer from "@/hooks/useTimmer";

const schema = zod
  .object({
    code: zod.string().min(1, "Code is required"),
  })
  .required();

type PropTypes = {
  open: boolean;
  email: string;
  setOpen: (open: boolean) => void;
  onVerify: () => void;
};

function EmailVerificationDialog({
  open,
  email,
  setOpen,
  onVerify,
}: PropTypes) {
  if ((!open && email == "") || undefined || null) return;

  const { timmer, setTimmer } = useTimer();

  //CREATE FORM INSTANCE
  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  /**
   * Send Email Verification Code Request To the Server
   * with the email address
   */
  const sendVerificationCode = useQuery({
    queryKey: ["sendEmailVerificationCode", email],
    queryFn: async () => {
      const response = await axiosCall({
        method: "POST",
        urlPath: ApiUrls.auth.sendVerificationEmail,
        data: { email },
      });
      return response;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  /**
   * Show Toast Notification If Error
   * On Send Verification Code
   */
  useEffect(() => {
    if (sendVerificationCode.isError) {
      toast.error("Failed to send verification email. Please try again!", {
        icon: <InfoIcon className="h-4 w-4" />,
      });
      setTimmer(0);
    }

    return () => {
      toast.dismiss();
    };
  }, [sendVerificationCode.isError]);

  /**
   * Send Email Verification Code Request To the Server
   * with the email address and input verification code
   */
  const validateCode = useMutation({
    mutationFn: async (code: any) => {
      return await axiosCall({
        method: "POST",
        urlPath: ApiUrls.auth.verifyEmailCode,
        data: { email, code: code },
      });
    },
    onSuccess: (data) => {
      if (data.valid) {
        toast.success("Email Verified Successfully!");
        onVerify();
        setOpen(false);
      }
    },
  });

  async function onSubmitHandler(data: zod.infer<typeof schema>) {
    validateCode.mutateAsync(data.code);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Verify Email Address</DialogTitle>
          <DialogDescription>
            A verification link has been sent to your email address. Please
            check your inbox and enter the code below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            {validateCode.status === "error" && (
              <ServerErrorAlert errors={validateCode.error} />
            )}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <InputField
                  label="Verification Code"
                  field={field}
                  type="number"
                />
              )}
            />
            <DialogFooter>
              <Button
                variant="default"
                type="submit"
                disabled={validateCode.isPending}
              >
                {validateCode.isPending ? (
                  <>
                    <Spinner color="white" isButton={true} /> Verifying
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={timmer != 0}
                onClick={() => {
                  setTimmer(60);
                  sendVerificationCode.refetch();
                }}
              >
                Resend Email {timmer ? `in ${timmer}s` : ""}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EmailVerificationDialog;
