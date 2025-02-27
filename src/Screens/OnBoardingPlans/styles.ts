import { StyleSheet } from "react-native";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Red[500],
  },
  safeAreaCont: {
    flex: 1,
    paddingTop: verticalScale(23),
    alignItems: "center",
    gap: verticalScale(50),
  },
  scrollCont: {},
  splashLogo: {
    height: hp(30),
  },
  topFeatureList: {
    width: wp(91.5),
    rowGap: verticalScale(10),
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  planColumnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: horizontalScale(10),
    paddingVertical: 20,
    width: wp(91.5),
  },
  planCard: {
    backgroundColor: COLORS.White,
    alignItems: "center",
    justifyContent: "center",
    gap: horizontalScale(5),
    flex: 1,
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    height: hp(22),
    borderWidth: 3,
    borderColor: COLORS.White, // Default border
  },
  selectedPlanBorder: {
    borderColor: COLORS.DarkBlue, // Blue border when selected
  },
  popularBadge: {
    backgroundColor: COLORS.DarkBlue,
    width: "90%",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: verticalScale(4),
    position: "absolute",
    top: verticalScale(5),
  },
  popularBadgeText: {
    textAlign: "center",
  },
  priceContainer: {
    alignItems: "center",
  },
  strikethroughPrice: {
    textDecorationLine: "line-through",
  },
  freeTrialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 8,
    paddingVertical: verticalScale(5),
    gap: horizontalScale(10),
    borderColor: "transparent", // Default border
  },
  reviewsContainer: {
    width: wp(91.5),
    gap: verticalScale(10),
  },
  reviewCard: {
    backgroundColor: "#C3032D",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    width: wp(91.5),
    gap: verticalScale(20),
    justifyContent: "space-between",
    borderRadius: 8,
    marginHorizontal: horizontalScale(5),
  },
  unlockFeaturesContainer: {
    width: wp(91.5),
    gap: verticalScale(20),
    alignItems: "center",
  },
  footer: {
    gap: verticalScale(20),
    width: wp(91.5),
    alignItems: "center",
  },
  loginLink: {
    flexDirection: "row",
    justifyContent: "center",
  },

  paginationContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: verticalScale(10),
  },
  dot: {
    width: horizontalScale(8),
    height: horizontalScale(8),
    borderRadius: 4,
    marginHorizontal: horizontalScale(4),
  },
});

export default styles;
