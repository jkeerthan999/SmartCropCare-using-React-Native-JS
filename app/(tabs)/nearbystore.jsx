import React from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


// Handle location function
const handleLocation = (locationUrl) => {
  Linking.openURL(locationUrl);
};

const stores = [
  {
    id: '1',
    name: 'Srinivasa Seed & Fertilizer',
    location: 'Secunderabad',
    rating: 4.5,
    image: '',
    locationUrl: 'https://maps.app.goo.gl/dv9GoejeJpL5dNd5A?g_st=ac/Secunderabad', // Specific location URL
  },
  {
    id: '2',
    name: 'RythuMitra Farms',
    location: 'Nizampet Rd,Addagutta,Samatha Nagar',
    rating: 4.5,
    image: 'https://content.jdmagicbox.com/v2/comp/hyderabad/l3/040pxx40.xx40.171217204008.v6l3/catalogue/rythu-mitra-products-nizampet-hyderabad-rice-retailers-3krcro1yyq.jpg',
    locationUrl: 'https://maps.app.goo.gl/JXaQYQGYXkfYERUj7?g_st=acr', // Specific location URL
  },
  {
    id: '3',
    name: 'Sri Laxmi Seeds',
    location: 'ECIL Main Rd',
    rating: 4.3,
    image: 'https://content.jdmagicbox.com/comp/khammam/q5/9999p8742.8742.140420204646.i4q5/catalogue/sri-laxmi-seeds-and-pesticides-khammam-ho-khammam-pesticide-dealers-9muf7zun62.jpg',
    locationUrl: 'https://maps.app.goo.gl/Bb6e6EyPNrAnEHzP6?g_st=ac', // Specific location URL
  },
  {
    id: '4',
    name: 'Sri Sai Gangothri Fertilizer and Seeds',
    location: 'Hayathnagar',
    rating: 4.1,
    image: 'https://content.jdmagicbox.com/v2/comp/rangareddy/h6/040pxx40.xx40.161118175055.d7h6/catalogue/sri-sai-gangothri-fertilizers-hayath-nagar-rangareddy-fertilizer-dealers-klnzinpoin-250.jpg',
    locationUrl: 'https://maps.app.goo.gl/6ydgzv64TySxBggm8?g_st=ac', // Specific location URL
  },
  {
    id: '5',
    name: 'Hindustan Seeds And Fertilizers',
    location: 'HydergudaBasheerbagh',
    rating: 4.5,
    image: 'https://images.jdmagicbox.com/v2/comp/delhi/14/011p2033314/catalogue/hindustan-seeds-pesticides-old-subzi-mandi-delhi-seed-manufacturers-wuvb0n32ge.jpg',
    locationUrl: 'https://maps.app.goo.gl/QsSgoEJrnWjPhpp8A?g_st=ac', // Specific location URL
  },
  {
    id: '6',
    name: 'Om Sri Sai seeds fertilizer and pesticides',
    location: 'keesaragutta',
    rating: 5.0,
    image: 'https://content.jdmagicbox.com/comp/nirmal/c9/9999p8732.8732.101117140129.d9c9/catalogue/sri-sai-agri-services-nirmal-rjwozgvoxy.jpg',
    locationUrl: 'https://maps.app.goo.gl/Cxx6qdz4goJGkyTc8', // Specific location URL
  },
  {
    id: '7',
    name: 'Vasundhara Seeds & Pesticdes',
    location: 'L.B.Nagar',
    rating: 4.7,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT28_ubdAZCyaIiP7sw9XQJ7mTA77VWYvmDkQ&s',
    locationUrl: 'https://maps.app.goo.gl/Xx9hQoSu5Gy2kZ7f7', // Specific location URL
  },
  
];

const StoreItem = ({ store }) => (
  <View style={styles.card}>
    <Image source={{ uri: store.image }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.name}>{store.name}</Text>
      <Text style={styles.location}>{store.location}</Text>
      <Text style={styles.rating}>⭐ {store.rating}</Text>
    </View>
    <TouchableOpacity style={styles.button} onPress={() => handleLocation(store.locationUrl)}>
      <Text style={styles.buttonText}>Location</Text>
    </TouchableOpacity>
  </View>
);

export default function App() {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search in here" />
        <TouchableOpacity>
          <Icon name="plus-circle" size={24} color="green" />
        </TouchableOpacity>
      </View>

      {/* Store List */}
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoreItem store={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E8F5E9',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: 'gray',
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
