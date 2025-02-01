import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet,Image,TouchableOpacity } from "react-native";
import axios from "axios";
import { useUserContext } from "../UserContext";
import SideNavBar from '../SideNavBar';
import { useNavigation } from "@react-navigation/native";

const Notifications = ( ) => {
    const { userId } = useUserContext();
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://192.168.100.18:8081/student/Get/Notification/${userId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications().then(() => setRefreshing(false));
  }, []);
  const handleHamburgerClick = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      
       
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>{new Date(item.notification_time).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
<View style={styles.contentContainer}>
     
      <Text style={styles.header}>Notifications</Text>

      {notifications.length === 0 ? (
        <Text style={styles.noNotifications}>No new notifications</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
      </View>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notificationCard: {
    backgroundColor: "#e6f7e6",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2b7a2b",
  },
  timestamp: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  noNotifications: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});

export default Notifications;
