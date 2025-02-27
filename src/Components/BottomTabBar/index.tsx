import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { FC, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { CustomText } from "../CustomText";

const BottomTabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets(); // Get safe area insets for dynamic padding adjustment
  const [blurViewHeight, setBlurViewHeight] = useState(89);

  // Dynamically render the appropriate icon for each tab based on its route name and focus state
  const renderIcon = (routeName: string, isFocused: boolean) => {
    // const icons: Record<string, any> = {
    //   homeTab: isFocused ? ICONS.SolidHomeIcon : ICONS.HomeIcon,
    //   datingTab: isFocused ? ICONS.SolidDatingIcon : ICONS.DatingIcon,
    //   eventsTab: isFocused ? ICONS.SolidEventIcon : ICONS.EventIcon,
    //   messagesTab: isFocused ? ICONS.SolidMessagesIcon : ICONS.MessagesIcon,
    //   profileTab: isFocused ? ICONS.SolidProfileIcon : ICONS.ProfileIcon,
    // };

    // return icons[routeName] || null; // Return the corresponding icon or null if not found
    return null; // Return the corresponding icon or null if not found
  };

  // Handle tab press events, including navigation and preventing default behavior if necessary
  const handlePress = (
    routeKey: string,
    routeName: string,
    isFocused: boolean
  ) => {
    const event = navigation.emit({
      type: "tabPress",
      target: routeKey,
      canPreventDefault: true, // Allow preventing navigation on tab press
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName); // Navigate to the selected tab
    }
  };

  return (
    <View
      onLayout={(e) => {
        setBlurViewHeight(e.nativeEvent.layout.height);
      }}
      style={[
        styles.tabContainer,
        {
          paddingBottom: insets.bottom,
          paddingTop: verticalScale(15),
          position: "absolute",
          bottom: 0,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]; // Get route options
        const label = options.tabBarLabel || options.title || route.name; // Determine the label for the tab
        const isFocused = state.index === index; // Check if the current tab is focused

        return (
          <Pressable
            key={route.key} // Unique key for each tab
            onPress={() => handlePress(route.key, route.name, isFocused)} // Handle tab press
            onLongPress={
              () => navigation.emit({ type: "tabLongPress", target: route.key }) // Emit long press event
            }
            accessibilityState={isFocused ? { selected: true } : {}} // Set accessibility state for the selected tab
            accessibilityLabel={options.tabBarAccessibilityLabel} // Add accessibility label
            style={styles.tabButton} // Style for the tab button
          >
            {/* Render the tab icon */}
            {/* <CustomIcon
              Icon={renderIcon(route.name, isFocused)}
              height={24}
              width={24}
            /> */}
            {/* Render the tab label */}
            <CustomText
              fontSize={10}
              color={isFocused ? COLORS.Gray[500] : COLORS.Red[500]} // Dynamic text color based on focus state
            >
              {label as string} {/* Display the label */}
            </CustomText>
          </Pressable>
        );
      })}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row", // Arrange tabs in a row
  },
  tabButton: {
    flex: 1, // Equal space for each tab
    alignItems: "center", // Center-align content horizontally
    justifyContent: "center", // Center-align content vertically
    gap: verticalScale(8), // Space between icon and label
    zIndex: 20,
  },
  icon: {
    width: horizontalScale(20), // Icon width
    height: verticalScale(20), // Icon height
  },
});
