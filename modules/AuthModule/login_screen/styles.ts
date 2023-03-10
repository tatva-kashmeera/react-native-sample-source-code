import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { color } from "../../../theme/Color";
import Scale from "../../../utils/Scale";

export const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    backgroundColor: color.Color_F7F7F9,
  },
  scrollView: {
    flexGrow: 1,
  },
  parentView: {
    backgroundColor: color.Color_F7F7F9,
    justifyContent: "space-between",
    flex: 1,
  },
  upperView: {
    marginTop: Scale(64),
    paddingHorizontal: Scale(35),
    marginBottom: Scale(32),
  },
  heading: {
    fontSize: Scale(27),
    color: color.Color_25242A,
    marginTop: Scale(24),
    fontFamily: fonts.CabinetBold,
    lineHeight: Scale(35),
  },
  subHeader: {
    fontFamily: fonts.InterRegular,
    fontSize: Scale(15),
    color: color.Color_787878,
    lineHeight: Scale(23),
  },
  textInputView: {
    marginTop: Scale(36),
  },
  textInput: {
    borderBottomColor: color.Color_D8D8D8,
    borderBottomWidth: Scale(1),
    fontFamily: fonts.InterMedium,
    fontSize: Scale(16),
    color: color.Color_25242B,
    paddingBottom: Scale(18),
  },
  policyText: {
    fontFamily: fonts.InterRegular,
    fontSize: Scale(13),
    color: color.Color_747474,
    alignSelf: "center",
    lineHeight: Scale(23),
  },
  policyButton: {
    fontFamily: fonts.InterBold,
    fontSize: Scale(13),
    color: color.Color_414141,
    alignSelf: "center",
    lineHeight: Scale(23),
  },
  loginText: {
    fontFamily: fonts.InterMedium,
    fontSize: Scale(16),
    color: color.Color_817F7E,
    lineHeight: Scale(24),
  },
  loginButton: {
    fontFamily: fonts.InterMedium,
    fontSize: Scale(16),
    color: color.Color_25242B,
    alignSelf: "center",
    lineHeight: Scale(24),
  },
  horizontalView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: color.Color_FF0000,
    fontFamily: fonts.InterLight,
    fontSize: Scale(12),
  },
  forgotpassword: {
    fontFamily: fonts.InterMedium,
    fontSize: 14,
    lineHeight: 24,
    color: color.Color_25242B,
  },
  apiErrorText: {
    color: color.Color_FF0000,
    fontFamily: fonts.InterRegular,
    fontSize: Scale(14),
    marginTop: Scale(12),
  },
});
