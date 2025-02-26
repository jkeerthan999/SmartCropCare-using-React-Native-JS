import React, { useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, ScrollView, BackHandler, Alert 
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Video } from 'expo-av'; 
import HelpScreen from "./help";  
import SettingsScreen from "./settings";  

// ✅ Home Screen with BackHandler to Exit on Back Press
const HomeScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit App",
          "Do you want to exit?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Exit", onPress: () => BackHandler.exitApp() }
          ]
        );
        return true; // Prevent default back behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SMARTCROPCARE</Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.dealSection}>
        <Text style={styles.dealTitle}>About Us</Text>
        <Text style={styles.discount}>EMPOWERING FARMERS</Text>
        <Text style={styles.dealDesc}>
          We are committed to revolutionizing agriculture through technology. Our mission is to empower farmers with AI-driven disease detection.
        </Text>

        {/* Video Background */}
        <Video
          source={require('../../assets/bgg.mp4')} 
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.videoBackground}
        />
      </View>

      {/* Features Section */}
      <View style={styles.features}>
        <FeatureButton title="Disease Detection" icon="search" onPress={() => navigation.navigate('diseasedetection')} />
        <FeatureButton title="News" icon="article" onPress={() => navigation.navigate('news')} />
        <FeatureButton title="Weather" icon="cloud" onPress={() => navigation.navigate('weather')} />
        <FeatureButton title="Nearby Stores" icon="store" onPress={() => navigation.navigate('nearbystore')} />
        <FeatureButton title="Our Store" icon="shopping-bag" onPress={() => navigation.navigate('ourstore')} />
        <FeatureButton title="Your Orders" icon="shopping-cart" onPress={() => navigation.navigate('yourorder')} />
      </View>
    </ScrollView>
  );
};

// Feature Button Component
const FeatureButton = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.featureButton} onPress={onPress}>
    <Icon name={icon} size={24} color="#fff" />
    <Text style={styles.featureButtonText}>{title}</Text>
  </TouchableOpacity>
);

// Drawer Navigator
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 },
  logo: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32' },
  dealSection: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  dealTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  discount: { fontSize: 24, fontWeight: 'bold', color: '#D32F2F', marginVertical: 5 },
  dealDesc: { fontSize: 14, textAlign: 'center', color: '#555', marginBottom: 10 },
  features: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  featureButton: {
    backgroundColor: '#2E7D32',
    width: '48%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  featureButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  videoBackground: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default App;