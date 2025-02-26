import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}> {/* Added ScrollView */}
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>&lt; Back</Text>
        </TouchableOpacity>

        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/ai1.jpg')} // Replace with your image path
            style={styles.cornImage}
          />                                                                      
          <View style={styles.headerTextContainer}>
            <Text style={styles.cornLeafText}>AI Detector</Text>
            <Text style={styles.identifierText}></Text>
          </View>
        </View>

        {/* Disease Info Section */}
        <View style={styles.diseaseInfo}>
          <Text style={styles.diseaseTitle}>Yellow leaf disease</Text>
          <Text style={styles.diseaseDescription}>
            Yellow Leaf Disease (YLD) in sugarcane is a viral disease caused by the
            Sugarcane yellow leaf virus (SCYLV). It primarily affects the leaves, causing
            them to turn yellow, especially on the midrib, which can spread across the
            leaf. As the disease progresses, affected plants may experience stunted growth
            and reduced sugar content, leading to significant yield losses.
          </Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Chat With an Expert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Call an Expert</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );  
  
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  cornImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 10,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  cornLeafText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  identifierText: {
    fontSize: 16,
    color: '#000000',
  },
  diseaseInfo: { // Style for the disease information section
    marginBottom: 40,
  },
  diseaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  diseaseDescription: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24, // Improve readability
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%', // Buttons take full width
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;