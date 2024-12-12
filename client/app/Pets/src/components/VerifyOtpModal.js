import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import { ApiPaths } from "../services/ApiPaths";

const VerifyOtpModal = ({ isVisible, onClose, email }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút = 300 giây

  useEffect(() => {
    let timer;
    if (isVisible && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      showMessage({
        message: "OTP has expired. Please request a new one.",
        type: "danger",
      });
    }
    return () => clearInterval(timer); // Dọn dẹp timer khi modal đóng hoặc khi timeLeft thay đổi
  }, [isVisible, timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSubmit = async () => {
    if (otp.length === 6) {
      try {
        const response = await axios.post(
          ApiPaths.verifyOtp,
          `email=${email}&otp=${otp}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        showMessage({
          message: "Authentication successful",
          type: "success",
          floating: true,
          duration: 2000,
          autoHide: true,
        });
        onClose();
      } catch (error) {
        showMessage({
          message: error.message || "Error occurred while verifying OTP.",
          type: "danger",
        });
      }
    } else {
      showMessage({ message: "Please enter a valid OTP", type: "danger" });
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType='fade'
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text>OTP has been sent to your email.</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter OTP'
            value={otp}
            onChangeText={setOtp}
            keyboardType='numeric'
            maxLength={6}
          />
          <Text style={styles.timer}>Time left: {formatTime()}</Text>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timer: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default VerifyOtpModal;
