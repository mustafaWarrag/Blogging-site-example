import { createSlice } from "@reduxjs/toolkit";

let initial = {
    username:null,
    token:null
}
let userReducer = createSlice({
    name:"info",
    initialState:initial,
    reducers:{
        setUser(state, action) {
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        logout(state) {
            state.username = null;
            state.token = null
        }
    }
})

export const {setUser, logout} = userReducer.actions //the actions are generated automatically from the reducers in order to be used in dispatch
export default userReducer.reducer //the reducer(singular) is all of our reducers combined into one to modify the state