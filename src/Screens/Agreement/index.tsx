import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import TabScreenHeader from "../../Components/TabScreenHeader";
import COLORS from "../../Utilities/Colors";
import { AgreementProps } from "../../Typings/route";

const Agreement: FC<AgreementProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.White }}>
      <TabScreenHeader
        title="Agreement"
        onPressMenu={() => {
          navigation.openDrawer();
        }}
        onPressNotification={() => navigation.navigate("notifications")}
      />
    </View>
  );
};

export default Agreement;

const styles = StyleSheet.create({});
