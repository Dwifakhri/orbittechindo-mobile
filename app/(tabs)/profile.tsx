import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();
  return (
    <View
      className="flex-1 bg-white"
      style={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <Text>Hi {user}</Text>
      <Button title="Logout" onPress={logout} color="red" />
    </View>
  );
};
export default Profile;
