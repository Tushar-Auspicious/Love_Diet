import { useIsFocused } from "@react-navigation/native";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  Animated,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import OnBoardingSlides, { SlideType } from "../../Seeds/OnBoardingSeeds";
import { OnBoardingScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import {
  deviceWidth,
  horizontalScale,
  hp,
  responsiveFontSize,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import styles from "./styles";

// Define the extra slide (for indicator purposes only)
const extraSlide: SlideType = {
  id: "extra-slide",
  image: ICONS.LovedHeartLogo, // Placeholder, not rendered
  title: "Ready to Start?",
  subtitle: "Choose your plan and join the journey!",
};

const OnBoarding: FC<OnBoardingScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const flatListRef = useRef<FlatList>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [layout, setLayout] = useState<null | { height: number }>();

  // Combine original slides with the extra slide
  const slidesWithExtra = [...OnBoardingSlides, extraSlide];

  // Animated value for smooth indicator transitions
  const indicatorAnimation = useRef(new Animated.Value(0)).current;

  const resetToSlide = (index: number) => {
    if (flatListRef.current) {
      const offset = index * deviceWidth;
      flatListRef.current.scrollToOffset({ offset, animated: false });
      setCurrentSlideIndex(index);
      indicatorAnimation.setValue(index); // Reset animation to the new index
    }
  };

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / deviceWidth);
    setCurrentSlideIndex(currentIndex);

    // Navigate and reset when reaching the extra slide
    if (currentIndex === slidesWithExtra.length - 1) {
      navigation.navigate("onBoardingPlans");
      // resetToSlide(0);
    }
  };

  // Smooth scroll handler using onScroll
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / deviceWidth);

    // Smoothly animate the indicator to the new position
    Animated.timing(indicatorAnimation, {
      toValue: newIndex,
      duration: 200, // Smooth transition duration
      useNativeDriver: true,
    }).start();

    // Update currentSlideIndex immediately for navigation logic
    setCurrentSlideIndex(newIndex);
  };

  const renderSlides = ({
    item,
    index,
  }: {
    item: SlideType;
    index: number;
  }) => {
    // Render an empty view for the extra slide to avoid showing it
    if (index === slidesWithExtra.length - 1) {
      return <View key={item.id + index} style={styles.slideContainer} />;
    }

    return (
      <View key={item.id + index} style={styles.slideContainer}>
        <CustomIcon Icon={item.image} height={hp(34.5)} width={wp(74.5)} />
        <View
          onLayout={(e) => {
            setLayout({
              height: e.nativeEvent.layout.y,
            });
          }}
          style={styles.slideTextCont}
        >
          <CustomText
            variant="lSemiBold"
            style={{
              textAlign: "center",
              fontSize: responsiveFontSize(24),
            }}
          >
            {item?.title}
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: horizontalScale(10),
            }}
          >
            <CustomIcon Icon={ICONS.LovedHeartLogo} height={56} width={56} />
            <CustomText
              variant="xsMedium"
              color={COLORS.Gray[500]}
              style={{ flex: 1 }}
            >
              {item?.subtitle}
            </CustomText>
          </View>
        </View>
      </View>
    );
  };

  const renderIndicators = useMemo(() => {
    return (
      layout?.height && (
        <View
          style={[
            styles.indicatorCont,
            {
              alignSelf: "center",
            },
          ]}
        >
          {slidesWithExtra.map((_, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.indicator,
                  index === currentSlideIndex && styles.indicatorActive,
                ]}
              />
            );
          })}
        </View>
      )
    );
  }, [layout, currentSlideIndex, indicatorAnimation]);

  useEffect(() => {
    if (isFocused) {
      resetToSlide(0);
    }
    return () => {};
  }, [isFocused]);

  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      style={[
        styles.container,
        {
          paddingBottom: verticalScale(10) + insets.bottom,
        },
      ]}
    >
      <FlatList
        ref={flatListRef}
        data={slidesWithExtra}
        onScroll={handleScroll}
        onMomentumScrollEnd={updateCurrentSlideIndex} // Keep for navigation logic
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        renderItem={renderSlides}
        scrollEventThrottle={16} // Update more frequently for smoothness
      />
      {renderIndicators}
    </SafeAreaView>
  );
};

export default OnBoarding;
