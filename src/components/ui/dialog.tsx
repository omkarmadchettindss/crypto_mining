import * as React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { X } from "lucide-react-native";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export interface DialogContentProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  hideClose?: boolean;
}

export interface DialogHeaderProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export interface DialogTitleProps {
  children?: React.ReactNode;
  className?: string;
  style?: TextStyle;
}

export interface DialogDescriptionProps {
  children?: React.ReactNode;
  className?: string;
  style?: TextStyle;
}

export interface DialogFooterProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <Modal
      visible={open || false}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      {children}
    </Modal>
  );
}

function DialogContent({ children, style, hideClose, ...props }: DialogContentProps & { onRequestClose?: () => void }) {
  const handleClose = () => {
    if (props.onRequestClose) {
      props.onRequestClose();
    }
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity 
        style={styles.overlayTouchable}
        activeOpacity={1}
        onPress={handleClose}
      />
      <View style={[styles.content, style]}>
        {!hideClose && (
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <X size={16} color="#6b7280" />
          </TouchableOpacity>
        )}
        {children}
      </View>
    </View>
  );
}

function DialogHeader({ children, style, ...props }: DialogHeaderProps) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

function DialogTitle({ children, style, ...props }: DialogTitleProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

function DialogDescription({ children, style, ...props }: DialogDescriptionProps) {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
}

function DialogFooter({ children, style, ...props }: DialogFooterProps) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative",
  },
  overlayTouchable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
});

// Stub exports for compatibility
function DialogTrigger({ children, ...props }: any) {
  return <>{children}</>;
}

function DialogClose({ children, ...props }: any) {
  return <>{children}</>;
}

function DialogPortal({ children, ...props }: any) {
  return <>{children}</>;
}

function DialogOverlay({ ...props }: any) {
  return null;
}

export {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogClose,
};
