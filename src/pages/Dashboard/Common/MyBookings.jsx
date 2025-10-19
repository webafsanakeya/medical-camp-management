import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function MyBookings() {
  const { user } = useAuth();

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/registers/participant/${user.email}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load bookings");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-6">
        Failed to load your bookings.
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-primary">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You don’t have any booked camps yet.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-4 py-2 border-b">Camp Name</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Location</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition">
               <td className="px-4 py-2 border-b">{booking.campName}</td>
<td className="px-4 py-2 border-b">
  {new Date(booking.date).toLocaleDateString()}
</td>
<td className="px-4 py-2 border-b">{booking.location}</td>
<td className="px-4 py-2 border-b capitalize">
  {booking.paymentStatus || "unpaid"}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
