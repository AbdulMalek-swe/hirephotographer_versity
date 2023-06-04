 
import {   useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

 
 
const ProtectedRoute = ({children}) => {
const [cookies] = useCookies(['access_token']);
  const token = cookies['access_token'];
   if (!token || token==undefined) {
      return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;