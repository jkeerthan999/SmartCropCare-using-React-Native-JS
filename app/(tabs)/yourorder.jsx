import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons

const orders = []; // Empty list to show "No orders yet!"

const OrdersScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No orders yet!</Text>
          <Text style={styles.subText}>Your recent orders will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.orderItem} onPress={() => navigation.navigate('OrderDetails', { order: item })}>
              <View>
                <Text style={styles.productName}>{item.product}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
              </View>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  subText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#777',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
});

export default OrdersScreen;