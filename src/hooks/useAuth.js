import { AuthContext } from '../providers/AuthProvider'
import  { useContext } from 'react';

const UseAuth = () => {
    const auth = useContext(AuthContext)
    return auth
};

export default UseAuth;