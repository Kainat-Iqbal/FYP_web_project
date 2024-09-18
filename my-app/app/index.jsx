import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link} from 'expo-router';
import Profile from './profile';

export default function App() {
    const [student, setStudent] = useState([]);
    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const res = await axios.get("http://192.168.100.9:8081/student/View");
          setStudent(res.data);
          console.log("Successfuly fetched", res.data);
         

          // console.log("first",setStudent)
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchStudents();
    }, []);
   
  return (
    <View style={styles.container}>
      <Text>Academic Accelerator Pro78s8</Text>
      <Text>Academic Accelerator Pro788 </Text>
      
    {/*  <FlatList
        data={student}
        keyExtractor={(item) => item.studentId.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
          </View>
        )}
      /> */}
           
      <StatusBar style="auto" />
      <Link href="/profile" style={{color:"blue"}}>Go To Profile</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
