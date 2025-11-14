import * as React from "react";
import { TouchableOpacity, Text } from "react-native";

export function Toggle({ children, pressed, onPressedChange, ...props }: any) {
  return (
    <TouchableOpacity onPress={() => onPressedChange?.(!pressed)} {...props}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
