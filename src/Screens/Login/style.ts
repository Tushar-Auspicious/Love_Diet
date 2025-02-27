import { StyleSheet } from "react-native";
import {
  horizontalScale,
  hp,
  isAndroid,
  responsiveFontSize,
  verticalScale,
} from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    justifyContent: "center",
  },
  rbSheetWrapper: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  rbSheetDraggableIcon: {},
  rbSheetContainer: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(10),
    height: hp(90),
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    justifyContent: "space-between",
  },
  headerContainer: {
    paddingVertical: verticalScale(10),
    width: "100%",
    gap: verticalScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  formContainer: {
    gap: verticalScale(10),
  },
  phoneInput: {
    width: "100%",
  },
  buttonContainer: {},
  secondaryButton: {
    borderColor: COLORS.Red[500],
    borderWidth: 1,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: horizontalScale(10),
    marginVertical: verticalScale(10),
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(16),
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.Gray[300],
  },
  focusedInput: {
    borderColor: COLORS.Red[300], // Change this to your preferred focus color
    borderWidth: 2,
  },
  resendcode: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});


export default styles