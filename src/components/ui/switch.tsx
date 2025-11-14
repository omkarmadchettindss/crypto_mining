import * as React from "react";
import { Switch as RNSwitch, StyleSheet } from "react-native";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: any;
}

export function Switch({ checked, onCheckedChange, disabled, style }: SwitchProps) {
  return (
    <RNSwitch
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
      thumbColor="#ffffff"
      style={style}
    />
  );
}
