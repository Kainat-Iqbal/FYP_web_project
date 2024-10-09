import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ImageBackground } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native'; // React Native navigation
import { useRouter } from 'expo-router';

const Login = () => {
  const navigation = useNavigation();
  const router = useRouter();


  // State variables to hold the input values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  console.log("first",values)

  // Function to handle changes in input field
  const handleInput = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  axios.defaults.withCredentials = true;

  // Function to handle form submission
  const handleSubmit = () => {
    axios.post('http://192.168.97.20:8081/login', values)
      .then((res) => {
        console.log("sc",res.data)
        if (res.data === "Student") {
          router.push('/StudentHome');
        } else if (res.data === "Failed") {
          Alert.alert("Invalid Loginnn");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <ImageBackground
      source={require('./newlogin4.png')} // Replace with your image path
      style={styles.background}
      
    >
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <View style={styles.logoSection}>
            <Image source={require("./FYPLogo.png")} style={styles.logo} />
            <Text style={styles.title}>Academic Accelerator Pro</Text>
          </View>

          <View style={styles.loginSection}>
            <Text style={styles.loginTitle}>Login</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={values.email}
              onChangeText={(text) => handleInput("email", text)}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={values.password}
              onChangeText={(text) => handleInput("password", text)}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Make sure the background takes up the full space
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  leftSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: 'Poppins',
  },
  loginSection: {
    width: "100%",
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    width: "90%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  rightSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  descriptionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
});

export default Login;
