import { StyleSheet } from "react-native";
import {
  horizontalScale,
  hp,
  responsiveFontSize,
  verticalScale,
  wp,
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
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: verticalScale(10),
    width: "100%",
    gap: verticalScale(20),
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  formContainer: {
    gap: verticalScale(10),
    flex: 1,
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
  countrySearchContainer: {
    flex: 1,
    gap: verticalScale(10),
  },
  countryList: {
    flex: 1,
  },
  countryListContent: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    rowGap: verticalScale(8),
  },
  countryItem: {
    flexDirection: "row",
    gap: horizontalScale(10),
    alignItems: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 10,
  },
  genderItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 8,
  },
});

export default styles;
