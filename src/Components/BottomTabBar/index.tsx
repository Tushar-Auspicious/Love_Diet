import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { FC, useCallback, useRef } from "react";
import {
  Animated,
  FlatList,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ICONS from "../../Assets/Icons";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";

type Tab = {
  name: string;
  icon: any;
  activIcon: any;
  route: string;
};

const tabs: Tab[] = [
  {
    name: "Dashboard",
    icon: ICONS.DashboardIcon,
    activIcon: ICONS.DahsboardFill,
    route: "dashboard",
  },
  {
    name: "Agreement",
    icon: ICONS.AgreementIcon,
    activIcon: ICONS.AgreementFill,
    route: "aggrement",
  },
  {
    name: "Invite Friends",
    icon: ICONS.InviteFriendIcon,
    activIcon: ICONS.InviteFriendIcon,
    route: "",
  },
  {
    name: "Progress",
    icon: ICONS.ProgressIcon,
    activIcon: ICONS.ProgressFill,
    route: "progress",
  },

  {
    name: "Messenger",
    icon: ICONS.MessengerIcon,
    activIcon: ICONS.MessengerFill,
    route: "messenger",
  },
];

const BottomTabBar: FC<BottomTabBarProps> = (props) => {
  const insets = useSafeAreaInsets();
  const { state, navigation, descriptors } = props;
  const currentRoute = state.routes[state.index].name;

  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleTabPress = useCallback(
    (tab: Tab) => {
      if (currentRoute !== tab.route) {
        navigation.navigate(tab.route as never);
      }
    },
    [navigation, currentRoute]
  );

  const renderTab = useCallback(
    ({ item, index }: { item: Tab; index: number }) => {
      const isActive = currentRoute === item.route;

      return (
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress(item)}
          activeOpacity={0.7}
        >
          {item.name !== "Invite Friends" && (
            <CustomIcon
              Icon={isActive ? item.activIcon : item.icon}
              height={20}
              width={20}
            />
          )}
          <CustomText
            fontSize={11}
            fontWeight={isActive ? "500" : "400"}
            style={{
              alignSelf: "flex-end",
            }}
            color={isActive ? COLORS.Black : COLORS.Gray[400]}
          >
            {item.name}
          </CustomText>
        </TouchableOpacity>
      );
    },
    [handleTabPress, currentRoute, scaleValue]
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        <FlatList
          data={tabs}
          renderItem={renderTab}
          keyExtractor={(item) => item.route}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[
            styles.tabBar,
            {
              paddingBottom: insets.bottom,
            },
          ]}
          contentContainerStyle={styles.tabContent}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          Share.share({ title: "Share", message: "Hellow World", url: "" })
        }
        style={[
          styles.middleButton,
          {
            bottom: verticalScale(40) + insets.bottom,
          },
        ]}
        activeOpacity={0.7}
      >
        <CustomIcon Icon={ICONS.InviteFriendIcon} height={28} width={28} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.White,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(15),
  },
  tabWrapper: {
    flex: 1,
    marginHorizontal: horizontalScale(10),
  },
  tabBar: {
    paddingTop: verticalScale(5),
  },
  tabContent: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 99,
    gap: verticalScale(5),
  },

  middleButton: {
    position: "absolute",
    backgroundColor: COLORS.Red[500],
    borderRadius: 30,
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1001, // Ensure it’s above the tab bar
    boxShadow: "0px 4px 12px 0px #FF003B80",
  },
});
