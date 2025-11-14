import * as React from "react";
import { Modal, View } from "react-native";

// Stub implementation using Modal
export function Sheet({ children, open, onOpenChange, ...props }: any) {
  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={() => onOpenChange?.(false)}>
      {children}
    </Modal>
  );
}

export function SheetTrigger({ children, ...props }: any) {
  return <>{children}</>;
}

export function SheetContent({ children, ...props }: any) {
  return <View>{children}</View>;
}

export function SheetHeader({ children, ...props }: any) {
  return <>{children}</>;
}

export function SheetTitle({ children, ...props }: any) {
  return <>{children}</>;
}

export function SheetDescription({ children, ...props }: any) {
  return <>{children}</>;
}

export function SheetFooter({ children, ...props }: any) {
  return <>{children}</>;
}
