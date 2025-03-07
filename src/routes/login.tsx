import LoginWithAuthRedirect from "@/pages/Login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginWithAuthRedirect,
});
