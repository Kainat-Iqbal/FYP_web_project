// TeacherHomePage.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StudentHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Teacher</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // You can customize this background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default StudentHome;
