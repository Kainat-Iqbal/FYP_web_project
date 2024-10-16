import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation
import axios from "axios";
import SideNavBar from '../SideNavBar'; // Import SideNavBar
import { useUserContext } from '../UserContext'; // Import the user context


const StudentHome = () => {
    const { userId, setUserId } = useUserContext(); // Get userId and setUserId from context
    const [userName, setUserName] = useState(null);
    const [error, setError] = useState(null);
    const [courseData, setCourseData] = useState([]); // State to store course data
    const [isSideNavVisible, setIsSideNavVisible] = useState(false); // State to manage SideNavBar visibility
    const navigation = useNavigation();
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://172.31.242.169:8081/session", {
                    withCredentials: true,
                });
                setUserId(response.data.userId); // Set userId in context
                setUserName(response.data.userName);
            } catch (error) {
                console.error("Error:", error);
                setError("Failed to load data");
            }
        };

        fetchData();
    }, []); // No dependency on userId here


    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://172.31.242.169:8081/result/GetIndividualStudentResult/${userId}`, {
                    withCredentials: true,
                });
                setCourseData(response.data); // Set the fetched data to state
            } catch (error) {
                console.error("Error:", error);
                setError("Failed to load data");
            }
        };

        if (userId) {
            fetchStudentData();
        }
    }, [userId]); // Depend on userId to re-fetch if it changes

    // If there's an error or no data, display an appropriate message
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }
    if (!courseData.length) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // Function to handle hamburger menu click
    const handleHamburgerClick = () => {
        setIsSideNavVisible(!isSideNavVisible); // Toggle visibility of SideNavBar
    };
    

    return (
        <View style={styles.container}>
            {/* Top bar with logo, project name, and hamburger menu */}
            <View style={styles.topBar}>
                <Image
                    source={require('./FYPLogo.png')} // Replace with your logo path
                    style={styles.logo}
                />
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

            {/* Box below the top bar to display details */}
            <View style={styles.detailsBox}>
                {/* First Row: Name, Father's Name, Seat No., Enrollment No. */}
                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={[styles.infoText, { width: '40%', marginLeft: -70 }]}>{courseData[0].name}</Text>

                    <Text style={[styles.label, { marginLeft: -10 }]}>Seat No:</Text>
                    <Text style={[styles.infoText, { width: '20%', marginLeft: -55 }]}>{courseData[0].seatNo}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Father:</Text>
                    <Text style={[styles.infoText, { width: '40%', marginLeft: -70 }]}>{courseData[0].fatherName}</Text>

                    <Text style={[styles.label, { marginLeft: -10 }]}>Faculty:</Text>
                    <Text style={[styles.infoText, { width: '20%', marginLeft: -55 }]}>{'Science'}</Text>
                </View>

                {/* Second Row: Faculty, Class, Batch */}
                <View style={styles.row}>
                    <Text style={styles.label}>Batch:</Text>
                    <Text style={[styles.infoText, { width: '20%', marginLeft: -70 }]}>{courseData[0].year}</Text>

                    <Text style={[styles.label, { marginLeft: 55 }]}>Class:</Text>
                    <Text style={[styles.infoText, { width: '20%', marginLeft: -55, marginBottom: 10 }]}>{`${courseData[0].type} (${courseData[0].degree})`}</Text>

                    <Text style={styles.label}>Enrollment No:</Text>
                    <Text style={[styles.infoText, { width: '60%', marginLeft: -10 }]}>{courseData[0].enrollment}</Text>
                </View>
            </View>

            {/* Table to display results */}
            <View style={styles.tableContainer}>
                <Text style={styles.tableHeader}>Results</Text>
                <ScrollView vertical style={styles.verticalScroll}>
                    <ScrollView horizontal style={styles.horizontalScroll}>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableHeaderCell, { width: 50 }]}>S#</Text>
                                <Text style={[styles.tableHeaderCell, { width: 170 }]}>Course Title</Text>
                                <Text style={[styles.tableHeaderCell, { width: 80,marginLeft:30 }]}>Mid</Text>
                                <Text style={[styles.tableHeaderCell, { width: 80 ,marginLeft:-30}]}>Lab</Text>
                                <Text style={[styles.tableHeaderCell, { width: 120,marginLeft:-30 }]}>Assig + Term</Text>
                                <Text style={[styles.tableHeaderCell, { width: 100 ,marginLeft:-15}]}>Grand Total</Text>
                                <Text style={[styles.tableHeaderCell, { width: 50 }]}>GP</Text>
                            </View>
                            {courseData.map((course, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { width: 50 }]}>{index + 1}</Text>
                                    <Text style={[styles.tableCell, { width: 170 }]}>{course.course_title}</Text>
                                    <Text style={[styles.tableCell, { width: 80 ,marginLeft:30}]}>{course.midMarks}</Text>
                                    <Text style={[styles.tableCell, { width: 80 ,marginLeft:-30}]}>{course.labMarks}</Text>
                                    <Text style={[styles.tableCell, { width: 120,marginLeft:-30 }]}>{course.sessionalMarks + course.terminalMarks}</Text>
                                    <Text style={[styles.tableCell, { width: 100,marginLeft:-15 }]}>{course.totalMarks}</Text>
                                    <Text style={[styles.tableCell, { width: 50 }]}>{Number.isInteger(course.GPA) ? `${course.GPA}.00` : course.GPA.toFixed(2)}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // Your existing styles
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    topBar: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#93C098',
        elevation: 4,
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    projectName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    hamburger: {
        padding: 10,
    },
    hamburgerText: {
        fontSize: 28,
        color: '#fff',
    },
    sideNavContainer: {
        position: 'absolute', // This ensures that the SideNavBar overlays the content
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10, // Ensures it's on top of all other content
    },
    detailsBox: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        width: '40%',
    },
    infoText: {
        fontSize: 16,
        width: '40%',
    },
    tableContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
    },
    tableHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    verticalScroll: {
        marginBottom: 10,
    },
    horizontalScroll: {
        flexDirection: 'row',
    },
    table: {
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        textAlign: 'flex_start',
    },
    tableCell: {
        textAlign: 'flex-start',
    },
});

export default StudentHome;
