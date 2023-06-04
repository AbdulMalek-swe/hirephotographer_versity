 
import Home from "pages/HOme/Home";
 
import AppLayout from "./Layout/AppLayout";
import Register from "pages/User/Signup";
import Login from "pages/User/Login";
import PublicRoute from "./protectedRoute/publicRoute";
import RegisterPhotographer from "pages/Photographer/RegisterPhotographer";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import Contact from "pages/Contact/Contact";
import Error from "Componants/Error/Error";
import PhotoUpload from "pages/User/PhotoUpload";
 
 
const { createBrowserRouter } = require("react-router-dom");
 
const route = createBrowserRouter([
     {
       path:"/",
       element:<AppLayout/>,
       errorElement:<Error/>,
       children:[
          {
               path:"/",
               element:<Home/>
          }
          
       ]
     },
     {
          path:"/sign",
          element:  <PublicRoute> <Register/></PublicRoute>  
     },
     {
      path:"/upload",
      element:<PhotoUpload/>
     },
     {
          path:"/login",
          element: <PublicRoute><Login/></PublicRoute> 
     },
     {
          path:"/join/photographer",
          element: <ProtectedRoute><RegisterPhotographer/></ProtectedRoute>  
     },
     {
          path:"/contact",
          element:<Contact/>
     }
])
export default route;