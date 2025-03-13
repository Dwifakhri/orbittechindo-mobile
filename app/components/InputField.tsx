import React from "react";
import { View, TextInput, TextInputProps } from "react-native";

interface InputProps {
  icon?: React.ReactNode;
  label: string;
  type?: "text" | "email" | "password" | "number";
  value: string;
  onChange: (value: string) => void;
}

export default function InputField({
  icon,
  label,
  type = "text",
  value,
  onChange,
}: InputProps) {
  const keyboardTypeMap: Record<string, TextInputProps["keyboardType"]> = {
    text: "default",
    email: "email-address",
    password: "default",
    number: "numeric",
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 10,
      }}
    >
      {icon && <View style={{ marginRight: 10 }}>{icon}</View>}

      <TextInput
        className="outline-none"
        value={value}
        placeholder={label}
        keyboardType={keyboardTypeMap[type] || "default"}
        style={{ flex: 1, paddingVertical: 0 }}
        onChangeText={onChange}
        secureTextEntry={type === "password"}
      />
    </View>
  );
}
