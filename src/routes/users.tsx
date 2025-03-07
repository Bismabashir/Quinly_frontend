import Users from "@/pages/Users";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/users")({
  component: Users,
  validateSearch: z.object({
    page: z.number(),
  }),
});
