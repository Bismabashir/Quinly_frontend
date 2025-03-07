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
import {
  forgotPasswordSchema,
  forgotPasswordValues,
} from "@/validations/authValidation";
import LoadingButton from "../loading-button";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/apis/authApis";
import { ForgotPasswordResponse } from "@/interfaces/authInterface";
import { useNavigate } from "@tanstack/react-router";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
  });

  const form = useForm<forgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: forgotPasswordValues) => {
    mutate(values, {
      onSuccess: (data: ForgotPasswordResponse) => {
        navigate({ to: "/reset-password", search: { email: data.email } });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">Welcome to Quinly</h1>
            <div className="text-center text-sm">
              Forgot your password? We got your back
            </div>
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
          <LoadingButton loading={isPending} type="submit" className="w-full">
            RESET
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
