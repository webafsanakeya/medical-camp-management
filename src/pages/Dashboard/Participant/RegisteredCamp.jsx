import ParticipantRegisterDataRow from "@/components/Dashboard/TableRows/ParticipantRegisterDataRow";
import LoadingSpinner from "@/components/ui/Shared/LoadingSpinner";
import useAuth from "@/hooks/useAuth"
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const RegisteredCamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

    const {
    data: registers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registers", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/registers/participant/${user?.email}`
      );
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">My Registered Camps</h2>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
  <tr>
    <th className="px-5 py-3 bg-white border-b border-gray-200">Camp Image</th>
    <th className="px-5 py-3 bg-white border-b border-gray-200">Camp Name</th>
    <th className="px-5 py-3 bg-white border-b border-gray-200">Participant Count</th>
    <th className="px-5 py-3 bg-white border-b border-gray-200">Fees</th>
    <th className="px-5 py-3 bg-white border-b border-gray-200">Status</th>
    <th className="px-5 py-3 bg-white border-b border-gray-200">Action</th>
    <th className="px-5 py-3 bg-white border-b border-gray-200">Feedback</th> 
  </tr>
</thead>
              <tbody>
                {registers.map(register => <ParticipantRegisterDataRow key={register._id} register={register} refetch={refetch}/>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisteredCamp
