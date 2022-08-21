import { Navigate } from "react-router-dom";
import { AuthContext } from '../firebase/Auth';
import React, {useContext} from 'react';

const RequireAuth = ({ children }) => {
    // For valid users only
    const {currentUser} = useContext(AuthContext);
    if(!currentUser) {
        return (<Navigate to='/signin' replace/>);
    }
    return currentUser != null ? children : <Navigate to="/signin" replace />;
}

export default RequireAuth;