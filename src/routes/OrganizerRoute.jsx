
import LoadingSpinner from '@/components/ui/Shared/LoadingSpinner';
import useRole from '@/hooks/useRole';
import { Navigate } from 'react-router'



const OrganizerRoute = ({ children }) => {
 
  const [role, isRoleLoading] = useRole()

  console.log('I was here, in Seller Route');
 

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'organizer') return children
  return <Navigate to='/' replace='true' />
}

export default OrganizerRoute
