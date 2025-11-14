import * as React from "react";

// Toast notification stub - for full implementation, use react-native-toast-message or similar
export function Toaster({ ...props }: any) {
  return null;
}

export function toast(message: string, options?: any) {
  console.log("Toast:", message, options);
}
