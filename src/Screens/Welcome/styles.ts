import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { hp } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: hp(45),
  },
  buttonContainer: {},
  secondaryButton: {
    borderColor: COLORS.Red[500],
    borderWidth: 1,
  },
});

export default styles;
