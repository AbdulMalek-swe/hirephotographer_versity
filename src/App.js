import axios from "apiService/axios";
 
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import route from "routes/Route";
import { addUserActions } from "rtk/feature/addUserSlice";
import store from "rtk/store/store";

 
function App() {
  const [, , removeCookie] = useCookies(["access_token"]);
 
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
   },[ removeCookie])
   console.log("object" ,"is coming");
  return (
    <div >
      
     <RouterProvider router={route}/>
    </div>
  );
}

export default App;
