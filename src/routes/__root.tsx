import withDashboardLayout from "@/hoc/withDashboardLayout";
import { createRootRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const RootComponent = () => {
  const matchRoute = useMatchRoute();

  const isExcluded =
    matchRoute({
      to: "/login",
    }) ||
    matchRoute({ to: "/register" }) ||
    matchRoute({ to: "/forgot-password" }) ||
    matchRoute({ to: "/reset-password" });

  const Layout = isExcluded ? Outlet : withDashboardLayout(() => <Outlet />);

  return (
    <>
      <Layout />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
