import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { horizontalScale, verticalScale } from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";
import ICONS from "../Assets/Icons";
import { CustomText } from "./CustomText";
import COLORS from "../Utilities/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabScreenHeaderProps = {
  title: string;
  onPressMenu: () => void;
  onPressNotification: () => void;
};

const TabScreenHeader: FC<TabScreenHeaderProps> = ({
  title,
  onPressMenu,
  onPressNotification,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: horizontalScale(16),
        paddingTop: verticalScale(16) + insets.top,
        paddingBottom: verticalScale(16),
        backgroundColor: COLORS.Red[500],
      }}
    >
      <CustomIcon
        onPress={onPressMenu}
        Icon={ICONS.HamburgerMenuIcon}
        height={24}
        width={24}
      />
      <CustomText color={COLORS.White} variant="xlSemiBold">
        {title}
      </CustomText>
      <CustomIcon
        onPress={onPressNotification}
        Icon={ICONS.NotificationBell}
        height={24}
        width={24}
      />
    </View>
  );
};

export default TabScreenHeader;

const styles = StyleSheet.create({});
