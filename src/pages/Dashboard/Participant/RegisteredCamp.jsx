import ParticipantOrderDataRow from "@/components/Dashboard/TableRows/ParticipantOrderDataRow"

const RegisteredCamp = () => {
  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">My Registered Camps</h2>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Camp Image
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Camp Name
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Date & Time
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Location
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Healthcare Professional
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Fee
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Status
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <ParticipantOrderDataRow />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisteredCamp
