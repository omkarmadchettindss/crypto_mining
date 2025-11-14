import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({ children, variant = "default", style, textStyle }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  default: {
    backgroundColor: "#3b82f6",
  },
  secondary: {
    backgroundColor: "#6b7280",
  },
  destructive: {
    backgroundColor: "#ef4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
  },
});
