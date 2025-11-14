import * as React from "react";
import { View } from "react-native";

export function AspectRatio({ children, ratio, ...props }: any) {
  return <View {...props}>{children}</View>;
}
