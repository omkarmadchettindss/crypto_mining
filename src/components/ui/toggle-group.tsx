import * as React from "react";
import { View } from "react-native";

export function ToggleGroup({ children, value, onValueChange, ...props }: any) {
  return <View style={{ flexDirection: "row" }} {...props}>{children}</View>;
}

export function ToggleGroupItem({ children, value, ...props }: any) {
  return <>{children}</>;
}
