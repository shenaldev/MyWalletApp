import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import InputField from "./elements/InputField";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1, "Password is required"),
});

function LoginForm() {
  const loginForm = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmitHandler(data: zod.infer<typeof loginSchema>) {
    console.log(data);
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmitHandler)}>
        <FormField
          control={loginForm.control}
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
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <InputField type="password" label="Password" field={field} />
          )}
        />
        <div className="mb-2 mt-6">
          <Button type="submit" className="w-full" variant="secondary">
            <Mail className="mr-2 h-4 w-4" />
            Login with Email
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
