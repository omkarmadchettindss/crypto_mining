import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

export interface SelectProps {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  style?: any;
}

export interface SelectTriggerProps {
  children?: React.ReactNode;
  className?: string;
  style?: any;
}

export interface SelectContentProps {
  children?: React.ReactNode;
  className?: string;
  style?: any;
}

export interface SelectItemProps {
  children?: React.ReactNode;
  value: string;
  className?: string;
  style?: any;
}

export function Select({ children, value, onValueChange }: SelectProps) {
  return <>{children}</>;
}

export function SelectTrigger({ children }: SelectTriggerProps) {
  return <>{children}</>;
}

export function SelectContent({ children }: SelectContentProps) {
  return <>{children}</>;
}

export function SelectItem({ children, value, onValueChange }: SelectItemProps) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <Text>{placeholder}</Text>;
}
