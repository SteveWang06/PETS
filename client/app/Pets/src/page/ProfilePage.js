import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  LayoutAnimation,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-native-paper";
import SearchComponent from "../components/Search";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Container } from "../components/Wrappers";
import i18next from 'i18next'
const languages = [
  { code: "en", label: "English" },
  { code: "zh_tw", label: "中文" },
];

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  const [showLanguagesList, setOpenLanguagesList] = useState(false);
  const { t } = useTranslation();
  //const { i18next } = useTranslation();


  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
  };
  
  return (
    <View>
      

      <View style={styles.search}>
        <SearchComponent />
        <TouchableOpacity style={styles.iconAddPost} onPress>
          <AntDesign name='pluscircleo' size={24} color='black' />
        </TouchableOpacity>
      </View>

      

      <Button
        style={styles.buttonLogout}
        onPress={() => {
          logout();
        }}>
        <Text style={styles.text}> logout </Text>
      </Button>

      <Container>
        <TouchableNativeFeedback
          onPress={() => {
            setOpenLanguagesList(!showLanguagesList);
            LayoutAnimation.configureNext(
              LayoutAnimation.create(200, "easeInEaseOut", "opacity")
            );
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{t("change Language")}</Text>
          </View>
        </TouchableNativeFeedback>
        {showLanguagesList && (
          <>
            {languages.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, { paddingHorizontal: 24 }]}
                onPress={() => changeLanguage(item.code)}>
                <Text style={styles.buttonText}>{t(item.label)}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    marginTop: 50,
  },
  iconAddPost: {
    alignItems: "center",
    position: "absolute",
    right: 20,
    marginTop: 18,
  },
  buttonLogout: {
    backgroundColor: "blue",
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 100,
  },
  text: {
    color: "#FFFFFF",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#002D6B",
  },
});

export default ProfilePage;
