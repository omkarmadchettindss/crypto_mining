import * as React from "react";
import { View } from "react-native";

// Stub exports for form components
export function Form({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function FormField({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function FormItem({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function FormLabel({ children, ...props }: any) {
  return <>{children}</>;
}

export function FormControl({ children, ...props }: any) {
  return <>{children}</>;
}

export function FormDescription({ children, ...props }: any) {
  return <>{children}</>;
}

export function FormMessage({ children, ...props }: any) {
  return <>{children}</>;
}
