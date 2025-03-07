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
import {
  resetPasswordSchema,
  resetPasswordValues,
} from "@/validations/authValidation";
import LoadingButton from "../loading-button";
import { PasswordInput } from "../password-input";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/apis/authApis";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { customSuccessToast } from "../custom-toast";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const search = useSearch({ from: "/reset-password" });
  const email = search.email;

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
  });

  const form = useForm<resetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: resetPasswordValues) => {
    mutate(
      { ...values, email },
      {
        onSuccess: () => {
          customSuccessToast("Password reset successful");
          navigate({ to: "/login" });
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">Reset Password</h1>
            <div className="text-center text-sm">Reset account password</div>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
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

export default ResetPasswordForm;
