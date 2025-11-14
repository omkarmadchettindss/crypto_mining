import * as React from "react";
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from "react-native";

export interface InputProps extends TextInputProps {
  className?: string;
  style?: ViewStyle;
}

function Input({ style, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 36,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#ffffff",
  },
});

export { Input };
