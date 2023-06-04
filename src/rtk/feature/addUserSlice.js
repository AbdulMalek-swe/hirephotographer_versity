import { createSlice } from "@reduxjs/toolkit";
const UserData = {
  email: "",
  firstName: "",
  lastName: "",
  role:"",
  imageURL:""
   
};
const addUserSlices = createSlice({
  name: "User",
  initialState: UserData,
  reducers: {
    addUser: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
      state.imageURL = action.payload.imageURL;
    },
    removeUser: (state, action) => {
      state.email = "";
      state.firstName =  "";
      state.lastName = "";
      state.role = "";
      state.imageURL = ""
    },
  },
});

export default addUserSlices.reducer;
export const addUserActions = addUserSlices.actions;