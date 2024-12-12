import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Container,
  TouchableNativeFeedback,
} from "react-native";
//import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { FontAwesome6 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
const languages = [
  { code: "en", label: "English" },
  { code: "ch_tw", label: "中文" },
];

const Selector = () => {
  const [showLanguagesList, setOpenLanguagesList] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Container>
      <TouchableNativeFeedback
        onPress={() => {
          setOpenLanguagesList(!showLanguagesList);
          LayoutAnimation.configureNext(
            LayoutAnimation.create(200, "easeInEaseOut", "opacity")
          );
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{t("changeLanguage")}</Text>
        </View>
      </TouchableNativeFeedback>
      {showLanguagesList && (
        <>
          {languages.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, { paddingHorizontal: 24 }]}
              onPress={() => changeLanguage(item.code)}>
              <Text style={styles.buttonText}>{t(item.name)}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#002D6B',
  },
});

export default Selector;
