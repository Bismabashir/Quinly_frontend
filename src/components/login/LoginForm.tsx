import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { loginSchema, loginValues } from "@/validations/authValidation";
import LoadingButton from "../loading-button";
import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/apis/authApis";
import { useNavigate } from "@tanstack/react-router";
import { LoginResponse } from "@/interfaces/authInterface";

const LoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: login,
  });

  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: loginValues) => {
    mutate(values, {
      onSuccess: (data: LoginResponse) => {
        queryClient.setQueryData(["user"], data);
        navigate({ to: "/" });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">
              Login to your Quinly account
            </p>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton loading={isPending} type="submit" className="w-full">
            LOGIN
          </LoadingButton>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
