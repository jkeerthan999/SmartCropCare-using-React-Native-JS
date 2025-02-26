import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About SMARTCROPCARE</Text>
      <Text style={styles.description}>
        At <Text style={styles.bold}>SMARTCROPCARE</Text>, we are committed to revolutionizing agriculture through technology. 
        Our mission is to empower farmers with <Text style={styles.bold}>AI-driven disease detection, real-time agricultural news, 
        expert consultations, and smart e-commerce solutions</Text>—all in one convenient mobile app.
      </Text>

      <Text style={styles.subtitle}>Why SMARTCROPCARE?</Text>
      <Text style={styles.listItem}>• <Text style={styles.bold}>AI-Powered Disease Detection:</Text> Simply scan a leaf, and our advanced AI will identify potential diseases and suggest remedies.</Text>
      <Text style={styles.listItem}>• <Text style={styles.bold}>Real-Time Agricultural News:</Text> Stay updated with the latest trends, policies, and market insights.</Text>
      <Text style={styles.listItem}>• <Text style={styles.bold}>Expert Consultation:</Text> Connect with agricultural experts for personalized guidance.</Text>
      <Text style={styles.listItem}>• <Text style={styles.bold}>Nearby Stores & E-commerce:</Text> Find agricultural products, fertilizers, and tools from trusted stores and online vendors.</Text>

      <Text style={styles.footer}>
        At <Text style={styles.bold}>SMARTCROPCARE</Text>, we believe in bridging the gap between farmers and technology, making agriculture smarter, 
        more sustainable, and more productive. Join us on our journey to revolutionize farming!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#388E3C',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 10,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'left',
  },
  bold: {
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  footer: {
    fontSize: 16,
    color: '#4A4A4A',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default AboutUsScreen;
