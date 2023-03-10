import { call, put, takeEvery, StrictEffect, all } from "redux-saga/effects";
import { loginService } from "../services/index";
import {
  loginApiCallFailure,
  loginApiCallSucess,
  logoutAction,
  setUserData,
} from "../redux/AuthStates";
import {
  LOGIN_URL,
  apiTypes,
  LOGOUT_URL,
} from "../utils/ApiURLs";
import {
  LoginType,
  LoginRes,
  LogoutType,
  LogoutRes,
} from "../types/LoginTypes";
import { strings } from "../utils/String";
import * as NavigationService from "../services/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../../utils/constants";
import {
  setUserDetails,
  doLogOut,
  isTokenExpired,
  callRenewTokenApi,
} from "../utils/Common";
import Toast from "react-native-toast-message";
import {
  getStateAndCityApiCall,
  clearOnBoardingIds,
} from "../redux/OnBoardingStates";
import { hideLoader, showLoader } from "../redux/LoaderStates";
import { getAllReactionsApiCall } from "../redux/PostStates";
import _ from "lodash";

//Login API call and implementation as per the requirement
function* loginApiCall(data: LoginType) {
  yield put(showLoader());
  try {
    const res: LoginRes = yield call(() =>
      loginService(apiTypes.POST, LOGIN_URL, data.payload)
    );
    if (_.isEqual(res.statusCode, "OK") && res.data) {
      yield put(loginApiCallSucess(res));
      setUserDetails(res.data.userDetails);
      // let getIdsofQuestions: allIdsData = {};
      (async () => {
        await AsyncStorage.setItem(constants.APP_INSTALLED, "true");
        await AsyncStorage.setItem(constants.LOGGED_IN, "true");
        //@ts-ignore
      })();
      yield put(setUserData(res.data.userDetails));
      yield put(getStateAndCityApiCall());
      yield put(getAllReactionsApiCall());
      NavigationService.replace("bottomTabs", { screen: "home" });
    } else {
      yield put(loginApiCallFailure(res.message));
    }
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: strings.ErrorMessage,
    });
  }
  yield put(hideLoader());
}

//logout Api call
function* logoutApiCall(data: LogoutType) {
  yield put(showLoader());
  const tokenExpired: boolean = yield call(() => isTokenExpired());
  if (tokenExpired) {
    const toeknRefreshed: boolean = yield call(() => callRenewTokenApi());
    if (toeknRefreshed) {
      yield call(() => {
        logoutApiCall(data);
      });
    }
  } else {
    try {
      const res: LogoutRes = yield call(() =>
        loginService(apiTypes.POST, LOGOUT_URL, data.payload)
      );
      if (res.statusCode === "OK") {
        doLogOut();
        yield put(logoutAction());
        yield put(clearOnBoardingIds());
        NavigationService.reset();
      } else {
        Toast.show({
          type: "error",
          text1: res.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: strings.ErrorMessage,
      });
    }
  }
  yield put(hideLoader());
}

function* authSaga(): Generator<StrictEffect> {
  yield all([
    takeEvery("auth/loginApiCall", loginApiCall),
    takeEvery("auth/logoutApiCall", logoutApiCall),
  ]);
}

export default authSaga;
