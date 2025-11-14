import * as React from "react";
import { TextInput, View } from "react-native";

export function InputOTP({ children, ...props }: any) {
  return <View style={{ flexDirection: "row" }}>{children}</View>;
}

export function InputOTPGroup({ children, ...props }: any) {
  return <View style={{ flexDirection: "row" }} {...props}>{children}</View>;
}

export function InputOTPSlot({ ...props }: any) {
  return <TextInput style={{ width: 40, height: 40, borderWidth: 1, textAlign: "center" }} {...props} />;
}
