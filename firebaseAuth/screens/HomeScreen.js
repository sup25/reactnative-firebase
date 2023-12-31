import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { updateProfile, updateEmail } from "firebase/auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "No Display Name");
    }
    console.log("before username:", user);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName || "No Display Name");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => console.log(error));
  };

  const updateDisplayNameAndEmail = async () => {
    const user = auth.currentUser;
    try {
      await updateProfile(user, {
        displayName: newDisplayName,
      });

      // Update the email address using updateEmail
      await updateEmail(user, newEmail);

      console.log("updated username:", user);
      setDisplayName(newDisplayName);
      setNewDisplayName("");
      console.log("Display name updated:", newDisplayName);
      setNewEmail(""); // Clear the new email field
      console.log("Email updated:", newEmail);
    } catch (error) {
      console.error("Error updating display name or email:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textDisplayName}>Display Name: {displayName}</Text>
      <Text>Your name is : </Text>
      <TextInput
        style={styles.input}
        placeholder="New Display Name"
        value={newDisplayName}
        onChangeText={(text) => setNewDisplayName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Email"
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
      />
      <TouchableOpacity
        onPress={updateDisplayNameAndEmail}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Update Display Name and Email</Text>
      </TouchableOpacity>
      <Text style={styles.textEmail}>Email: {auth.currentUser?.email}</Text>
      <TouchableWithoutFeedback onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textDisplayName: {
    fontSize: 24,
    fontWeight: "800",
  },
  textEmail: {
    fontSize: 24,
    fontWeight: "800",
  },
  button: {
    backgroundColor: "dodgerblue",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
  },
});
