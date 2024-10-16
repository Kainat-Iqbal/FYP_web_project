import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';

const SideNavBar = ({ onClose }) => {
    const router = useRouter();

    const navigateTo = (screen) => {
        router.push(screen); // Use router.push for navigation
        onClose(); // Close sidebar after navigation
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://172.31.242.169:8081/logout", {}, {
                withCredentials: true,
            });
            // Navigate to Login page after logout
            router.push('/Login'); // Update to the correct path for your login screen
        } catch (error) {
            console.error("Error during logout:", error);
            Alert.alert("Logout Failed", "An error occurred while logging out. Please try again.");
        } finally {
            onClose(); // Close sidebar
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.topBarTitle}>Menu</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Menu Options */}
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/StudentHome')}>
                <Ionicons name="home-outline" size={24} color="#333" />
                <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Proforma')}>
                <Ionicons name="analytics-outline" size={24} color="#333" />
                <Text style={styles.menuText}>Proforma</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Insights')}>
                <Ionicons name="bar-chart-outline" size={24} color="#333" />
                <Text style={styles.menuText}>Insights</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Chatbot')}>
                <Ionicons name="chatbubble-outline" size={24} color="#333" />
                <Text style={styles.menuText}>Chatbot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Notifications')}>
                <Ionicons name="notifications-outline" size={24} color="#333" />
                <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="#333" />
                <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#93C098',
        paddingTop: 40,
    },
    topBar: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#5A9B83',
    },
    topBarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    closeButton: {
        padding: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#fff',
    },
});

export default SideNavBar;
