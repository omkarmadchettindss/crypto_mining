import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export function Avatar({ children, ...props }: any) {
  return <View style={styles.avatar} {...props}>{children}</View>;
}

export function AvatarImage({ src, ...props }: any) {
  return <Image source={{ uri: src }} style={styles.image} {...props} />;
}

export function AvatarFallback({ children, ...props }: any) {
  return <Text style={styles.fallback} {...props}>{children}</Text>;
}

const styles = {
  avatar: { width: 40, height: 40, borderRadius: 20, overflow: "hidden" },
  image: { width: "100%", height: "100%" },
  fallback: { textAlign: "center", lineHeight: 40 },
};
