import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface SkeletonProps {
  className?: string;
  style?: ViewStyle;
}

export function Skeleton({ style }: SkeletonProps) {
  return <View style={[styles.skeleton, style]} />;
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    height: 20,
  },
});
