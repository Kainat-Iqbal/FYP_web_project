import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import SideNavBar from '../SideNavBar';
import { useUserContext } from '../UserContext';
import { BarChart, LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const Insights = () => {
  const { userId } = useUserContext();
  const [studentResults, setStudentResults] = useState(null);
  const [cgpaData, setCgpaData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://172.31.242.169:8081/student/ViewIndividualStudentDetail/${userId}`);
        setStudentResults(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    const fetchCgpaDistribution = async () => {
      try {
        const response = await axios.get(`http://172.31.242.169:8081/student/ViewStudentDetailWRTSesmester/${userId}`);
        setCgpaData(response.data);
      } catch (error) {
        console.error('Error fetching CGPA distribution:', error);
      }
    };

    fetchStudentDetails();
    fetchCgpaDistribution();
  }, [userId]);

//   useEffect(() => {
//     if (studentResults && cgpaData) {
//       generateSummary();
//     }
//   }, [studentResults, cgpaData]);

  // Function to handle hamburger menu click
  const handleHamburgerClick = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  const cleanSummaryText = (text) => {
    // Replace newline characters with a placeholder
    const formattedText = text
      .replace(/\\n/g, '\n') // Replace newline characters with actual newlines
      .replace(/(\*\*.*?\*\*)/g, '**$1**') // Leave **text** as is for processing later
      .replace(/\*(.*?)\*/g, '*$1*'); // Leave *text* as is for processing later
  
    // Split the text into parts based on markdown-like formatting
    const parts = formattedText.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={{ fontWeight: 'bold' }}>
            {part.slice(2, -2)} {/* Remove the ** from both ends */}
          </Text>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <Text key={index} style={{ fontStyle: 'italic' }}>
            {part.slice(1, -1)} {/* Remove the * from both ends */}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>; // Return normal text parts
    });
  
    return <Text>{parts}</Text>; // Return the combined text
  };
    
  useEffect(() => {
    const fetchGeminiSummary = async () => {
      // Prepare data to be sent for the summary
      const gpaData = studentResults.map(result => `${result.course_title}: ${result.GPA}`);
      const cgpaDataSummary = cgpaData.map((result, index) => `Semester ${index + 1}: CGPA ${result.CGPA}`);
  
      // Construct the text for the API
      const summaryRequestText = `
        Here is the GPA distribution by course: ${gpaData.join(', ')}.
        Also, here is the CGPA distribution by semester: ${cgpaDataSummary.join(', ')}.
        Can you provide a brief summary of the student's academic performance?
      `;
  
      try {
        const response = await axios({
          url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDlo8e0AWrVdEyy_lKCyq5uoNny0mwcFMc",
          method: "post",
          data: {
            contents: [
              { "parts": [{ "text": summaryRequestText }] }
            ]
          }
        });
        // Clean and format the summary text
        const rawSummary = response['data']['candidates'][0]['content']['parts'][0]['text'];
        const cleanedSummary = cleanSummaryText(rawSummary);
        setSummary(cleanedSummary);
      } catch (error) {
        console.error('Error fetching summary from Gemini API:', error);
      }
    };
  
    if (studentResults && cgpaData) {
      fetchGeminiSummary();
    }
  }, [studentResults, cgpaData]);
    
  
  if (!studentResults || !cgpaData) {
    return <Text>Loading student details...</Text>;
  }

  // GPA Bar Chart data
 // Function to generate random colors
 const colors = [
    // '#FF5733', // vibrant red-orange
    // '#FFC300', // bright yellow
    // '#DAF7A6', // soft green
    // '#C70039', // rich crimson
    '#900C3F', // deep purple
    // '#581845', // dark violet
    '#3498DB', // bright blue
    '#FF9F00', // sunny orange

    '#FF5733', // vibrant red-orange
    '#FFC300', // bright yellow
    '#DAF7A6', // soft green
    '#FF8D8D', // light coral pink
    '#FFB2A6', // soft peach
    '#FF85C0', // light pink
    '#FFC1E2', // pastel pink
  
  ];
  
  const generateRandomColor = () => {
    // Select a random color from the predefined array
    return colors[Math.floor(Math.random() * colors.length)];
  };
    
  // GPA Bar Chart data with dynamic random colors
  const gpaData = {
    labels: studentResults?.map(result => result.course_title) || [],
    datasets: [
      {
        data: studentResults?.map(result => result.GPA) || [],
        colors: studentResults?.map(() => (opacity = 1) => generateRandomColor()) || [], // Generate random color for each bar
      },
    ],
  };
  
  // CGPA Line Chart data
  const cgpaChartData = {
    labels: cgpaData?.map((_, index) => `Semester ${index + 1}`) || [],
    datasets: [
      {
        data: cgpaData?.map(result => result.CGPA) || [],
        strokeWidth: 2,
        color: (opacity = 1) => generateRandomColor(), // Random color for line
        // You can also set a specific color or a function for random colors
      },
    ],
  };
  
  if (!studentResults || !cgpaData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading student details...</Text>
      </View>
    );
  }

  const CustomLabel = ({ x, y, value }) => (
    <Text
      x={x}
      y={y}
      fontSize={12}
      fill="#FFFFFF"
      textAnchor="middle"
      maxWidth={60} // Set maxWidth for label wrapping
      lineBreakMode="wordWrap" // Allow word wrap
      numberOfLines={2} // Limit to 2 lines
      style={{ textAlign: 'center' }}
    >
      {value}
    </Text>
  );
  

  return (
    <View style={styles.container}>
      {/* Top bar with logo, project name, and hamburger menu */}
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
        <Text style={styles.header}>Results Insights of {studentResults[0]?.name}</Text>
        <Text style={styles.batchInfo}>
          <Text style={styles.bold}>Batch:</Text> {studentResults[0]?.year} ({studentResults[0]?.session})
        </Text>

        {/* GPA Bar Chart */}
        <Text style={styles.chartTitle}>GPA Distribution by Course</Text>
        <ScrollView horizontal>
  <View style={styles.chartContainer}>
    <BarChart styles={styles.barchart1}
      data={gpaData}
      width={Math.max(screenWidth, gpaData.labels.length * 50)}
      height={360}
      yAxisLabel=""
      chartConfig={chartConfig}
      verticalLabelRotation={15} // No rotation
      marginVertical={40}
      style={styles.chart}
      fromZero={true}
      showValuesOnTopOfBars={true}
      withCustomBarColorFromData={true} // Apply custom colors
      flatColor={true} // Ensure solid colors
      showGrid={true} // Show grid for better clarity
      labelComponent={<CustomLabel />} // Use the custom label component
    />
  </View>
</ScrollView>

        {/* CGPA Line Chart */}
        <Text style={styles.chartTitle}>CGPA Distribution by Semester</Text>
        <LineChart
  data={cgpaChartData}
  width={screenWidth - 40}
  verticalLabelRotation={15} // No rotation
  height={250}
  chartConfig={{
    ...chartConfig,
    // Customize dot color here
    propsForDots: {
      r: "6", // Radius of the dot
      strokeWidth: "2", // Width of the stroke
      stroke: "#fff", // Dot border color
      fill: generateRandomColor(), // Fill color for the dot
    },
  }}
  bezier
  style={styles.chart}
  fromZero={true}
/>

        {/* Summary Section */}
        {summary && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const chartConfig = {
    backgroundColor: "#f5f5f5",
    backgroundGradientFrom: "#93C098",
    backgroundGradientTo: "#8CE0DB",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.6,
    style: {
      borderRadius: 16,
      paddingTop: 20, // Increase top padding
    },
    propsForVerticalLabels: {
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center', // Center alignment
    },
    propsForHorizontalLabels: {
      fontSize: 12,
      fontWeight: 'bold',
        marginBottom:-20
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#d3d3d3",
    },
  };
            
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  batchInfo: {
    fontSize: 16,
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
    
  },
  summarySection: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
  },
  
});

export default Insights;
