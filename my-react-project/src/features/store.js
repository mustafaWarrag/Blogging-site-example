import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"

let store = configureStore({
    reducer:{
        info:userReducer
    }
});

export default store;