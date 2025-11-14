import * as React from "react";
import { View } from "react-native";

export function Resizable({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function ResizableHandle({ ...props }: any) {
  return <View {...props} />;
}

export function ResizablePanel({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function ResizablePanelGroup({ children, ...props }: any) {
  return <View style={{ flexDirection: "row" }} {...props}>{children}</View>;
}
