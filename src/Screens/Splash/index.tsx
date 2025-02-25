import React from "react";
import { Image, StyleSheet, View } from "react-native";
import IMAGES from "../../Assets/Images";
import COLORS from "../../Utilities/Colors";
import { hp } from "../../Utilities/Metrics";

const Splash = () => {
  return (
    <View style={styles.cont}>
      <Image
        source={IMAGES.splashLogo}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: COLORS.Red[500],
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: hp(45),
  },
});
