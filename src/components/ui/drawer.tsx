import * as React from "react";
import { Modal, View } from "react-native";

export function Drawer({ children, open, onOpenChange, ...props }: any) {
  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={() => onOpenChange?.(false)}>
      {children}
    </Modal>
  );
}

export function DrawerTrigger({ children, ...props }: any) {
  return <>{children}</>;
}

export function DrawerContent({ children, ...props }: any) {
  return <View>{children}</View>;
}
