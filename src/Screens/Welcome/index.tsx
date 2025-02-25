import React, { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import IMAGES from "../../Assets/Images";
import PrimaryButton from "../../Components/PrimaryButton";
import COLORS from "../../Utilities/Colors";
import { hp, isAndroid, verticalScale } from "../../Utilities/Metrics";
import { WelcomeScreenProps } from "../../Typings/route";

const Welcome: FC<WelcomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    navigation.navigate("onBoarding");
  };

  const handleLogin = () => {
    navigation.navigate("logIn");
  };

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
      <View style={styles.logoContainer}>
        <Image
          source={IMAGES.welcomeLogo}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Continue" onPress={handleContinue} isFullWidth />
        <PrimaryButton
          title="Log In"
          onPress={handleLogin}
          isFullWidth
          backgroundColor={COLORS.White}
          textColor={COLORS.Red[500]}
          style={styles.secondaryButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

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
