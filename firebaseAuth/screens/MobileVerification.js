import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { app, auth } from "../firebase";

const MobileVerification = ({ navigation }) => {
  handlePress = () => {
    const credential = EmailAuthProvider.getCredential(auth, email, password);
  };

  return (
    <View style={styles.container}>
      <Text>MobileVerification</Text>
      <TextInput
        style={styles.txtInput}
        placeholder="Enter your phone number"
        placeholderTextColor={"black"}
      />
      <View style={styles.button} onPress={handlePress}>
        <Text style={styles.sendTxt}>Send</Text>
      </View>
    </View>
  );
};

export default MobileVerification;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    marginTop: 20,
    width: 100,
    alignSelf: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sendTxt: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 800,
    color: "white",
  },
  txtInput: {
    fontSize: 24,
    borderRadius: 5,
    backgroundColor: "gray",
    padding: 20,
  },
});
