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
import FlashMessage from "react-native-flash-message"; // Correctly import FlashMessage

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

      setTimeout(() => {
        setActiveTab("login");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  useEffect(() => {
    setError(null);
  }, [email, password, username]);

  return (
    <Background>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "login" && styles.activeTab]}
          onPress={() => setActiveTab("login")}
        >
          <Text
            style={
              activeTab === "login"
                ? styles.tabButtonText
                : styles.noActiveTabButtonText
            }
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "register" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("register")}
        >
          <Text
            style={
              activeTab === "register"
                ? styles.tabButtonText
                : styles.noActiveTabButtonText
            }
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        {activeTab === "register" && (
          <TextInput
            style={styles.input}
            label="User name"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
          />
        )}
        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity onPress={handleTogglePasswordVisibility}>
          <Text style={styles.togglePasswordText}>
            {showPassword ? "Hide" : "Show"} Password
          </Text>
        </TouchableOpacity>

        <Button
          disabled={email.length === 0 || password.length === 0}
          mode="contained"
          onPress={activeTab === "login" ? handleLogin : handleRegister}
          style={[
            styles.button,
            {
              backgroundColor:
                email.length && password.length > 0
                  ? theme.colors.red
                  : theme.colors.grey,
            },
          ]}
        >
          {activeTab === "login" ? "Login" : "Register"}
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Facebook />
          </TouchableOpacity>

          <TouchableOpacity>
            <Google />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.replace("ForgotPasswordScreen")}
      >
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>
      <FlashMessage position="top" style={{ marginBottom: 50 }}/>
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
  button: {
    margin: 20,
    backgroundColor: theme.colors.red,
  },
  forgot: {
    alignSelf: "center",
    marginTop: 20,
    color: theme.colors.secondary,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  togglePasswordText: {
    alignSelf: "flex-end",
    marginVertical: 10,
    color: theme.colors.primary,
  },
});

export default LoginScreen;
