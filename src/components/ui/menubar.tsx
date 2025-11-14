import * as React from "react";
import { View } from "react-native";

export function Menubar({ children, ...props }: any) {
  return <View style={{ flexDirection: "row" }} {...props}>{children}</View>;
}

export function MenubarTrigger({ children, ...props }: any) {
  return <>{children}</>;
}

export function MenubarContent({ children, ...props }: any) {
  return <View>{children}</View>;
}

export function MenubarItem({ children, ...props }: any) {
  return <>{children}</>;
}
