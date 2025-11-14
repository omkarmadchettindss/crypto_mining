import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export function Accordion({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function AccordionItem({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function AccordionTrigger({ children, ...props }: any) {
  return <TouchableOpacity {...props}><Text>{children}</Text></TouchableOpacity>;
}

export function AccordionContent({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}
