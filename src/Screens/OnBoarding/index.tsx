import { useIsFocused } from "@react-navigation/native";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
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

  const flatListRef = React.useRef<FlatList>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const [layout, setLayout] = useState<null | { height: number }>();

  // Combine original slides with the extra slide
  const slidesWithExtra = [...OnBoardingSlides, extraSlide];

  const resetToSlide = (index: number) => {
    if (flatListRef.current) {
      const offset = index * deviceWidth;
      flatListRef.current.scrollToOffset({ offset, animated: false });
      setCurrentSlideIndex(index);
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

  // const goToNextSlide = async () => {
  //   const nextSlideIndex = currentSlideIndex + 1;
  //   if (nextSlideIndex >= slidesWithExtra.length) {
  //     navigation.navigate("onBoardingPlans");
  //   } else {
  //     const offset = nextSlideIndex * deviceWidth;
  //     if (flatListRef.current) {
  //       flatListRef.current.scrollToOffset({ offset });
  //       setCurrentSlideIndex(nextSlideIndex);
  //     }
  //   }
  // };

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
          {slidesWithExtra.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      )
    );
  }, [layout, currentSlideIndex]);

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
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        renderItem={renderSlides}
      />
      {renderIndicators}
    </SafeAreaView>
  );
};

export default OnBoarding;
