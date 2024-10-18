import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { API_URL } from "@env";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUser();

  const handleLogin = async () => {
    console.log("API_URL:", API_URL);
    if (!!username && !!password) {
      try {
        const response = await axios.get(`${API_URL}/accounts`);
        const user = response.data.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          setUser({
            ...user,
            isAdmin: user.isAdmin,
          });
          navigation.replace("HomeTabs", { user });
        } else {
          setErrorMessage("Invalid username or password.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setErrorMessage("Login failed. Please try again.");
      }
    } else {
      setErrorMessage("Please fill in both fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to JT</Text>
      <Text style={styles.loginPromptText}>Login to your account!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordIsVisible}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          style={styles.passwordVisibleButton}
          onPress={() => setPasswordIsVisible(!passwordIsVisible)}
        >
          <Feather
            name={passwordIsVisible ? "eye" : "eye-off"}
            size={20}
            color="#7C808D"
          />
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f0f4f8",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 10,
  },
  loginPromptText: {
    color: "#7C808D",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    fontStyle: "italic",
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 15,
    width: "80%",
    height: 50,
    backgroundColor: "#e9ecef",
    borderWidth: 1,
    borderColor: "#bdc3c7",
    fontSize: 16,
    color: "#2c3e50",
    paddingRight: 80,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  passwordVisibleButton: {
    position: "absolute",
    right: 55,
    top: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  loginButton: {
    borderRadius: 10,
    backgroundColor: "#708090",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
    overflow: "hidden",
  },
});

export default LoginScreen;
