import * as zod from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//IMPORT COMPONENTS
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
import useAxios from "@/hooks/useAxios";

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
  const [timmer, setTimmer] = useState(60);
  const { fetch, error, cancel } = useAxios();
  const verifyRequest = useAxios();

  //TIMMER FOR RESEND EMAIL
  useEffect(() => {
    if (timmer == 0) return;
    if (!timmer) return;
    if (email == "") return;

    const interval = setInterval(() => {
      setTimmer((prev: number) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timmer, email]);

  //CREATE FORM INSTANCE
  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  //SEND EMAIL VERIFICATION CODE
  async function sendEmailVerificationCode() {
    await fetch({
      method: "POST",
      urlPath: ApiUrls.auth.sendVerificationEmail,
      data: { email },
    });
  }

  useEffect(() => {
    if (open && email != "") {
      sendEmailVerificationCode();
    }
    return () => {
      cancel();
    };
  }, [open]);

  //HANDLE EMAIL SEND ERROR
  useEffect(() => {
    if (error != null) {
      toast.error("Failed to send verification email. Please try again!", {
        icon: <InfoIcon className="h-4 w-4" />,
      });
      setTimmer(0);
    }

    return () => {
      toast.dismiss();
    };
  }, [error]);

  //ON FORM SUBMIT AND VERIFY CODE
  async function onSubmitHandler(data: zod.infer<typeof schema>) {
    await verifyRequest
      .fetch({
        method: "POST",
        urlPath: ApiUrls.auth.verifyEmailCode,
        data: { email, code: data.code },
      })
      .then((resp) => {
        if (resp.valid) {
          onVerify();
          setOpen(false);
        }
      });
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
            {verifyRequest.statusCode != null && (
              <ServerErrorAlert
                errors={
                  verifyRequest.statusCode == 400
                    ? ["Invalid Code"]
                    : ["Server Error"]
                }
              />
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
                disabled={verifyRequest.isLoading}
              >
                {verifyRequest.isLoading ? (
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
                  sendEmailVerificationCode();
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
