import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import axios from 'axios';  // Or use fetch API
import { useRouter } from 'expo-router';

const ParentSignup = ({ navigation }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    parentName: '',
    email: '',
    parentCNIC: '',
    phone: '',
    childJuwId: '',
    childName: '',
    password: '',
    confirmPassword: '',
  });
  console.log("first",values)

  const handleInput = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const handleSignup = async () => {
    const { parentName, email, parentCNIC, phone, childJuwId, password, confirmPassword } = values;

    // Basic validation
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      // Send data to the backend using Axios
      const response = await axios.post('http://172.31.242.169:8081/parent/Add', {
        name: parentName,
        email,
        cnic: parentCNIC,
        phone,
        studentJuwId: childJuwId,
        password,
      });
console.log("ppp")
      if (response.data.success) {
        Alert.alert('Success', 'Account created successfully!');
        console.log("PP1")
        // Navigate to the login page
        router.push('Login');
      } else {
        Alert.alert('Error', response.data.message || 'Signup failed!');
        console.log("PP2")
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.log("PPrr")
    }
    
  };
 

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height" 
      keyboardVerticalOffset={0} 
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.signupTitle}>Parent Signup</Text>

          <TextInput
            style={styles.input}
            placeholder="Parent Name"
            placeholderTextColor="#999"
            value={values.parentName}
            onChangeText={(text) => handleInput('parentName', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={values.email}
            onChangeText={(text) => handleInput('email', text)}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Parent CNIC"
            placeholderTextColor="#999"
            value={values.parentCNIC}
            onChangeText={(text) => handleInput('parentCNIC', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone No"
            placeholderTextColor="#999"
            value={values.phone}
            onChangeText={(text) => handleInput('phone', text)}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Child's JUW ID"
            placeholderTextColor="#999"
            value={values.childJuwId}
            onChangeText={(text) => handleInput('childJuwId', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={values.password}
            onChangeText={(text) => handleInput('password', text)}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            value={values.confirmPassword}
            onChangeText={(text) => handleInput('confirmPassword', text)}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginRedirect}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('Login')}>
              <Text style={styles.loginLink}> Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  signupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    height: '8%',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: "#93C098",
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#999',
  },
  loginLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default ParentSignup;
