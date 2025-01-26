// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
// import axios from 'axios';
// import RNFS from 'react-native-fs'; // Import react-native-fs
// import { useUserContext } from '../UserContext';

// const ChatbotScreen = () => {
//   const { userId } = useUserContext();
  
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [studentResults, setStudentResults] = useState(null);
//   const [cgpaData, setCgpaData] = useState(null);
//   const [rulesData, setRulesData] = useState('');  // Store rules as a string

//   // Fetch student details, CGPA data, and rules document
//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://192.168.100.9:8081/student/ViewIndividualStudentDetail/${userId}`
//         );
//         setStudentResults(response.data);
//       } catch (error) {
//         console.error("Error fetching student details:", error.message);
//       }
//     };

//     const fetchCgpaDistribution = async () => {
//       try {
//         const response = await axios.get(
//           `http://192.168.100.9:8081/student/ViewStudentDetailWRTSesmester/${userId}`
//         );
//         setCgpaData(response.data);
//       } catch (error) {
//         console.error("Error fetching CGPA distribution:", error.message);
//       }
//     };
//     // Copy rules.txt from the assets folder to the app's document directory
//     const fetchRulesData = async () => {
//       try {
//         const path = RNFS.DocumentDirectoryPath + '/rules.txt';  // Path to where we want to save the file
//         const assetPath = RNFS.MainBundlePath + '/assets/rules.txt';  // Path to the rules.txt in your assets folder

//         // Check if the file exists in the document directory
//         const fileExists = await RNFS.exists(path);
//         if (!fileExists) {
//           // Copy the file from assets to the document directory
//           await RNFS.copyFile(assetPath, path);
//         }

//         // Now read the file from the document directory
//         const fileContents = await RNFS.readFile(path);
//         setRulesData(fileContents);  // Store file contents in state
//       } catch (error) {
//         console.error("Error reading or copying rules file:", error.message);
//       }
//     };

//     fetchStudentDetails();
//     fetchCgpaDistribution();
//     fetchRulesData();  // Fetch rules document
//   }, [userId]);

//   // Function to send message to Gemini API, including student data, CGPA data, and rules data
//   const sendMessage = async () => {
//     if (userInput.trim() === '') return;

//     // Prepare the message
//     let messageToSend = userInput;

//     if (studentResults) {
//       messageToSend += `\n\nStudent Details: ${JSON.stringify(studentResults)}`;
//     }

//     if (cgpaData) {
//       messageToSend += `\n\nCGPA Distribution: ${JSON.stringify(cgpaData)}`;
//     }

//     if (rulesData) {
//       // Append rules data if available
//       messageToSend += `\n\nRules: ${rulesData}`;
//     }

//     // Add user message to the chat
//     setMessages(prev => [...prev, { sender: 'user', text: userInput }]);

//     try {
//       // Call Gemini API
//       const response = await axios({
//         url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY",
//         method: "post",
//         data: {
//           contents: [
//             { "parts": [{ "text": messageToSend }] }
//           ]
//         }
//       });

//       // Extract and clean the bot's response
//       const rawReply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
//         'Sorry, I could not process your request.';
//       setMessages(prev => [...prev, { sender: 'bot', text: rawReply }]);
//     } catch (error) {
//       console.error('Error calling Gemini API:', error);
//       setMessages(prev => [...prev, { sender: 'bot', text: 'An error occurred. Please try again.' }]);
//     }

//     // Clear user input
//     setUserInput('');
//   };

//   const renderMessage = ({ item }) => (
//     <View
//       style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
    
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.chatContainer}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={userInput}
//           onChangeText={setUserInput}
//           placeholder="Type a message..."
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
//   chatContainer: { flexGrow: 1, justifyContent: 'flex-end' },
//   message: { marginVertical: 5, padding: 10, borderRadius: 10 },
//   userMessage: { alignSelf: 'flex-end', backgroundColor: '#007bff' },
//   botMessage: { alignSelf: 'flex-start', backgroundColor: 'white' },
//   messageText: { fontSize: 16, color: 'black' },
//   inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
//   input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, marginRight: 10 },
// });

