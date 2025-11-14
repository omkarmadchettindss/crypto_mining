import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

export interface AlertProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export interface AlertTitleProps {
  children?: React.ReactNode;
  className?: string;
  style?: TextStyle;
}

export interface AlertDescriptionProps {
  children?: React.ReactNode;
  className?: string;
  style?: TextStyle;
}

export function Alert({ children, style }: AlertProps) {
  return <View style={[styles.alert, style]}>{children}</View>;
}

export function AlertTitle({ children, style }: AlertTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function AlertDescription({ children, style }: AlertDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  alert: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
  },
});
