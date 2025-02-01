import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import SideNavBar from '../SideNavBar';
import axios from "axios";
import { useUserContext } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const Recommendation = () => {
  const { userId } = useUserContext();
  const [studentResults, setStudentResults] = useState(null);
  const [cgpaData, setCgpaData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const navigation = useNavigation();
    const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.18:8081/student/ViewIndividualStudentDetail/${userId}`
        );
        setStudentResults(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    const fetchCgpaDistribution = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.18:8081/student/ViewStudentDetailWRTSesmester/${userId}`
        );
        setCgpaData(response.data);
      } catch (error) {
        console.error("Error fetching CGPA distribution:", error);
      }
    };

    fetchStudentDetails();
    fetchCgpaDistribution();
  }, [userId]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!studentResults || !cgpaData) return;

      const gpaData = studentResults.map((result) => `${result.course_title}: ${result.GPA}`);
      const cgpaSummary = cgpaData.map((result, index) => `Semester ${index + 1}: CGPA ${result.CGPA}`);

      const recommendationRequestText = `
        Based on the following data:
        GPA distribution: ${gpaData.join(", ")}.
        CGPA distribution: ${cgpaSummary.join(", ")}.
        Provide multiple brief, actionable, single-line recommendations to improve performance.
      `;

      try {
        const response = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
          {
            contents: [
              { parts: [{ text: recommendationRequestText }] }
            ]
          },
          {
            params: {
              key: "AIzaSyDlo8e0AWrVdEyy_lKCyq5uoNny0mwcFMc",
            }
          }
        );

        const rawRecommendations = response.data.candidates[0].content.parts[0].text;
        const formattedRecommendations = rawRecommendations
          .split("\n")
          .map((rec) => rec.trim().replace(/^\*\s*/, ""))
          .filter((rec) => rec !== "");
        setRecommendations(formattedRecommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [studentResults, cgpaData]);

  if (!studentResults || !cgpaData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#93C098" />
        <Text style={styles.loadingText}>Fetching student data...</Text>
      </View>
    );
  }

  const handleHamburgerClick = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };


  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require('./FYPLogo.png')} style={styles.logo} />
        <Text style={styles.projectName}>Academic Accelerator Pro</Text>
        <TouchableOpacity onPress={handleHamburgerClick} style={styles.hamburger}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Side Navigation Bar - conditionally rendered */}
      {isSideNavVisible && (
        <View style={styles.sideNavContainer}>
          <SideNavBar onClose={handleHamburgerClick} />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text style={styles.header}>Recommendations</Text>
        

        {/* Recommendations List */}
        <View style={styles.recommendationsContainer}>
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <View key={index} style={styles.notification}>
                <Text style={styles.notificationText}> {rec}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noRecommendations}>Loading...</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  topBar: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#93C098",
    elevation: 4,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  hamburger: {
    padding: 10,
  },
  hamburgerText: {
    fontSize: 28,
    color: "#fff",
  },
  sideNavContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  batchInfo: {
    fontSize: 16,
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  recommendationsContainer: {
    marginVertical: 20,
  },
  notification: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#e6f7e6",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationText: {
    fontSize: 16,
    color: "#2b7a2b",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noRecommendations: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Recommendation;
