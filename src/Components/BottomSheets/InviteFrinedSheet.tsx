import React, { forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { RBSheetRef } from "../../Typings/type";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { CustomText } from "../CustomText";

interface InviteFrinedSheetProps {}

const InviteFrinedSheet = forwardRef<RBSheetRef, InviteFrinedSheetProps>(
  (props, ref) => {
    const {} = props;

    // Ensure the ref is typed correctly for RBSheetRef
    const sheetRef = ref as React.MutableRefObject<RBSheetRef | null>;

    return (
      <RBSheet
        ref={ref}
        useNativeDriver={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          draggableIcon: {
            backgroundColor: COLORS.Gray[500],
          },
          container: {
            backgroundColor: COLORS.White,
            paddingHorizontal: horizontalScale(16),
            paddingBottom: verticalScale(10),
            height: "auto",
          },
        }}
        draggable
        dragOnContent
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <View
          style={{
            paddingVertical: verticalScale(10),
            width: "100%",
            gap: verticalScale(20),
          }}
        >
          <CustomText>Select who can see your post</CustomText>
        </View>
      </RBSheet>
    );
  }
);

export default InviteFrinedSheet;

const styles = StyleSheet.create({});
