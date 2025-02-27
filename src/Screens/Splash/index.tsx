import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import IMAGES from "../../Assets/Images";
import COLORS from "../../Utilities/Colors";
import { hp } from "../../Utilities/Metrics";

const Splash = () => {
  const [showFirstImage, setShowFirstImage] = useState(true);

  useEffect(() => {
    // Set up interval to toggle between images every 2 seconds
    const interval = setInterval(() => {
      setShowFirstImage((prev) => !prev);
    }, 1000); // Change every 2 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.cont}>
      {showFirstImage ? (
        <Image
          source={IMAGES.splashLogo}
          resizeMode="contain"
          style={styles.image}
        />
      ) : (
        <Image
          source={IMAGES.splashLogo2 || IMAGES.splashLogo} // Use splashLogo2 if exists, otherwise reuse splashLogo
          resizeMode="contain"
          style={styles.image}
        />
      )}
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
