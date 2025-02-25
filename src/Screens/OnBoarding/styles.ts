import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  isAndroid,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    justifyContent: "center",
  },

  slideContainer: {
    width: wp(100),
    alignItems: "center",
    justifyContent: "center",
  },

  slideTextCont: {
    gap: verticalScale(15),
    width: wp(90),
    alignSelf: "center",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(20),
    borderRadius: 10,
    boxShadow: "-2px 20px 50px -10px #585C6214",
  },

  indicatorCont: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: verticalScale(10),
    gap: horizontalScale(10),
    paddingBottom: isAndroid ? verticalScale(30) : 0,
  },

  indicator: {
    height: verticalScale(8),
    width: verticalScale(8),
    backgroundColor: COLORS.Gray[300],
    borderRadius: 100,
  },

  indicatorActive: {
    backgroundColor: COLORS.Red[500],
  },
});

export default styles;
