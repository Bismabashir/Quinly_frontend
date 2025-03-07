import Chats from "@/pages/Chats";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chats")({
  component: Chats,
});
