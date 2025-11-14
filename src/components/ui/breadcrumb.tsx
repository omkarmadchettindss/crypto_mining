import * as React from "react";
import { View, Text } from "react-native";

export function Breadcrumb({ children, ...props }: any) {
  return <View style={{ flexDirection: "row" }} {...props}>{children}</View>;
}

export function BreadcrumbItem({ children, ...props }: any) {
  return <>{children}</>;
}

export function BreadcrumbLink({ children, ...props }: any) {
  return <Text {...props}>{children}</Text>;
}

export function BreadcrumbSeparator({ ...props }: any) {
  return <Text {...props}>/</Text>;
}
