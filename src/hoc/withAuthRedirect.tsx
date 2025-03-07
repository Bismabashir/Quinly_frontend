import { FC, JSX, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

const withAuthRedirect = <P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
): FC<P> => {
  const AuthRedirect: FC<P> = (props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const user = queryClient.getQueryData(["user"]);

    useEffect(() => {
      if (user) {
        navigate({ to: "/", replace: true });
      }
    }, [user, navigate]);

    if (user) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthRedirect;
};

export default withAuthRedirect;
