import * as React from "react";
import { View, TextInput } from "react-native";

export function Command({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function CommandInput({ ...props }: any) {
  return <TextInput {...props} />;
}

export function CommandList({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function CommandItem({ children, ...props }: any) {
  return <>{children}</>;
}
