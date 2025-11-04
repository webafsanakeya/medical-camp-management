
import LoadingSpinner from '@/components/ui/Shared/LoadingSpinner';
import useRole from '@/hooks/useRole';
import { Navigate } from 'react-router'



const OrganizerRoute = ({ children }) => {
 
  const [role, roleLoading] = useRole()

  console.log('I was here, in Seller Route');
 

  if (roleLoading) return <LoadingSpinner />
  if (role === 'organizer') return children
  return <Navigate to='/' replace='true' />
}

export default OrganizerRoute
