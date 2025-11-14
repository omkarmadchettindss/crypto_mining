import * as React from "react";
import { View } from "react-native";

export function Chart({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function ChartContainer({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}
