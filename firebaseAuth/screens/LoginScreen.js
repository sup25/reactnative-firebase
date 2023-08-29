import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (!handleSignUp) {
          navigation.navigate("Home");
        }
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

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered in with:", user.email);
        setRegisterSuccessMessage("Successfully registered");
        setEmail("");
        setPassword("");
        navigation.navigate("MbVerification");
        setTimeout(() => {
          setRegisterErrorMessage("");
        }, 3000);

        setTimeout(() => {
          setRegisterSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setRegisterErrorMessage("User already exists.");
        } else if (error.code === "auth/invalid-email") {
          setRegisterErrorMessage("Provide both email and password");
        } else {
          setRegisterErrorMessage(error.message);
        }
        console.log(error);
        setTimeout(() => {
          setRegisterErrorMessage("");
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
        {registerErrorMessage ? (
          <Text style={styles.errorText}>{registerErrorMessage}</Text>
        ) : null}
        {loginErrorMessage ? (
          <Text style={styles.errorText}>{loginErrorMessage}</Text>
        ) : null}
        {registerSuccessMessage ? (
          <Text style={styles.successText}>{registerSuccessMessage}</Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback
          onPress={handleUserLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Login</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableWithoutFeedback>
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
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "red",
    borderWidth: 2,
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
  buttonOutlineText: {
    color: "red",
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
  successText: {
    color: "green",
    marginTop: 5,
    textAlign: "center",
    fontSize: 20,
  },
});
