import * as React from "react";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";

export interface ScrollAreaProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export function ScrollArea({ children, style, contentContainerStyle, ...props }: ScrollAreaProps) {
  return (
    <ScrollView
      style={[styles.scrollView, style]}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={true}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
