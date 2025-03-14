import { dashboardStats } from "@/apis/chatApis";
import Header from "@/components/Header";
import Notifications from "@/components/Notifications";
import { LoginResponse } from "@/interfaces/authInterface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, User } from "lucide-react";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const user: LoginResponse | undefined = queryClient.getQueryData(["user"]);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: dashboardStats,
    staleTime: 0,
    refetchOnMount: true,
    enabled: !!user?.access && !!user?.user?.is_superuser,
  });

  return (
    <div>
      <Notifications />
      {user?.user.is_superuser && !isLoading && (
        <div>
          <Header name="Stats" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded shadow-xl p-5 flex items-center justify-center space-x-6">
              <User size={40} />
              <div>
                <p className="font-bold mt-3 text-lg">TOTAL USERS</p>
                <p className="text-lg">{stats?.users}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded shadow-xl p-5 flex items-center justify-center space-x-6">
              <Inbox size={40} />
              <div>
                <p className="font-bold mt-3 text-lg">TOTAL CONVERSATIONS</p>
                <p className="text-lg">{stats?.chats}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