// export default ChatbotScreen;


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import SideNavBar from "../SideNavBar"; // Import your SideNavBar component
import axios from "axios";
import { useUserContext } from "../UserContext"; // Import the user context

const ChatbotScreen = () => {
  const { userId } = useUserContext(); // Access userId from context
  const [studentResults, setStudentResults] = useState(null);
  const [cgpaData, setCgpaData] = useState(null);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false); // State for SideNav visibility

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.9:8081/student/ViewIndividualStudentDetail/${userId}`
        );
        setStudentResults(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error.message);
      }
    };

    const fetchCgpaDistribution = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.9:8081/student/ViewStudentDetailWRTSesmester/${userId}`
        );
        setCgpaData(response.data);
      } catch (error) {
        console.error("Error fetching CGPA distribution:", error.message);
      }
    };

    fetchStudentDetails();
    fetchCgpaDistribution();
  }, [userId]);

  const handleHamburgerClick = () => {
    setIsSideNavVisible(!isSideNavVisible); // Toggle visibility of SideNavBar
  };

  // JavaScript to inject into the WebView for sending user data to Botpress
  const injectedJavaScript =
    studentResults && cgpaData
      ? `
        window.botpressWebChat.sendEvent({
          type: 'proactive-trigger',
          channel: 'web',
          payload: {
            studentResults: ${JSON.stringify(studentResults)},
            cgpaData: ${JSON.stringify(cgpaData)}
          }
        });
      `
      : "";

      // console.log("first",studentResults)

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

      {/* WebView for Botpress Chatbot */}
      <WebView
        source={{
          uri:
            "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/11/07/13/20241107134723-5N4EZCVL.json",
        }}
        cacheEnabled={false}
        injectedJavaScript={injectedJavaScript}
        onMessage={(event) => {
          console.log("Message from chatbot:", event.nativeEvent.data);
        }}
        style={{ flex: 1 }}
      />
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
});

export default ChatbotScreen;






















// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Modal,
//   Button,
//   TouchableOpacity,
// } from "react-native";
// import { WebView } from "react-native-webview";
// import SideNavBar from "../SideNavBar"; // Import your SideNavBar component
// import axios from "axios";
// import { useUserContext } from "../UserContext"; // Import the user context


// const ChatbotScreen = () => {

//     const { userId } = useUserContext(); // Access userId from context
  
//     const [isSideNavVisible, setIsSideNavVisible] = useState(false); // State for SideNav visibility
  

//   const handleHamburgerClick = () => {
//     setIsSideNavVisible(!isSideNavVisible); // Toggle visibility of SideNavBar
//   };


//   return (
//     <View style={styles.container}>

//             {/* Top bar with logo, project name, and hamburger menu */}
//             <View style={styles.topBar}>
//         <Image
//           source={require("./FYPLogo.png")} // Replace with your logo path
//           style={styles.logo}
//         />
//         <Text style={styles.projectName}>Academic Accelerator Pro</Text>
//         <TouchableOpacity
//           onPress={handleHamburgerClick}
//           style={styles.hamburger}
//         >
//           <Text style={styles.hamburgerText}>☰</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Side Navigation Bar - conditionally rendered */}
//       {isSideNavVisible && (
//         <View style={styles.sideNavContainer}>
//           <SideNavBar onClose={handleHamburgerClick} />
//         </View>
//       )}

//       <WebView
//         source={{
//           uri:
//             "https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2024/11/07/13/20241107134723-5N4EZCVL.json",
//         }} 
//         cacheEnabled={false}
//         // Simple URL for testing
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   topBar: {
//     height: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     backgroundColor: "#93C098",
//     elevation: 4,
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     resizeMode: "contain",
//   },
//   projectName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   hamburger: {
//     padding: 10,
//   },
//   hamburgerText: {
//     fontSize: 28,
//     color: "#fff",
//   },
//   sideNavContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 10,
//   },

// });

// export default ChatbotScreen;
