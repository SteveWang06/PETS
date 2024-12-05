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
import VerifyOtpModal from "../components/VerifyOtpModal";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // const handleLogin = async () => {
  //   try {
  //     await dispatch(loginRequest({ email, password }));
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

    const handleLogin = async () => {
      setIsLoading(true); // Hiển thị loader
      try {
        await dispatch(loginRequest({ email, password }));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false); // Ẩn loader
      }
    };

  // const handleRegister = async () => {
  //   try {
  //     await dispatch(registerRequest({ username, email, password }));
  //     showMessage({
  //       message: "Registration successful!",
  //       type: "success",
  //       floating: true,
  //       duration: 2000,
  //       autoHide: true,
  //     });
  //     setTimeout(() => setActiveTab("login"), 2000);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // const handleRegister = async () => {
  //   try {
  //     // Gửi yêu cầu đăng ký qua Redux action
  //     const response = await dispatch(
  //       registerRequest({ username, email, password })
  //     );

      

  //     if (response.success) {
  //       setIsModalVisible(true);

  //     } else {
  //       showMessage({
  //         message: response.message, // "Error: <chi tiết lỗi>"
  //         type: "danger",
  //       });
  //     }
  //   } catch (error) {
  //     // Xử lý lỗi trong trường hợp có sự cố
  //     showMessage({
  //       message: error.message || "An error occurred during registration.",
  //       type: "danger",
  //     });
  //   }
  // };

    const handleRegister = async () => {
      setIsLoading(true); // Hiển thị loader
      try {
        const response = await dispatch(
          registerRequest({ username, email, password })
        );
        if (response.success) {
          setIsModalVisible(true);
        } else {
          showMessage({
            message: response.message,
            type: "danger",
          });
        }
      } catch (error) {
        showMessage({
          message: error.message || "An error occurred during registration.",
          type: "danger",
        });
      } finally {
        setIsLoading(false); // Ẩn loader
      }
    };



  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setError(null);
  }, [email, password, username]);

  const handleOtpSubmit = (otp) => {
    showMessage({ message: "OTP verified successfully", type: "success" });
  };

  const generateRandomPassword = () => {
    const length = 12;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };


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
            onFocus={() => {
              if (activeTab === "register" && password.length === 0) {
                const randomPassword = generateRandomPassword();
                setPassword(randomPassword);
                
              }
            }}
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

        {/* <TouchableOpacity
          onPress={() => navigation.replace("ForgotPasswordScreen")}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity> */}

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

        {/* <View
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
        </View> */}
      </View>

      {/* Modal OTP */}
      <VerifyOtpModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleOtpSubmit}
        email={email}
      />

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
