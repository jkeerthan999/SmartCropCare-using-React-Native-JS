import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'; // Import useRouter
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize router for navigation

  const handleSubmit = () => {
    if (!validate()) return;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
        router.replace("/(tabs)/home"); // Navigate to home after successful login
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert("Email or password is incorrect");
        }
      });
  };
  
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); 
  const validate = () => {
    if (email === "" || password === "") {
      Alert.alert("Please fill all the fields");
      return false;
    }

    // Simple email validation check (optional improvement)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}>
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: 700 }}>Login</Text>
      </View>
      
            <ImageBackground
              source={require('../../assets/5.png')}  // Ensure correct path
              style={[styles.imageBackground, { width: screenWidth, height: screenHeight }]} // Full-screen image
              imageStyle={styles.image} // Ensure image is resized properly
            >
              {/* Button overlay on top of the image */}
            </ImageBackground>

      <View style={{ marginHorizontal: 30 }}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 10, backgroundColor: "#FFFFFF", padding: 10, borderRadius: 10, height: 50, color: "black", fontSize: 18 }}
          keyboardType='email-address'
        />

        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          style={{ marginBottom: 10, backgroundColor: "#FFFFFF", padding: 10, borderRadius: 10, height: 50, color: "black", fontSize: 18 }}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: "gold", padding: 10, borderRadius: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Login</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginHorizontal: 14 }}>
          <Text style={{ marginTop: 20, alignSelf: "center", color: "gold", fontSize: 20 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ marginTop: 20, alignSelf: "center", color: "white", paddingLeft: 10, fontSize: 20 }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", 
    top: 0,
    left: 0,
  }

});

export default login;