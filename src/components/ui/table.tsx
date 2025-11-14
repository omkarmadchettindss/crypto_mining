import * as React from "react";
import { View, Text } from "react-native";

export function Table({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function TableHeader({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function TableBody({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function TableRow({ children, ...props }: any) {
  return <View style={{ flexDirection: "row" }} {...props}>{children}</View>;
}

export function TableHead({ children, ...props }: any) {
  return <Text style={{ fontWeight: "600" }} {...props}>{children}</Text>;
}

export function TableCell({ children, ...props }: any) {
  return <Text {...props}>{children}</Text>;
}
