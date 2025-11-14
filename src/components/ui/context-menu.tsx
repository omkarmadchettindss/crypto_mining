import * as React from "react";
import { View } from "react-native";

export function ContextMenu({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function ContextMenuTrigger({ children, ...props }: any) {
  return <>{children}</>;
}

export function ContextMenuContent({ children, ...props }: any) {
  return <View>{children}</View>;
}

export function ContextMenuItem({ children, ...props }: any) {
  return <>{children}</>;
}
