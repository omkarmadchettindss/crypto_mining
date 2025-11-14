import * as React from "react";
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from "react-native";

export interface TextareaProps extends TextInputProps {
  className?: string;
  style?: ViewStyle;
}

export function Textarea({ style, multiline = true, ...props }: TextareaProps) {
  return (
    <TextInput
      style={[styles.textarea, style]}
      multiline={multiline}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#ffffff",
  },
});
