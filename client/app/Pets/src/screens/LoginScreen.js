// import React, { useState, useContext, createContext } from "react";
// import { TouchableOpacity, StyleSheet, View } from "react-native";
// import Background from "../components/Background";
// import { Button } from "react-native-paper";
// import Logo from "../components/Logo";
// import TextInput from "../components/TextInput";
// import { theme } from "../core/theme";
// import { Text } from "react-native-paper";
// import Facebook from "../components/loginWithSocialMedia/Facebook";
// import Google from "../components/loginWithSocialMedia/Google";
// import { AuthContext } from "../context/AuthContext";
// import Header from "../components/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { loginRequest } from "../redux/actions/authAction";

// const LoginScreen = ({ navigation }) => {

//   //const {login} = useContext(AuthContext);
//   const [email, setEmail] = useState('user@gmail.com');
//   const [password, setPassword] = useState('user');
//   const dispatch = useDispatch();
//   //const isLoading = useSelector((state) => state.auth.isLoading);
//   //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const handleLogin = async () => {
//     dispatch(loginRequest({ email, password }));
//   };

//   return (

//     <Background>
//       <View style={styles.tabsBar}>

//         <View>

//           <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
//             <Text >登入</Text>
//           </TouchableOpacity>
//         </View>

//         <View>

//           <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
//             <Text >登入</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       {/* <Text style={styles.loginText}>登入</Text> */}

//       <TextInput
//         label='電子郵件'
//         returnKeyType='next'
//         value={email}
//         onChangeText={text => setEmail(text)}
//         // error={!!email.error}
//         // errorText={email.error}
//         autoCapitalize='none'
//         autoCompleteType='email'
//         textContentType='emailAddress'
//         keyboardType='email-address'
//       />

//       <TextInput
//         label='密碼'
//         returnKeyType='done'
//         value={password}
//         onChangeText={text => setPassword(text)}
//         // error={!!password.error}
//         // errorText={password.error}
//         secureTextEntry={true}
//       />

//       <Button style={styles.button} onPress={handleLogin}>
//         <Text style={styles.text}>登入</Text>
//         {/* {isLoading && <ActivityIndicator />} */}

//       </Button>
//       <View style={styles.row}>
//         <Text>還沒有帳號? </Text>
//         <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
//           <Text style={styles.link}>註冊</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.row}>
//         <TouchableOpacity
//           onPress={() => navigation.replace("ForgotPasswordScreen")}>
//           <Text style={styles.forgot}>忘記密碼了</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           marginTop: 30,
//         }}>

//         <TouchableOpacity >
//           <Facebook />
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Google/>
//         </TouchableOpacity>

//       </View>
//     </Background>
//   );
// };

// const styles = StyleSheet.create({

//   tabsBar: {
//     flexDirection: "row",
//     borderWidth: 1,
//   },
//   forgotPassword: {
//     width: "100%",
//     alignItems: "flex-end",
//     marginBottom: 24,
//   },
//   row: {
//     flexDirection: "row",
//     marginTop: 10,
//   },
//   forgot: {
//     fontSize: 13,
//     color: theme.colors.secondary,
//   },
//   link: {
//     fontWeight: "bold",
//     color: theme.colors.primary,
//   },

//   button: {
//     backgroundColor: "blue",
//     width: "100%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   text: {
//     color: theme.colors.white,
//   },

//   loginText: {
//     fontSize: 50
//   }
// });

// export default LoginScreen;

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { loginRequest } from "../redux/actions/authAction";
import Facebook from "../components/loginWithSocialMedia/Facebook";
import Google from "../components/loginWithSocialMedia/Google";
const LoginScreen = ({ navigation }) => {
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

  const handleRegister = () => {
    //do something
    console.log("this is register");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  useEffect (() => {
    setError(null)
  }, [email, password])
  
  return (
    <Background>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "login" && styles.activeTab]}
          onPress={() => setActiveTab("login")}>
          <Text style= {activeTab === "login" ? styles.tabButtonText : styles.noActiveTabButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "register" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("register")}>
          <Text style= {activeTab === "register" ? styles.tabButtonText : styles.noActiveTabButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
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
        <TextInput
          style={styles.input}
          label='Password'
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
          mode='contained' 
          onPress={activeTab === "login" ? handleLogin : handleRegister} 
          style={[
            styles.button,
            {
              backgroundColor:
                email.length && password.length > 0 ? theme.colors.red : theme.colors.grey,
            },
          ]}>
          {activeTab === "login" ? "Login" : "Register"}
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <TouchableOpacity>
            <Facebook />
          </TouchableOpacity>

          <TouchableOpacity>
            <Google />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.replace("ForgotPasswordScreen")}>
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 20,
    borderColor: theme.colors.red
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
