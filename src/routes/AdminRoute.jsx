
import LoadingSpinner from '@/components/ui/Shared/LoadingSpinner';
import useRole from '@/hooks/useRole';
import { Navigate, useLocation } from 'react-router'



const AdminRoute = ({ children }) => {
 
  const [role, isRoleLoading] = useRole()
   console.log('I was here, in Admin Route');

  const location = useLocation()
  console.log(location);
 
 

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/' replace='true'/>
}

export default AdminRoute