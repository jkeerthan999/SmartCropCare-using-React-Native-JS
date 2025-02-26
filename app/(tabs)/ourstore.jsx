import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const products = [
  {
    id: '1',
    name: 'Urea Fertilizer',
    price: 299,
    originalPrice: 599,
    discount: '50% off',
    rating: 4.0,
    reviews: 29,
    image: require('../../assets/urea.jpeg'), // Replace with actual image path
  },
  {
    id: '2',
    name: 'Wheat Seeds.',
    price: 299,
    originalPrice: 899,
    discount: '67% off',
    rating: 4.1,
    reviews: 4300,
    image: require('../../assets/wheat seeds.jpg'),
  },
  {
    id: '3',
    name: 'Organic Manure',
    price: 178,
    originalPrice: 199,
    discount: '11% off',
    couponPrice: 160,
    rating: 4.0,
    reviews: 9100,
    image: require('../../assets/manure.webp'),
  },
  {
    id: '4',
    name: 'Hybrid Rice Seeds',
    price: 453,
    originalPrice: 999,
    discount: '55% off',
    rating: 4.1,
    reviews: 5143,
    image: require('../../assets/hybrid.jpg'),
  },
  {
    id: '5',
    name: 'Pesticide Spary',
    price: 451,
    originalPrice: 999,
    discount: '55% off',
    rating: 4.1,
    reviews: 3343,
    image: require('../../assets/spray.webp'),
  },
  {
    id: '6',
    name: 'Orgamify Premium Vermicompost for Healthy Plants - Organic Soil Enrichment for Gardening & Indoor Plants | Eco- Friendly Fertilizer for Plant Parents & Home Gardeners (1Kg)',
    price: 199,
    originalPrice: 299,
    discount: '33% off',
    rating: 5,
    reviews: 7,
    image: require('../../assets/bbb.jpg'),
  },
];

const OrderScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price} <Text style={styles.strike}>₹{item.originalPrice}</Text> ({item.discount})</Text>
        {item.couponPrice && <Text style={styles.coupon}>Buy for ₹{item.couponPrice} with coupon</Text>}
        <Text style={styles.rating}>⭐ {item.rating} ({item.reviews} reviews)</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={products} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  image: { width: 100, height: 100, borderRadius: 5 },
  details: { flex: 1, marginLeft: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#333', marginTop: 5 },
  strike: { textDecorationLine: 'line-through', color: '#999' },
  coupon: { fontSize: 12, color: 'green', marginTop: 5 },
  rating: { fontSize: 12, color: '#555', marginTop: 5 },
  button: { backgroundColor: '#ffd700', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
  buttonText: { fontWeight: 'bold', color: '#000' },
});

export default OrderScreen;