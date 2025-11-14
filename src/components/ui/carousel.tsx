import * as React from "react";
import { ScrollView, View } from "react-native";

export function Carousel({ children, ...props }: any) {
  return <ScrollView horizontal {...props}>{children}</ScrollView>;
}

export function CarouselContent({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function CarouselItem({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}
