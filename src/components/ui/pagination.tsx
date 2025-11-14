import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export function Pagination({ children, ...props }: any) {
  return <View style={{ flexDirection: "row" }} {...props}>{children}</View>;
}

export function PaginationContent({ children, ...props }: any) {
  return <View style={{ flexDirection: "row" }} {...props}>{children}</View>;
}

export function PaginationItem({ children, ...props }: any) {
  return <TouchableOpacity {...props}><Text>{children}</Text></TouchableOpacity>;
}

export function PaginationPrevious({ children, ...props }: any) {
  return <TouchableOpacity {...props}><Text>{children || "Previous"}</Text></TouchableOpacity>;
}

export function PaginationNext({ children, ...props }: any) {
  return <TouchableOpacity {...props}><Text>{children || "Next"}</Text></TouchableOpacity>;
}
