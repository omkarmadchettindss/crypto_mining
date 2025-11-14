import * as React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

export interface LabelProps {
  children?: React.ReactNode;
  className?: string;
  style?: TextStyle;
}

export function Label({ children, style, ...props }: LabelProps) {
  return (
    <Text style={[styles.label, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
});
