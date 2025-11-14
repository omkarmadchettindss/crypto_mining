import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  style?: ViewStyle;
}

export function Separator({ orientation = "horizontal", style }: SeparatorProps) {
  return (
    <View
      style={[
        orientation === "horizontal" ? styles.horizontal : styles.vertical,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: "100%",
    backgroundColor: "#e5e7eb",
  },
  vertical: {
    width: 1,
    height: "100%",
    backgroundColor: "#e5e7eb",
  },
});
