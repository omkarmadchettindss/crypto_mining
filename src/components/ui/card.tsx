import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export interface CardHeaderProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export interface CardTitleProps {
  children?: React.ReactNode;
  className?: string;
  style?: TextStyle;
}

export interface CardDescriptionProps {
  children?: React.ReactNode;
  className?: string;
  style?: TextStyle;
}

export interface CardContentProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export interface CardFooterProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export interface CardActionProps {
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

function Card({ children, style, ...props }: CardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

function CardHeader({ children, style, ...props }: CardHeaderProps) {
  return (
    <View style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  );
}

function CardTitle({ children, style, ...props }: CardTitleProps) {
  return (
    <Text style={[styles.cardTitle, style]} {...props}>
      {children}
    </Text>
  );
}

function CardDescription({ children, style, ...props }: CardDescriptionProps) {
  return (
    <Text style={[styles.cardDescription, style]} {...props}>
      {children}
    </Text>
  );
}

function CardContent({ children, style, ...props }: CardContentProps) {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
}

function CardFooter({ children, style, ...props }: CardFooterProps) {
  return (
    <View style={[styles.cardFooter, style]} {...props}>
      {children}
    </View>
  );
}

function CardAction({ children, style, ...props }: CardActionProps) {
  return (
    <View style={[styles.cardAction, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  cardContent: {
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  cardAction: {
    marginLeft: "auto",
  },
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
