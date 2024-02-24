import * as zod from "zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
//IMPORT COMPONENTS
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import InputField from "./elements/InputField";
import ServerErrorAlert from "../elements/ServerErrorAlert";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { useAuth } from "../providers/AuthProvider";
import { axiosCall } from "@/lib/axiosCall";

const registerSchema = zod
  .object({
    full_name: zod.string().min(1, "Full name is required"),
    email: zod.string().email(),
    password: zod.string().min(8, "Password must be at least 8 characters"),
    confirm_password: zod.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    },
  );

type RegisterFormProps = {
  isMailVerified: boolean;
  onSubmit: (data: { email: string }) => void;
};

//REGISTER FORM COMPONENT
function RegisterForm({ isMailVerified, onSubmit }: RegisterFormProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  const registerForm = useForm<zod.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  //USER REGISTRATION MUTATION
  const { isPending, error, status, mutateAsync } = useMutation({
    mutationFn: async (data: any) => {
      return axiosCall({
        method: "POST",
        urlPath: ApiUrls.auth.register,
        data: data,
      });
    },
    onError: (error) => {
      console.log("err", error);
      toast.error("Something went wrong!");
    },
    onSuccess: (data) => {
      if (data?.user != null) {
        auth.login(data?.user);
        navigate("/");
      }
    },
  });

  /**
   * Handle form submit event and call register mutation
   * @param data form data
   */
  async function onSubmitHandler(data: zod.infer<typeof registerSchema>) {
    const userData = {
      name: data.full_name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirm_password,
    };
    if (!isMailVerified) {
      onSubmit({ email: data.email });
      return;
    }
    //CALL REGISTER MUTATION
    mutateAsync(userData);
  }

  //ON EMAIL VERIFICATION CREATE ACCOUNT
  useEffect(() => {
    if (isMailVerified) {
      registerForm.handleSubmit(onSubmitHandler)();
    }
  }, [isMailVerified]);

  return (
    <>
      {status === "error" && <ServerErrorAlert errors={error} />}
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onSubmitHandler)}>
          <FormField
            control={registerForm.control}
            name="full_name"
            render={({ field }) => (
              <InputField
                label="Full Name"
                placeholder="Alen Jake"
                field={field}
              />
            )}
          />
          <FormField
            control={registerForm.control}
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
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <InputField type="password" label="Password" field={field} />
            )}
          />
          <FormField
            control={registerForm.control}
            name="confirm_password"
            render={({ field }) => (
              <InputField
                type="password"
                label="Confirm Password"
                field={field}
              />
            )}
          />
          <div className="mb-2 mt-6">
            <Button
              type="submit"
              className="w-full"
              variant="secondary"
              disabled={isPending}
            >
              <Mail className="mr-2 h-4 w-4" />
              {!isPending ? "Signup with Email" : "Signing up..."}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default RegisterForm;
