import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Alert, ImageBackground, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  // Ensure the correct import path

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const validate = () => {
    if (email === "" || password === "") {
      Alert.alert("Please fill all the fields");
      return false;
    }
    return true;
  }

  const handleGoogleLogin = () => {
    Linking.openURL('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&osid=1&passive=1209600&service=mail&ifkv=AVdkyDloKXL2ErjwAxchRI_nxZirx3ESzPZ2Eqv7aJ0nCUIarOrLiWztW9mP52f6kyzMzgESc3tCGA&ddm=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
  }

  const handleFacebookLogin = () => {
    Linking.openURL('https://www.facebook.com/');
  }

  const handleSubmit = () => {
    if (!validate()) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
        router.replace("/(tabs)/home");  // Use router.push for navigation
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Email already exists. Please login instead.");
        }
      });
  }

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); 

  return (
    <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}>
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: 700 }}>Sign Up</Text>
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
          style={styles.input}
          keyboardType='email-address'
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.btn}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Image 
              source={require('../../assets/google.jpg')} // Ensure correct path to image
              style={styles.socialIcon} 
            />
            <Text style={styles.socialButtonText}>Sign Up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
            <Image 
              source={require('../../assets/fg.jpg')}  // Ensure correct path to image
              style={styles.socialIcon} 
            />
            <Text style={styles.socialButtonText}>Sign Up with Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", marginHorizontal: 14 }}>
          <Text style={{ marginTop: 20, alignSelf: "center", color: "gold", fontSize: 20 }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={{ marginTop: 20, alignSelf: "center", color: "white", paddingLeft: 10, fontSize: 20 }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    height: 50,
    color: "black",
    fontSize: 18,
  },
  btn: {
    backgroundColor: "gold",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    fontWeight: 700,
  },
  socialLoginContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 88,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10, // Add margin bottom here to create space between the buttons
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    color: '#333',
  },
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", 
    top: 0,
    left: 0,
  },
});

export default Signup;
