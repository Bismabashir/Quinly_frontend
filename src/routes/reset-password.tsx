import { ResetPassword } from "@/pages/ResetPassword";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  validateSearch: z.object({
    email: z.string().email(),
  }),
});
