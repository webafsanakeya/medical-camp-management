import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo = {}, // will contain { role, status, ... }
    isLoading: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/role/${user?.email}`);
      return data;
    },
  });

  const roleLoading = authLoading || isRoleLoading;

  return {
    role: userInfo.role || "participant",
    status: userInfo.status || "",
    roleLoading,
    refetch,
  };
};

export default useRole;