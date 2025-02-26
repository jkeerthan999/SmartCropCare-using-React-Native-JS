import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { identifyPlant } from './plantApi'; // API function

const DiseaseScreen = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const openCamera = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera access is required to capture images.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzePlant(result.assets[0].base64);
    }
  };

  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Gallery access is required to select images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzePlant(result.assets[0].base64);
    }
  };

  const analyzePlant = async (base64Image) => {
    setLoading(true);
    const response = await identifyPlant(base64Image);
    setResult(response);
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌿 Plant Disease Detection</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>📷 Scan with Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>📁 Upload from Gallery</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#2E7D32" />}

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Detection Result</Text>
          <Text style={styles.resultText}><Text style={styles.bold}>Plant:</Text> {result.suggestions[0]?.plant_name || 'Unknown'}</Text>
          <Text style={styles.resultText}><Text style={styles.bold}>Scientific Name:</Text> {result.suggestions[0]?.scientific_name || 'N/A'}</Text>
          <Text style={styles.resultText}><Text style={styles.bold}>Probability:</Text> {Math.round(result.suggestions[0]?.probability * 100) || '0'}%</Text>

          {result.suggestions[0]?.disease ? (
            <>
              <Text style={styles.resultText}><Text style={styles.bold}>Disease:</Text> {result.suggestions[0].disease.name}</Text>
              <Text style={styles.resultText}><Text style={styles.bold}>Symptoms:</Text> {result.suggestions[0].disease.symptoms || 'N/A'}</Text>
              <Text style={styles.resultText}><Text style={styles.bold}>Prevention:</Text> {result.suggestions[0].disease.prevention || 'N/A'}</Text>
              <Text style={styles.resultText}><Text style={styles.bold}>Treatment:</Text> {result.suggestions[0].disease.treatment || 'N/A'}</Text>
            </>
          ) : (
            <Text style={styles.resultText}>❌ No disease detected, but here are similar plants:</Text>
          )}

          {result.suggestions.slice(1, 4).map((suggestion, index) => (
            <Text key={index} style={styles.resultText}>
              🔍 {suggestion.plant_name} ({Math.round(suggestion.probability * 100)}% match)
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1B5E20' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  button: { backgroundColor: '#2E7D32', padding: 12, borderRadius: 10, flex: 1, marginHorizontal: 5, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  image: { width: 250, height: 250, marginTop: 20, borderRadius: 15, borderWidth: 2, borderColor: '#2E7D32' },
  resultContainer: { marginTop: 20, padding: 15, backgroundColor: '#FFF', borderRadius: 10, width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 },
  resultTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#1B5E20' },
  resultText: { fontSize: 16, marginBottom: 5 },
  bold: { fontWeight: 'bold', color: '#1B5E20' },
});

export default DiseaseScreen;