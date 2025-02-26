import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HelpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help Center</Text>
      <Text style={styles.subtitle}>How can we assist you today?</Text>

      {/* FAQ Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Q: How do I detect plant diseases?</Text>
          <Text style={styles.faqAnswer}>A: Use the disease detection feature in the app and upload an image of the plant leaf for analysis.</Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Q: How can I track my orders?</Text>
          <Text style={styles.faqAnswer}>A: Go to 'Your Orders' from the app menu to view the status of your orders.</Text>
        </View>

        {/* New Question */}
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Q: How do I change my language preference?</Text>
          <Text style={styles.faqAnswer}>A: You can change your language preference in the settings section of the app.</Text>
        </View>
      </View>

      {/* Contact Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need More Help?</Text>
        <Text style={styles.text}>If you need further assistance, please contact our support team.</Text>
        <TouchableOpacity style={styles.button} onPress={() => alert('Contacting Support')}>
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>

      {/* Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Useful Links</Text>
        <TouchableOpacity style={styles.link} onPress={() => alert('Navigating to Terms')}>
          <Text style={styles.linkText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => alert('Navigating to Privacy Policy')}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f7fc',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#7b7b7b',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  faqItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3, // Adding shadow to the button for a raised effect
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#2E7D32',
    textDecorationLine: 'underline',
  },
});

export default HelpScreen;