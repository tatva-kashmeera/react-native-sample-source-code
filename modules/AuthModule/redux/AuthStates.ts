import { createSlice } from "@reduxjs/toolkit";
import {
  LoginType,
  LoginResType,
  LoginErrType,
  LogoutType,
} from "../types/LoginTypes";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    //signup states
    signUpData: {},
    signUpRes: {},
    signUpError: "",
    //Login states
    loginData: {},
    loginRes: {},
    loginError: "",
    //ForgotPassword states
    forgotData: {},
    forgotRes: {},
    //Set New Password states
    newPasswordData: {},
    newPasswordRes: {},
    //user detail get
    userDetail: {},
    //logout state
    logoutData: {},
  },

  reducers: {
    // login actions
    loginApiCall: (state, action: LoginType) => {
      state.loginData = action.payload;
      state.loginError = "";
    },
    loginApiCallSucess: (state, action: LoginResType) => {
      state.loginRes = action.payload;
      state.userDetail = action.payload.data.userDetails;
    },
    loginApiCallFailure: (state, action: LoginErrType) => {
      state.loginError = action.payload;
    },
    logoutAction: (state) => {
      state.signUpRes = {};
      state.loginRes = {};
    },
    
    //user detail
    setUserData: (state, action) => {
      state.userDetail = action.payload;
    },
    //login action
    logoutApiCall: (state, action: LogoutType) => {
      state.logoutData = action.payload;
    },
  },
});

export const {
  loginApiCall,
  loginApiCallSucess,
  loginApiCallFailure,
  logoutAction,
  setUserData,
  logoutApiCall,
} = authSlice.actions;

export default authSlice.reducer;
