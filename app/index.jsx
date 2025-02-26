import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Video } from 'expo-av'; // Corrected import

export default function Page() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Get screen width and height

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.container}>
        {/* Video component for background */}
        <Video
          source={require('../assets/1logo.mp4')} // Corrected relative path
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={[styles.videoBackground, { width: screenWidth, height: screenHeight }]} // Full-screen video
        />
        {/* Button overlay on top of the video */}
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")} style={styles.btn}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },

  videoBackground: {
    position: "absolute", // Ensure it takes the full screen and everything else can overlay
    top: 0,
    left: 0,
  },

  btn: {
    backgroundColor: "black",
    width: 200,
    alignItems: "center",
    borderRadius: 10,
    position: "absolute", // Overlay button over the video
    bottom: 30, // Position the button closer to the bottom of the screen
    paddingVertical: 5,
  },

  btnText: {
    color: "green", 
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  }
});
