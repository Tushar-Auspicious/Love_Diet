import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import TabScreenHeader from "../../Components/TabScreenHeader";
import { DahboardProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";

const Dashboard: FC<DahboardProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.White }}>
      <TabScreenHeader
        title="Dahsboard"
        onPressMenu={() => {
          navigation.openDrawer();
        }}
        onPressNotification={() => navigation.navigate("notifications")}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
