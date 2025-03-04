import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import TabScreenHeader from "../../Components/TabScreenHeader";
import COLORS from "../../Utilities/Colors";
import { ProgressProps } from "../../Typings/route";

const Progress: FC<ProgressProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.White }}>
      <TabScreenHeader
        title="Progress"
        onPressMenu={() => {
          navigation.openDrawer();
        }}
        onPressNotification={() => navigation.navigate("notifications")}
      />
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({});
