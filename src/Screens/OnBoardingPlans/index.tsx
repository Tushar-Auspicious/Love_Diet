import React, { FC, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
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
import styles from "./styles";

const OnBoardingPlans: FC<OnBoardingPlansScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / wp(90)); // Adjust width based on item size
    setActiveIndex(index);
  };

  // State to track the selected plan (null, plan index, or "free" for free trial)
  const [selectedPlan, setSelectedPlan] = useState<number | "free" | null>(
    null
  );

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
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setSelectedPlan(index)}
              style={[
                styles.planCard,
                { top: index === 1 ? -10 : 0 },
                selectedPlan === index && styles.selectedPlanBorder, // Blue border for selected plan
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
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedPlan("free")}
          style={[
            styles.freeTrialButton,
            selectedPlan === "free" && styles.selectedPlanBorder, // Blue border for free trial
          ]}
        >
          {selectedPlan === "free" && (
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
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={wp(90) + horizontalScale(10)} // Ensure spacing between slides
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
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
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {PlanReviews.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === activeIndex ? COLORS.DarkBlue : COLORS.White,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderUnlockFeatures = () => {
    return (
      <View style={styles.unlockFeaturesContainer}>
        <CustomText
          variant="xlSemiBold"
          color={COLORS.White}
          style={{ alignSelf: "flex-start" }}
        >
          Unlock Features
        </CustomText>

        <CustomIcon Icon={ICONS.UnLockFeature} height={hp(16)} width={wp(90)} />
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
          disabled={selectedPlan === null} // Enable only if a plan is selected
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
          {renderUnlockFeatures()}
          {renderPlans()}
          {renderFooter()}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default OnBoardingPlans;
