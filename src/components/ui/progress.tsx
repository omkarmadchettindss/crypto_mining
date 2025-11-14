import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface ProgressProps {
  value?: number;
  className?: string;
  style?: ViewStyle;
}

function Progress({ value = 0, style, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={[styles.track, { width: `${percentage}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  track: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 4,
  },
});

export { Progress };
