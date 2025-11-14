import * as React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: any;
}

export function Checkbox({ checked, onCheckedChange, disabled, style }: CheckboxProps) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onCheckedChange?.(!checked)}
      disabled={disabled}
      style={[styles.checkbox, checked && styles.checked, disabled && styles.disabled, style]}
      activeOpacity={0.7}
    >
      {checked && <Check size={16} color="#ffffff" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  checked: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  disabled: {
    opacity: 0.5,
  },
});
