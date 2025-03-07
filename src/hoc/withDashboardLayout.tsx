import { FC, JSX, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar.tsx";

const withDashboardLayout = <P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
): FC<P> => {
  const Layout: FC<P> = (props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const user = queryClient.getQueryData(["user"]);

    useEffect(() => {
      if (!user) {
        navigate({ to: "/login", replace: true });
      }
    }, [user, navigate]);

    if (!user) return null;

    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-full py-7 px-9">
          <SidebarTrigger className="cursor-pointer" />
          <div className="mt-5">
            <WrappedComponent {...props} />
          </div>
        </main>
      </SidebarProvider>
    );
  };

  return Layout;
};

export default withDashboardLayout;
