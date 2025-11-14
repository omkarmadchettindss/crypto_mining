import * as React from "react";
import { View, TouchableOpacity } from "react-native";

export function Collapsible({ children, open, ...props }: any) {
  return open ? <View {...props}>{children}</View> : null;
}

export function CollapsibleTrigger({ children, ...props }: any) {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
}

export function CollapsibleContent({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}
