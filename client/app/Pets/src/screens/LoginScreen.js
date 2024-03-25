import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Background from "../components/Background";
import { Button } from "react-native-paper";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { Text } from "react-native-paper";
import Facebook from "../components/loginWithSocialMedia/Facebook";
import Google from "../components/loginWithSocialMedia/Google";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

const LoginScreen = ({ navigation }) => {

  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  return (
    
    <Background>


      
      <Text style={styles.loginText}>登入</Text>
      
      

      <TextInput
        label='Email'
        returnKeyType='next'
        value={email}
        onChangeText={text => setEmail(text)}
        // error={!!email.error}
        // errorText={email.error}
        autoCapitalize='none'
        autoCompleteType='email'
        textContentType='emailAddress'
        keyboardType='email-address'
      />

      <TextInput
        label='密碼'
        returnKeyType='done'
        value={password}
        onChangeText={text => setPassword(text)}
        // error={!!password.error}
        // errorText={password.error}
        secureTextEntry
      />

      <Button style={styles.button} onPress={() => {login(email, password)}}>
        <Text style={styles.text}>登入</Text>
      </Button>
      <View style={styles.row}>
        <Text>還沒有張號? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>註冊</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.replace("ForgotPasswordScreen")}>
          <Text style={styles.forgot}>忘記密碼了</Text>
        </TouchableOpacity>
      </View>

      <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
        }}>
        
        <TouchableOpacity >
          <Facebook />
        </TouchableOpacity>

        <TouchableOpacity>
          <Google/>
        </TouchableOpacity>
        
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  button: {
    backgroundColor: "blue",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: theme.colors.white,
  },

  loginText: {
    fontSize: 50
  }
});

export default LoginScreen;
