import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleUserLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setLoginErrorMessage(
            "User not found. Please check your email or password."
          );
        } else {
          setLoginErrorMessage("Login failed. Please try again.");
        }
        console.log(error);
        setTimeout(() => {
          setLoginErrorMessage("");
        }, 3000);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
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
        {loginErrorMessage ? (
          <Text style={styles.errorText}>{loginErrorMessage}</Text>
        ) : null}
      </View>
      <View >
        <Text style={{ marginTop:10, fontSize:18}} onPress={() => navigation.navigate("register")}> Register</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleUserLogin} style={styles.button}>
          <Text style={styles.buttonText}> Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
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
  forgotPasswordText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
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
});
