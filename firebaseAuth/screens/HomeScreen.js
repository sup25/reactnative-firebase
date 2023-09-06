import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import {  updateProfile } from "firebase/auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "No Display Name");
    }
    console.log("before username:",user)
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
 
  const updateDisplayName = async () => {
    const user = auth.currentUser;
    try {
      await updateProfile(user,{
        displayName: newDisplayName,
      });
      
      console.log("updated username:",user)
      setDisplayName(newDisplayName);
      setNewDisplayName("");
      console.log("Display name updated:", newDisplayName);
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textDisplayName}>Display Name: {displayName}</Text>
      <TextInput
        style={styles.input}
        placeholder="New Display Name"
        value={newDisplayName}
        onChangeText={(text) => setNewDisplayName(text)}
      />
      <TouchableOpacity onPress={updateDisplayName} style={styles.button}>
        <Text style={styles.buttonText}>Update Display Name</Text>
      </TouchableOpacity>
      <Text style={styles.textEmail}>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
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
