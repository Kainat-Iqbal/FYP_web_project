import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import SideNavBar from "../SideNavBar"; // Import your SideNavBar component
import axios from "axios";
import { useUserContext } from "../UserContext"; // Import the user context

const Proforma = () => {
  const { userId } = useUserContext(); // Access userId from context
  const [Data, setData] = useState([]); // State to store course data
  const [showPopup, setShowPopup] = useState(true);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false); // State for SideNav visibility
  const [lastSemester, setLastSemester] = useState([]);

  const cgpa = 3.51; // Extract CGPA value from the component

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://172.31.242.169:8081/result/GetIndividualStudentResult/${userId}`,
          {
            withCredentials: true,
          }
        );
        setData(response.data); // Set the fetched data to state
      } catch (error) {
        setError("Failed to load data");
      }
    };

    if (userId) {
      fetchStudentData();
    }
  }, [userId]); // Depend on userId to re-fetch if it changes

  useEffect(() => {
      const fetchDataofLastSemester = async () => {
          try {
              const response = await axios.get(`http://172.31.242.169:8081/result/GetIndividualStudentLastSemesterResult/${userId}`, {
                  withCredentials: true,
              });
              setLastSemester(response.data); // Set the fetched data to state
          } catch (error) {
              console.error("Error:", error);
          }
      };

      if (userId) {
          fetchDataofLastSemester();
      }
  }, [userId]); // Depend on userId to re-fetch if it changes

