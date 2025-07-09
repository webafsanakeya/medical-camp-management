import LoadingSpinner from '@/components/ui/Shared/LoadingSpinner';
import UseAuth from '@/hooks/UseAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = UseAuth();
    const location = useLocation

    if(loading) return <LoadingSpinner />
    if(user) return children
    return <Navigate to='/login' state={{from: location}} replace='true'></Navigate>
};

export default PrivateRoute;