import React, { FC, useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import StarRating from "react-native-star-rating-widget";
import FONTS from "../../Assets/fonts";
import ICONS from "../../Assets/Icons";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import PrimaryButton from "../../Components/PrimaryButton";
import {
    planLit,
    PlanReviews,
    topList,
    UnlockFeatures,
} from "../../Seeds/OnBoardingPlansSeed";
import { OnBoardingPlansScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import {
    horizontalScale,
    hp,
    verticalScale,
    wp,
} from "../../Utilities/Metrics";

const OnBoardingPlans: FC<OnBoardingPlansScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [isFreeWeekPlanselected, setIsFreeWeekPlanselected] = useState(false);

  const renderTopFeatureList = () => {
    return (
      <View style={styles.topFeatureList}>
        {topList.map((item, index) => (
          <View key={item + index.toString()} style={styles.featureItem}>
            <CustomIcon Icon={ICONS.GreenOk} height={24} width={24} />
            <CustomText variant="sMedium" color={COLORS.White}>
              {item}
            </CustomText>
          </View>
        ))}
      </View>
    );
  };

  const renderPlans = () => {
    return (
      <View>
        <CustomText variant="xlSemiBold" color={COLORS.White}>
          Select your Plan
        </CustomText>
        <View style={styles.planColumnWrapper}>
          {planLit.map((item, index) => (
            <View
              style={[
                styles.planCard,
                { top: index === 1 ? -10 : 0 }, // Adjusting position for center plan
              ]}
            >
              {index === 1 && (
                <View style={styles.popularBadge}>
                  <CustomText
                    color={COLORS.White}
                    fontSize={10}
                    fontWeight={600}
                    style={styles.popularBadgeText}
                  >
                    Most Popular
                  </CustomText>
                </View>
              )}
              <CustomText variant="lBold" color={COLORS.Black}>
                {item.title}
              </CustomText>
              <View style={styles.priceContainer}>
                <CustomText
                  color={COLORS.Red[500]}
                  fontSize={14}
                  fontWeight={"800"}
                  style={styles.strikethroughPrice}
                >
                  {item.price}
                </CustomText>
                <CustomText variant="xlSemiBold" color={COLORS.Black}>
                  {item.discountedPrice}
                </CustomText>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsFreeWeekPlanselected(!isFreeWeekPlanselected)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 3,
            borderRadius: 8,
            paddingVertical: verticalScale(5),
            gap: horizontalScale(10),
            borderColor: isFreeWeekPlanselected
              ? COLORS.White
              : COLORS.Red[300],
          }}
        >
          {isFreeWeekPlanselected && (
            <CustomIcon Icon={ICONS.GreenOk} height={24} width={24} />
          )}
          <CustomText
            variant="mSemiBold"
            style={{ textAlign: "center" }}
            color={COLORS.White}
          >
            OR START 1 WEEK FREE TRIAL
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderReviews = () => {
    return (
      <View style={styles.reviewsContainer}>
        <CustomText variant="xlSemiBold" color={COLORS.White}>
          Words from Our Users
        </CustomText>
        <FlatList
          data={PlanReviews}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            columnGap: horizontalScale(10),
          }}
          renderItem={({ item, index }) => (
            <View
              style={{
                backgroundColor: "#C3032D",
                paddingVertical: verticalScale(12),
                paddingHorizontal: horizontalScale(12),
                width: wp(80),
                gap: verticalScale(20),
                justifyContent: "space-between",
                borderRadius: 8,
              }}
            >
              <CustomText variant="sSemiBold" color={COLORS.White}>
                {item.title}
              </CustomText>
              <CustomText variant="xsRegular" color={COLORS.White}>
                {item.review}
              </CustomText>

              <View>
                <CustomText
                  style={{ fontFamily: FONTS.italic }}
                  variant="xsRegular"
                  color={COLORS.White}
                >
                  {item.author}
                </CustomText>
                <StarRating
                  starSize={20}
                  rating={item.rating}
                  onChange={() => {}}
                />
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  const renderUnlockFearures = () => {
    return (
      <View style={styles.unlockFeaturesContainer}>
        <CustomText variant="xlSemiBold" color={COLORS.White}>
          Unlock Features
        </CustomText>
        <View style={styles.topFeatureList}>
          {UnlockFeatures.map((item, index) => (
            <View key={item + index.toString()} style={styles.featureItem}>
              <CustomIcon Icon={ICONS.GreenOk} height={24} width={24} />
              <CustomText variant="sMedium" color={COLORS.White}>
                {item}
              </CustomText>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <PrimaryButton
          title="Continue"
          onPress={() => navigation.navigate("signUp")}
          disabled={!isFreeWeekPlanselected}
          backgroundColor={COLORS.White}
          textColor={COLORS.Red[500]}
        />
        <View style={styles.loginLink}>
          <CustomText
            fontWeight={600}
            style={{ textAlign: "center" }}
            color={COLORS.White}
          >
            Already have an account?{"  "}
          </CustomText>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("logIn")}
          >
            <CustomText
              fontWeight={600}
              style={{ textAlign: "center" }}
              color={COLORS.White}
            >
              Log In
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollCont}>
        <SafeAreaView
          style={[
            styles.safeAreaCont,
            {
              paddingBottom: verticalScale(30) + insets.bottom,
            },
          ]}
        >
          <Image
            source={IMAGES.splashLogo}
            style={styles.splashLogo}
            resizeMode="contain"
          />
          {renderTopFeatureList()}
          {renderPlans()}
          {renderReviews()}
          {renderUnlockFearures()}
          {renderPlans()}
          {renderFooter()}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default OnBoardingPlans;

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
  planContainer: {
    width: wp(91.5),
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
  },
  popularBadge: {
    backgroundColor: "#002060",
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
  reviewsContainer: {
    width: wp(91.5),
    gap: verticalScale(10),
  },
  unlockFeaturesContainer: {
    width: wp(91.5),
    gap: verticalScale(10),
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
});
