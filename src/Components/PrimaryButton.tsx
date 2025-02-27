import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import COLORS from "../Utilities/Colors";
import { horizontalScale, verticalScale, wp } from "../Utilities/Metrics";
import { CustomText } from "./CustomText";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
  textSize?: number;
  isFullWidth?: boolean;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  backgroundColor = COLORS.Red[500],
  disabled = false,
  textColor = COLORS.White,
  style,
  textSize = 16,
  isFullWidth = true,
}) => {
  const color = disabled ? COLORS.Gray[300] : textColor;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        isFullWidth && styles.button,
        {
          backgroundColor: disabled ? COLORS.Gray[100] : backgroundColor,
        },
        style,
      ]}
      onPress={onPress}
    >
      <CustomText variant="mSemiBold" color={color}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: verticalScale(5),
    width: wp(91.5),
    alignSelf: "center",
    height: 50,
  },
});

export default PrimaryButton;
