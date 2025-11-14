import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface SliderProps {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  style?: ViewStyle;
}

// Simple stub - for full implementation, use @react-native-community/slider
export function Slider({ value = [0], onValueChange, min = 0, max = 100, style }: SliderProps) {
  return <View style={[styles.slider, style]} />;
}

const styles = StyleSheet.create({
  slider: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
  },
});
