import AdminStatistics from '@/components/Dashboard/Statistics/AdminStatistics';
import OrganizerStatistics from '@/components/Dashboard/Statistics/OrganizerStatistics';
import ParticipantStatistics from '@/components/Dashboard/Statistics/ParticipantStatistics';
import LoadingSpinner from '@/components/ui/Shared/LoadingSpinner';
import useRole from '@/hooks/useRole';
import React from 'react';

const Statistics = () => {
    const {role, roleLoading}= useRole()
     if(roleLoading) return <LoadingSpinner />

    return (
        <div>
      <h1>Welcome to Dashboard</h1>
      {role === 'admin' && <AdminStatistics />}

      {role === 'organizer' && <OrganizerStatistics />}

      {role === 'participant' && <ParticipantStatistics />}
    </div>
    );
};

export default Statistics;