import { ChevronUp, Home, Inbox, User, User2 } from "lucide-react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.tsx";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LoginResponse } from "@/interfaces/authInterface";
import { customSuccessToast } from "../custom-toast";

export function AppSidebar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user: LoginResponse | undefined = queryClient.getQueryData(["user"]);

  const location = useLocation();

  // Function to check active state ignoring query params
  const isActive = (url: string) => {
    const currentPath = location.pathname; // Extract only pathname
    return currentPath === new URL(url, window.location.origin).pathname;
  };

  const commonItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Chats",
      url: "/chats",
      icon: Inbox,
    },
  ];

  const adminItems = [
    {
      title: "Users",
      url: `/users?page=1`, // Query params will be ignored for active check
      icon: User,
    },
  ];

  const menuItems = user?.user.is_superuser
    ? [...commonItems, ...adminItems]
    : commonItems;

  const userLogout = () => {
    queryClient.clear();
    customSuccessToast("User logout successful");
    navigate({ to: "/login" });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold text-primary mb-5">
            QUINLY
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-2 p-2 rounded-md ${
                        isActive(item.url) ? "bg-black text-white" : ""
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.user.full_name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={userLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
