import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import BotImg from "@/assets/bot.png";
import LoginForm from "@/components/login/LoginForm";
import withAuthRedirect from "@/hoc/withAuthRedirect";

const Login = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <LoginForm />
              <div className="bg-muted relative hidden md:block">
                <img
                  src={BotImg}
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginWithAuthRedirect = withAuthRedirect(Login);
export default LoginWithAuthRedirect;