//   console.log("firstdcfc",lastSemester)
  console.log("ghyg", userId);

  const getGrade = (GPA) => {
    if (GPA === 4.00) {
      return 'A+';
    } else if (GPA >= 3.66 && GPA < 4.00) {
      return 'A-';
    } else if (GPA >= 3.33 && GPA < 3.66) {
      return 'B+';
    } else if (GPA >= 3.00 && GPA < 3.33) {
      return 'B-';
    } else if (GPA >= 2.66 && GPA < 3.00) {
      return 'C+';
    } else if (GPA >= 2.33 && GPA < 2.66) {
      return 'C-';
    } else if (GPA >= 2.00 && GPA < 2.33) {
      return 'D+';
    } else if (GPA >= 1.66 && GPA < 2.00) {
      return 'D-';
    } else {
      return 'F';  // For GPA below 1.00
    }
  };
  
  const handleClose = () => {
    setShowPopup(false);
  };

  const handleHamburgerClick = () => {
    setIsSideNavVisible(!isSideNavVisible); // Toggle visibility of SideNavBar
  };

  const getCgpaMessage = (cgpa) => {
    if (cgpa < 3.0) {
      return `Your current CGPA is ${cgpa}. It's important to reflect on your performance and identify areas for improvement. With dedication and effort, you can turn things around. Stay motivated and keep striving for better results!`;
    } else if (cgpa <= 3.5) {
      return `Your current CGPA is ${cgpa}. You're doing well, and your dedication is evident. You're making steady progress, and with a bit more effort, you'll reach even greater heights. Keep up the good work!`;
    } else {
      return `Your current CGPA is ${cgpa}. You're on a great path, and your hard work is showing. Keep up the excellent effort and maintain your focus. Keep it up!`;
    }
  };

  return (
    <View style={styles.container}>
      {/* Top bar with logo, project name, and hamburger menu */}
      <View style={styles.topBar}>
        <Image
          source={require("./FYPLogo.png")} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.projectName}>Academic Accelerator Pro</Text>
        <TouchableOpacity
          onPress={handleHamburgerClick}
          style={styles.hamburger}
        >
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Side Navigation Bar - conditionally rendered */}
      {isSideNavVisible && (
        <View style={styles.sideNavContainer}>
          <SideNavBar onClose={handleHamburgerClick} />
        </View>
      )}

      <ScrollView style={styles.innerContainer}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Image
              source={require("./uniLogo.png")} // Replace with your logo path
              style={styles.uniLogo}
            />
            <View style={styles.headingTextContainer}>
              <Text style={styles.universityName}>
                JINNAH UNIVERSITY FOR WOMEN
              </Text>
              <Text style={styles.provisionalMarks}>
                Provisional Marks Proforma
              </Text>
              <Text style={styles.academicYear}>Academic Year 2024</Text>
            </View>
          </View>
        </View>

        <View style={styles.studentInfoContainer}>
          <View style={styles.infoBlock}>
            <Text style={styles.boldText}>
              Student's Name:{" "}
              {Data.length > 0 && (
                <Text style={styles.normalText}>{Data[0].name}</Text>
              )}
            </Text>
            <Text style={styles.boldText}>
              Class:{" "}
              {Data.length > 0 && (
                <Text
                  style={styles.normalText}
                >{`${Data[0].type} (${Data[0].degree})`}</Text>
              )}
            </Text>
            <Text style={styles.boldText}>
              Semester: <Text style={styles.normalText}>Semester I</Text>
            </Text>
            <Text style={styles.boldText}>
              Department:{" "}
              <Text style={styles.normalText}>
                Computer Science & Software Engineering
              </Text>
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.boldText}>
              Father's Name:{" "}
              {Data.length > 0 && (
                <Text style={styles.normalText}>{Data[0].fatherName}</Text>
              )}
            </Text>
            <Text style={styles.boldText}>
              Seat No:{" "}
              {Data.length > 0 && (
                <Text style={styles.normalText}>{Data[0].seatNo}</Text>
              )}
            </Text>
            <Text style={styles.boldText}>
              Year: <Text style={styles.normalText}>4th Year</Text>
            </Text>
            <Text style={styles.boldText}>
              Enrollment No:{" "}
              {Data.length > 0 && (
                <Text style={styles.normalText}>{Data[0].enrollment}</Text>
              )}
            </Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          {/* Course Table with horizontal scrolling */}
          <ScrollView horizontal>
            <View style={styles.table}>
              {/* Header Row */}
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeaderCell, { width: 110 }]}>
                  Course Code
                </Text>
                <Text style={[styles.tableHeaderCell, { width: 50 }]}>
                  Mid 20
                </Text>
                <Text style={[styles.tableHeaderCell, { width: 50 }]}>
                  Lab 30
                </Text>
                <Text style={[styles.tableHeaderCell, { width: 72 }]}>
                  Terminal 50/80
                </Text>
                <Text style={[styles.tableHeaderCell, { width: 50 }]}>
                  Total 100
                </Text>
                <Text style={[styles.tableHeaderCell, { width: 60 }]}>
                  Credit Hrs
                </Text>
                <Text style={[styles.tableHeaderCell, { width: 50 }]}>GP</Text>
                <Text style={[styles.tableHeaderCell, { width: 60 }]}>
                  Grade
                </Text>
                <Text style={[styles.tableHeaderCell, { width: 110 }]}>
                  Remarks
                </Text>
              </View>

              {/* Separator between header and data rows */}
              <View style={styles.tableSeparator} />

              {/* Data Rows */}
              {lastSemester.map((course, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: 110 }]}>
                    {course.course_title}
                  </Text>
                  <Text style={[styles.tableCell, { width: 50 }]}>
                    {course.midMarks}
                  </Text>
                  <Text style={[styles.tableCell, { width: 50 }]}>
                    {course.labMarks}
                  </Text>
                  <Text style={[styles.tableCell, { width: 72 }]}>
                    {course.terminalMarks+course.sessionalMarks}
                  </Text>
                  <Text style={[styles.tableCell, { width: 50 }]}>
                    {course.totalMarks}
                  </Text>
                  <Text style={[styles.tableCell, { width: 60 }]}>
                    {course.th_credit_hr+"+"+course.lab_credit_hr}
                  </Text>
                  <Text style={[styles.tableCell, { width: 50 }]}>
                  {Number.isInteger(course.GPA) ? `${course.GPA}.00` : course.GPA.toFixed(2)}
                  </Text>
                  <Text style={[styles.tableCell, { width: 60 }]}>
                  {getGrade(course.GPA)}
                  </Text>
                  <Text style={[styles.tableCell, { width: 110 }]}>
                    {course.remarks}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.cgpaContainer}>
          <Text style={styles.cgpaText}>
            The CGPA up to this semester is{" "}
            <Text style={styles.cgpaValue}>{cgpa}</Text>. The CGPA required for
            the award of degree is 2.2.
          </Text>
        </View>

        <Modal visible={showPopup} transparent animationType="slide">
          <View style={styles.popup}>
            <View style={styles.popupContent}>
              <Text style={styles.popupTitle}>CGPA Notification</Text>
              <Text>{getCgpaMessage(cgpa)}</Text>
              <Button title="Close" onPress={handleClose} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center", // Align items to the center vertically
    marginLeft: 0, // Add some left margin
  },
  uniLogo: {
    width: 80,
    height: 80, // Set the desired height for the logo
    resizeMode: "contain",
    marginRight: 10, // Add some spacing between the logo and the text
  },
  headingTextContainer: {
    flex: 1, // Use the remaining space for the text
  },
  universityName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left", // Align the text to the left
  },
  provisionalMarks: {
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "left", // Align the text to the left
  },
  academicYear: {
    fontSize: 16,
    textAlign: "left", // Align the text to the left
  },
  studentInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoBlock: {
    flex: 1,
    marginRight: 10,
  },
  boldText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  normalText: {
    fontWeight: "normal",
  },
  tableContainer: {
    marginTop: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#000",
    width: "100%", // Make table full width
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: "flex_start", // Center align the header text
    padding: 8,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    borderRightWidth: 1, // Add right border for vertical separation
    borderRightColor: "#000",
  },
  tableCell: {
    flex: 1,
    textAlign: "flex_start", // Center align the cell text
    padding: 8,
    borderRightWidth: 1, // Add right border for vertical separation
    borderRightColor: "#000",
  },
  tableSeparator: {
    height: 1,
    backgroundColor: "#000", // Color of the separator
    width: "100%",
  },
  cgpaContainer: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  cgpaText: {
    fontSize: 16,
  },
  cgpaValue: {
    fontWeight: "bold",
  },
  popup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Proforma;
