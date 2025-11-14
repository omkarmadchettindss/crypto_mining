import * as React from "react";
import { View, TouchableOpacity } from "react-native";

export function RadioGroup({ children, value, onValueChange, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function RadioGroupItem({ children, value, ...props }: any) {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
}
