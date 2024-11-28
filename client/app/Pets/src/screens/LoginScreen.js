import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { loginRequest, registerRequest } from "../redux/actions/authAction";
import Facebook from "../components/loginWithSocialMedia/Facebook";
import Google from "../components/loginWithSocialMedia/Google";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  

  const handleLogin = async () => {
    try {
      await dispatch(loginRequest({ email, password }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await dispatch(registerRequest({ username, email, password }));
      showMessage({
        message: "Registration successful!",
        type: "success",
        floating: true,
        duration: 2000,
        autoHide: true,
      });
      setTimeout(() => setActiveTab("login"), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setError(null);
  }, [email, password, username]);

  // const signInWithGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     Alert.alert("Đăng nhập thành công!", JSON.stringify(userInfo));
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       Alert.alert("Bạn đã hủy đăng nhập.");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       Alert.alert("Đang xử lý, vui lòng chờ.");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       Alert.alert("Dịch vụ Google Play không khả dụng.");
  //     } else {
  //       Alert.alert("Đăng nhập thất bại.", error.message);
  //     }
  //   }
  // };

  return (
    <Background>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "login" && styles.activeTab]}
          onPress={() => setActiveTab("login")}>
          <Text
            style={
              activeTab === "login"
                ? styles.tabButtonText
                : styles.noActiveTabButtonText
            }>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "register" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("register")}>
          <Text
            style={
              activeTab === "register"
                ? styles.tabButtonText
                : styles.noActiveTabButtonText
            }>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        {/* Conditionally render fields for the login or register tab */}
        {activeTab === "register" && (
          <TextInput
            style={styles.input}
            label='User name'
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize='none'
          />
        )}
        <TextInput
          style={styles.input}
          label='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize='none'
          autoCompleteType='email'
          textContentType='emailAddress'
          keyboardType='email-address'
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            label='Password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={handleTogglePasswordVisibility}
            style={styles.icon}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          onPress={() => navigation.replace("ForgotPasswordScreen")}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={activeTab === "login" ? handleLogin : handleRegister}
          disabled={email.length === 0 || password.length === 0}
          style={[
            styles.customButton,
            {
              backgroundColor:
                email.length > 0 && password.length > 0
                  ? theme.colors.red
                  : theme.colors.grey,
            },
          ]}>
          <Text style={styles.buttonText}>
            {activeTab === "login" ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}>
          <TouchableOpacity>
            <Facebook />
          </TouchableOpacity>
          <TouchableOpacity>
            <Google />
          </TouchableOpacity>
        </View>
      </View>

      <FlashMessage position='top' style={{ marginBottom: 50 }} />
    </Background>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 20,
    borderColor: theme.colors.red,
  },
  tabButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  activeTab: {
    backgroundColor: theme.colors.red,
  },
  tabButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  noActiveTabButtonText: {
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 10,
    padding: 5,
  },
  button: {
    margin: 20,
    //backgroundColor: theme.colors.red,
  },
  forgot: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    color: theme.colors.secondary,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  customButton: {
    padding: 10,
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
