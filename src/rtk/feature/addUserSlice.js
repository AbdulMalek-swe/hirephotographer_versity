import { createSlice } from "@reduxjs/toolkit";
const UserData = {
  email: "",
  firstName: "",
  lastName: "",
  role:""
   
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
    },
    removeUser: (state, action) => {
      state.email = "";
      state.firstName =  "";
      state.lastName = "";
      state.role = "";
    },
  },
});

export default addUserSlices.reducer;
export const addUserActions = addUserSlices.actions;