import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState('Your Name');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedPhoto = await AsyncStorage.getItem('profilePhoto');
        if (storedName) setName(storedName);
        if (storedPhoto) setProfilePhoto(storedPhoto);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  const handleProfilePhotoChange = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel || response.errorCode) return;
      setProfilePhoto(response.assets[0].uri);
      AsyncStorage.setItem('profilePhoto', response.assets[0].uri);
    });
  };

  const handleEditProfile = () => {
    setNewName(name);
    setIsModalVisible(true);
  };

  const handleSaveName = async () => {
    setName(newName);
    await AsyncStorage.setItem('name', newName);
    setIsModalVisible(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear(); // Clears all stored data
    navigation.replace('index'); // Navigates back to the Index page
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleProfilePhotoChange} style={styles.profileImageContainer}>
          {profilePhoto ? (
            <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
          ) : (
            <Icon name="camera" size={40} color="#888" />
          )}
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsList}>
        {settingsOptions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.settingRow}>
            <Icon name={item.icon} size={20} color="#444" style={styles.settingIcon} />
            <Text style={styles.settingText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={20} color="white" style={styles.settingIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Editing Name */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            <TextInput 
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveName}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const settingsOptions = [
  { label: 'Favourites', icon: 'heart' },
  { label: 'Downloads', icon: 'download' },
  { label: 'Languages', icon: 'globe' },
  { label: 'Location', icon: 'map-pin' },
  { label: 'Subscription', icon: 'credit-card' },
  { label: 'Display', icon: 'monitor' },
  { label: 'Clear Cache', icon: 'trash-2' },
  { label: 'Clear History', icon: 'clock' }
];

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7F9FC' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  profileSection: { alignItems: 'center', marginBottom: 30 },
  profileImageContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
  profileImage: { width: '100%', height: '100%', borderRadius: 50 },
  name: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#222' },
  editProfileButton: { backgroundColor: '#2E7D32', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
  editProfileText: { color: 'white', fontWeight: 'bold' },
  settingsList: { backgroundColor: 'white', borderRadius: 10, paddingVertical: 10, elevation: 3 },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  settingIcon: { marginRight: 15 },
  settingText: { fontSize: 16, color: '#333' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#008000', padding: 15, marginTop: 10, borderRadius: 10, justifyContent: 'center' },
  logoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  saveButton: { backgroundColor: '#2E7D32', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
  saveButtonText: { color: 'white', fontWeight: 'bold' }
});

export default SettingsScreen;