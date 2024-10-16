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
    axios.post('http://172.31.242.169:8081/login', values)
      .then((res) => {
        console.log("sc",res.data)
        if (res.data === "Student") {
          router.push('/StudentHome');
        } 
        else if (res.data === "Parent") {
          router.push('/StudentHome'); // Redirect to ParentHome
        }
        else if (res.data === "Failed") {
          Alert.alert("Invalid Loginnn");
        }
        console.log("djdjd")
      })
      
      .catch((error) => {
        console.error("Error during login:", error);
      });
      console.log("dj7")
  };

  return (
    <ImageBackground
      source={require('./BG2.png')} // Replace with your image path
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
            {/* "Not signed in?" text and Sign Up link */}
          <View style={styles.signupContainer}>
            <Text style={styles.notSignedInText}>New Parent? </Text>
            <TouchableOpacity onPress={() => router.push('ParentSignup')}>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 20,
    marginTop:5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 7,
    fontFamily: 'Poppins',
    color:"#00304B",
  },
  loginSection: {
    width: "100%",
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 70,
    marginTop:30,
    color:"#00304B",
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 25,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#93C098",
    width: "90%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
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
  signupContainer: {
    flexDirection: 'row',  // Align items in a row
    justifyContent: 'center',  // Center the content horizontally
    marginTop: 10,  // Add some space from the login button
  },
  notSignedInText: {
    color: '#999',
    fontSize: 14,
  },
  signupText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Login;
