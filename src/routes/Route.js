 
import Home from "pages/HOme/Home";
 
import AppLayout from "./Layout/AppLayout";
import Register from "pages/User/Signup";
import Login from "pages/User/Login";
import PublicRoute from "./protectedRoute/publicRoute";
 
 
const { createBrowserRouter } = require("react-router-dom");
 
const route = createBrowserRouter([
     {
       path:"/",
       element:<AppLayout/>,
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
          path:"/login",
          element: <PublicRoute><Login/></PublicRoute> 
     }
])
export default route;