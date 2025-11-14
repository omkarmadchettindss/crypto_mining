import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from "react-native";

export interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}

const buttonStyles = {
  default: {
    backgroundColor: "#3b82f6",
    borderWidth: 0,
  },
  destructive: {
    backgroundColor: "#ef4444",
    borderWidth: 0,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  secondary: {
    backgroundColor: "#6b7280",
    borderWidth: 0,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  link: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
};

const sizeStyles = {
  default: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32,
  },
  lg: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    minHeight: 40,
  },
  icon: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    minHeight: 36,
    minWidth: 36,
  },
};

const textColorStyles = {
  default: "#ffffff",
  destructive: "#ffffff",
  outline: "#ffffff",
  secondary: "#ffffff",
  ghost: "#ffffff",
  link: "#3b82f6",
};

export function Button({
  children,
  onPress,
  disabled = false,
  variant = "default",
  size = "default",
  style,
  textStyle,
  loading = false,
  ...props
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    buttonStyles[variant],
    sizeStyles[size],
    disabled && styles.disabled,
    style,
  ];

  const textColor = textColorStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyle}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {children}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.5,
  },
});

// Export buttonVariants for compatibility (not used in React Native but kept for type compatibility)
export const buttonVariants = {};
