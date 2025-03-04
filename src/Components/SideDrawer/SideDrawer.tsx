import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React, { FC } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";

const SideDrawer: FC<DrawerContentComponentProps> = (props) => {
  const insets = useSafeAreaInsets();

  const renderTopButtons = (icon: any, title: string, onPress: () => void) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.topButton}>
        <CustomIcon Icon={icon} height={24} width={24} />
        <CustomText fontSize={14}>{title}</CustomText>
      </TouchableOpacity>
    );
  };

  const renderBars = (icon: any, title: string, onPress: () => void) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.bar}
      >
        <CustomIcon Icon={icon} height={24} width={24} />
        <CustomText style={styles.barText}>{title}</CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS === "android"
              ? verticalScale(16)
              : insets.top + verticalScale(16),
          paddingBottom:
            Platform.OS === "android"
              ? verticalScale(16)
              : insets.bottom + verticalScale(16),
        },
      ]}
    >
      <CustomText>HELLO SIDE DRAAWER</CustomText>
      {/* <CustomIcon
        onPress={() => props.navigation.closeDrawer()}
        Icon={ICONS.WhiteCrossIcon}
      /> */}
    </View>
  );
};

export default SideDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(16),
  },
  topButtonsContainer: {
    flexDirection: "row",
    gap: horizontalScale(10),
  },
  topButton: {
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(10),
    paddingVertical: verticalScale(24),
    flex: 1,
    borderRadius: 10,
  },
  barsContainer: {
    gap: verticalScale(10),
  },
  bar: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: verticalScale(10),
    gap: horizontalScale(10),
  },
  barText: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: horizontalScale(5),
    alignSelf: "center",
  },
});
