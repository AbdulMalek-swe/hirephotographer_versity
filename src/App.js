import axios from "apiService/axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { RouterProvider, useNavigate } from "react-router-dom";
import route from "routes/Route";
import { addUserActions } from "rtk/feature/addUserSlice";
import store from "rtk/store/store";

 
function App() {
  const [, , removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate()
  useEffect(()=>{
     async function userProfile(){
      try{
        const profile = await   axios.get("/user/detail")
          console.log(profile.data);
        // .then(res=>{
           store.dispatch(addUserActions.addUser(profile?.data?.user));
        // })
      }
      catch{
        removeCookie("access_token", { path: "/" });
        // navigate("/")
      }
      
     }
   
    userProfile()
   },[navigate,removeCookie])
  return (
    <div >
      
     <RouterProvider router={route}/>
    </div>
  );
}

export default App;
