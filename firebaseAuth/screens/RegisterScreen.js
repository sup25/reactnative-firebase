import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const RegisterScreen = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
    

      await updateProfile(user, {
        displayName: Name,
      });

      console.log("Display name updated:", user.displayName);
      console.log(user)
      setRegisterSuccessMessage("Successfully registered");
      setEmail("");
      setPassword("");
      setName(""); 
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setRegisterErrorMessage("User already exists.");
      } else if (error.code === "auth/invalid-email") {
        setRegisterErrorMessage("Provide both email and password");
      } else {
        setRegisterErrorMessage("Error: " + error.message);
      }
      console.error(error);
      setTimeout(() => {
        setRegisterErrorMessage("");
      }, 3000);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Display Name"
          value={Name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
        />
        {registerErrorMessage ? (
          <Text style={styles.errorText}>{registerErrorMessage}</Text>
        ) : null}
        {registerSuccessMessage ? (
          <Text style={styles.successText}>{registerSuccessMessage}</Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: "80%",
  },
  successText: {
    color: "green",
    marginTop: 5,
    textAlign: "center",
    fontSize: 20,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
});
