import * as React from "react";
import { View } from "react-native";

export function Sidebar({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function SidebarTrigger({ children, ...props }: any) {
  return <>{children}</>;
}

export function SidebarContent({ children, ...props }: any) {
  return <View>{children}</View>;
}
