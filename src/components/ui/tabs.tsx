import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface TabsProps {
  children?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  style?: any;
}

export interface TabsListProps {
  children?: React.ReactNode;
  className?: string;
  style?: any;
}

export interface TabsTriggerProps {
  children?: React.ReactNode;
  value: string;
  className?: string;
  style?: any;
}

export interface TabsContentProps {
  children?: React.ReactNode;
  value: string;
  className?: string;
  style?: any;
}

export function Tabs({ children, value, onValueChange }: TabsProps) {
  return <View>{children}</View>;
}

export function TabsList({ children }: TabsListProps) {
  return <View style={styles.list}>{children}</View>;
}

export function TabsTrigger({ children, value, onValueChange }: TabsTriggerProps) {
  return (
    <TouchableOpacity onPress={() => onValueChange?.(value)} style={styles.trigger}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

export function TabsContent({ children, value }: TabsContentProps) {
  return <View>{children}</View>;
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
  },
  trigger: {
    padding: 8,
  },
});
