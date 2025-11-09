import { AuthContext } from "@/providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";



const useParticipantAnalytics = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["participant-analytics", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/participant-analytics?email=${user.email}`
            );
            return res.data;
        },
        // automatically refetch after 1 second to show updates after join
        refetchInterval: 1000,
    });
};

export default useParticipantAnalytics;