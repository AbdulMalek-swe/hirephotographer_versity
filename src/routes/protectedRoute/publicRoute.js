 
import {   useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
 
const PublicRoute = ({children}) => {
const [cookies] = useCookies(['access_token']);
  const token = cookies['access_token'];
   if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
};

export default PublicRoute;