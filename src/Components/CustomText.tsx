// src/Components/CustomText.js

import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import COLORS from "../Utilities/Colors";
import Typography from "../Utilities/Typography";
import { responsiveFontSize } from "../Utilities/Metrics";

export type CustomTextProps = TextProps & {
  variant?: keyof typeof Typography; // Optional variant from Typography
  color?: string; // Optional custom color
  fontSize?: number; // Optional custom font size
  fontWeight?: TextStyle["fontWeight"]; // Optional custom font weight (e.g., 'bold', '400', 'normal')
};

export function CustomText({
  style,
  variant, // Optional variant
  color = COLORS.Black, // Default text color
  fontSize, // Custom font size
  fontWeight, // Custom font weight
  ...rest
}: CustomTextProps) {
  // Determine the base style based on variant or custom props
  let textStyle: TextStyle = {};

  if (variant && Typography[variant]) {
    // Use the variant from Typography if provided
    textStyle = Typography[variant] as TextStyle;
  } else {
    // If no variant is provided, use custom fontSize, fontWeight, and Poppins fontFamily
    textStyle = {
      fontSize: responsiveFontSize(fontSize || 16), // Default to 16 if no fontSize provided
      fontWeight: fontWeight, // Default to "normal" if no fontWeight provided
      fontFamily: "Poppins", // Use Poppins font for custom text
    };
  }

  // Combine the base style with color and any additional styles
  return <Text style={[textStyle, { color }, style]} {...rest} />;
}
