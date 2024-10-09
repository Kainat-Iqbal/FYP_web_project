import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // React Native navigation

const StudentHome = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.97.20:8081/session", {
          withCredentials: true,
        });
        setUserId(response.data.userId);
        setUserName(response.data.userName);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load data");
      }
    };
    console.log("first",userName)

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Hello Student {userName ? userName : ""}</Text>
        <Text style={styles.title}>JUW ID {userId ? userId : ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default StudentHome;
