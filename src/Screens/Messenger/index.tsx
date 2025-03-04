import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import TabScreenHeader from "../../Components/TabScreenHeader";
import { MessengerProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";

const Messenger: FC<MessengerProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.White }}>
      <TabScreenHeader
        title="Messenger"
        onPressMenu={() => {
          navigation.openDrawer();
        }}
        onPressNotification={() => navigation.navigate("notifications")}
      />
    </View>
  );
};

export default Messenger;

const styles = StyleSheet.create({});
