import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../components/InputField";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, useRouter } from "expo-router";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const { user, login } = useAuth();
  const route = useRouter();
  if (user) {
    return <Redirect href="/" />;
  }
  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    if (email === "test@example.com" && password === "password") {
      login(email);
      route.push("/");
    } else {
      Alert.alert("Error", "Invalid email or password.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Login
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <Text style={{ marginBottom: 10 }}>
                Hint : test@example.com - password
              </Text>
              <View style={{ marginBottom: 10 }}>
                <InputField
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange("email")}
                />
                {touched.email && errors.email && (
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {errors?.email}
                  </Text>
                )}
              </View>

              <InputField
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
              />
              {touched.password && errors.password && (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {errors.password}
                </Text>
              )}

              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{
                  backgroundColor: "#1481EE",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
