import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { handleRequestChangeRole } from "../services/requester/UserRequester";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../core/theme";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
const RoleChangeModal = ({ showRoleModal, setShowRoleModal, currentRole }) => {
  const [requestedRole, setRequestedRole] = useState("BUSINESS");

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData.userId;
  const userToken = userData.token;
  const handleRoleChange = (role) => {
    setRequestedRole(role);
  };

  const handleRequest = async () => {
    // Gởi yêu cầu lên server với userId và requestedRole
    handleRequestChangeRole(userId, userToken, requestedRole);
    showMessage({
        message: "Request sended!",
        type: "success",
        floating: true,
        duration: 2000,
        autoHide: true,
      });

      setTimeout(() => {
        setShowRoleModal(false);
      }, 2000);
    
  };

  return (
    <Modal
      visible={showRoleModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowRoleModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Your current role is: {currentRole}</Text>
          <Text style={styles.modalText}>Choose a new role:</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                requestedRole === "BUSINESS" && styles.radioButtonSelected,
              ]}
              onPress={() => handleRoleChange("BUSINESS")}
            >
              <Text style={styles.buttonText}>BUSINESS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                requestedRole === "HOSPITAL" && styles.radioButtonSelected,
              ]}
              onPress={() => handleRoleChange("HOSPITAL")}
            >
              <Text style={styles.buttonText}>HOSPITAL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                requestedRole === "USER" && styles.radioButtonSelected,
              ]}
              onPress={() => handleRoleChange("USER")}
            >
              <Text style={styles.buttonText}>USER</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.roleButton} onPress={handleRequest}>
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, styles.closeButton]}
              onPress={() => setShowRoleModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlashMessage position="top" style={{ marginBottom: 50 }}/>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioButton: {
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  radioButtonSelected: {
    backgroundColor: "#0275d8",
  },
  buttonText: {
    color: theme.colors.black,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roleButton: {
    backgroundColor: "#0275d8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#d9534f",
  },
});

export default RoleChangeModal;
