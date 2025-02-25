import React, { FC, useMemo, useState } from "react";
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
import PrimaryButton from "../../Components/PrimaryButton";
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

const OnBoarding: FC<OnBoardingScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const flatListRef = React.useRef<FlatList>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const [layout, setLayout] = useState<null | { height: number }>();

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / deviceWidth);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = async () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex === OnBoardingSlides.length) {
      navigation.navigate("onBoardingPlans");
    } else {
      const offset = nextSlideIndex * deviceWidth;

      if (flatListRef.current) {
        flatListRef?.current.scrollToOffset({ offset });
        setCurrentSlideIndex(nextSlideIndex);
      }
    }
  };

  const renderSlides = ({
    item,
    index,
  }: {
    item: SlideType;
    index: number;
  }) => {
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
          {OnBoardingSlides.map((_, index) => (
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
        data={OnBoardingSlides}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        renderItem={renderSlides}
      />
      {renderIndicators}
      <PrimaryButton
        title="Continue"
        onPress={goToNextSlide}
        style={{ marginTop: verticalScale(20) }}
      />
    </SafeAreaView>
  );
};

export default OnBoarding;
