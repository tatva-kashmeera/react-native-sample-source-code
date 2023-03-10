import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavigationParamlist } from "../../../navigation/NavigationRoutes";
import { getDeviceId, getModel } from "react-native-device-info";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../components/customButton";
import CustomStatusBar from "../../components/customStatusbar";
import { checkConnection } from "../../utils/Common";
import { constants } from "../../utils/constants";
import { crashLyticsLog } from "../../services/CrashlyticsService";
import Scale from "../../utils/Scale";
import { strings } from "../../utils/String";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../../theme/Color";
import { loginApiCall } from "../redux/AuthStates";
import {
  requestUserPermission,
  notificationListeners,
} from "../../services/NotificationServices";
import { validateEmail, validateName } from "../../utils/Validations";
import { styles } from "./styles";
import GREENRECTANGLEBOTTOM from "../../assets/svg/greenRectangleBottom.svg";

type authScreenNavigationType =
  NativeStackNavigationProp<AuthNavigationParamlist>;

const LoginScreen = () => {
  const navigation = useNavigation<authScreenNavigationType>();

  //@ts-ignore
  const loginError = useSelector((state: string) => state.auth.loginError);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState<String>("");
  const [emailErr, setEmailErr] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [passwordErr, setPasswordErr] = useState<String>("");
  const [loginBtnEnable, setLoginBtnEnable] = useState<Boolean>(false);

  useEffect(() => {
    if (isFocused) {
      setEmail("");
      setPassword("");
    }
    crashLyticsLog("Login page");
    checkConnection();
    requestUserPermission();
    notificationListeners();
  }, [isFocused]);

  //forgot password text press
  const handleForgotPwdPress = () => navigation.navigate("forgotPassword");

  //login button press
  const handleLoginButtonPress = async () => {
    const internet = await checkConnection();
    //@ts-ignore
    emailRef.current.blur();
    //@ts-ignore
    passwordRef.current.blur();
    const fcmPermissionAllowed = await requestUserPermission();
    if (fcmPermissionAllowed && internet) {
      dispatch(
        loginApiCall({
          email: email.toString(),
          password: password.toString(),
          fcmToken: (await AsyncStorage.getItem(constants.FCM_TOKEN)) ?? "",
          deviceName: Platform.OS === "ios" ? getDeviceId() : getModel(),
          platform: Platform.OS === "android" ? 1 : 2,
        })
      );
    }
  };

  //go to signup text press
  const handleSignUpTextPress = () => navigation.navigate("signup");

  const handlePrivacyPolicyPress = () => navigation.navigate("privacyPolicy");

  const handleTNCPress = () => navigation.navigate("termsOfService");

  return (
    <View style={styles.outerView}>
      <CustomStatusBar backgroundColor={color.Color_F7F7F9} />
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <KeyboardAvoidingView
          style={styles.parentView}
          behavior="height"
          enabled
        >
          <View style={styles.upperView}>
            <GREENRECTANGLEBOTTOM height={Scale(59)} width={Scale(59)} />
            <Text style={styles.heading}>{strings.logInHeading}</Text>
            <Text style={styles.subHeader}>{strings.logInSubHeader}</Text>
            <View style={styles.textInputView}>
              <TextInput
                ref={emailRef}
                placeholder={strings.loginEmailHolder}
                placeholderTextColor={color.Color_787878}
                value={email.toString()}
                autoCapitalize="none"
                style={styles.textInput}
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  setEmail(text);
                  if (!validateEmail(text)) {
                    setEmailErr(strings.emailError);
                    setLoginBtnEnable(false);
                  } else {
                    setEmailErr("");
                    setLoginBtnEnable(password && !passwordErr);
                  }
                }}
                onBlur={() => {
                  if (!validateEmail(email)) {
                    setEmailErr(strings.emailError);
                    setLoginBtnEnable(false);
                  } else {
                    setEmailErr("");
                    setLoginBtnEnable(password && !passwordErr);
                  }
                }}
              />
            </View>
            {emailErr && <Text style={styles.error}>{emailErr}</Text>}

            <View style={styles.textInputView}>
              <TextInput
                ref={passwordRef}
                placeholder={strings.loginPasswordHolder}
                placeholderTextColor={color.Color_787878}
                value={password.toString()}
                style={styles.textInput}
                maxLength={30}
                secureTextEntry
                onChangeText={(text) => {
                  setPassword(text);
                  if (!validateName(text)) {
                    setPasswordErr(strings.emptyPasswordError);
                    setLoginBtnEnable(false);
                  } else {
                    setPasswordErr("");
                    setLoginBtnEnable(text.length > 0 && email && !emailErr);
                  }
                }}
                onBlur={() => {
                  if (!validateName(password)) {
                    setPasswordErr(strings.emptyPasswordError);
                    setLoginBtnEnable(false);
                  } else {
                    setPasswordErr("");
                    setLoginBtnEnable(password && email && !emailErr);
                  }
                }}
              />
            </View>
            {passwordErr && <Text style={styles.error}>{passwordErr}</Text>}
            <TouchableOpacity onPress={handleForgotPwdPress}>
              <Text style={styles.forgotpassword}>{strings.fogotPassword}</Text>
            </TouchableOpacity>
            <Text style={styles.apiErrorText}>{loginError}</Text>
          </View>
          <View style={{ marginTop: Scale(64) }}>
            <Text style={styles.policyText}>{strings.policyStaticText}</Text>
            <View style={[styles.horizontalView, { marginBottom: Scale(24) }]}>
              <TouchableOpacity onPress={handlePrivacyPolicyPress}>
                <Text style={styles.policyButton}>{strings.privacyPolicy}</Text>
              </TouchableOpacity>
              <Text style={styles.policyText}>{strings.and}</Text>
              <TouchableOpacity onPress={handleTNCPress}>
                <Text style={styles.policyButton}>{strings.TNC}</Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              text={strings.logIn}
              isDisable={!loginBtnEnable}
              onPress={handleLoginButtonPress}
            />
            <View
              style={[styles.horizontalView, { marginVertical: Scale(26) }]}
            >
              <Text style={styles.loginText}>{strings.didNotHaveaccount}</Text>
              <TouchableOpacity onPress={handleSignUpTextPress}>
                <Text style={styles.loginButton}>{strings.signUp}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
