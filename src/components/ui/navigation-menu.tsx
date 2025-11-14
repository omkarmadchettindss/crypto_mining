import * as React from "react";
import { View } from "react-native";

export function NavigationMenu({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function NavigationMenuList({ children, ...props }: any) {
  return <View style={{ flexDirection: "row" }} {...props}>{children}</View>;
}

export function NavigationMenuItem({ children, ...props }: any) {
  return <>{children}</>;
}

export function NavigationMenuTrigger({ children, ...props }: any) {
  return <>{children}</>;
}

export function NavigationMenuContent({ children, ...props }: any) {
  return <View>{children}</View>;
}
