import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import COLORS from "../Utilities/Colors";

interface KeyboardAvoidingContainerProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
}

export function KeyboardAvoidingContainer({
  children,
  scrollEnabled = true,
}: KeyboardAvoidingContainerProps) {
  const Content = scrollEnabled ? ScrollView : View;
  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      }
    >
      <Content
        contentContainerStyle={
          scrollEnabled ? styles.scrollContent : styles.content
        }
        keyboardShouldPersistTaps="never"
      >
        {children}
      </Content>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});
