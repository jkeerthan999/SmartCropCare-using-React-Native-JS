import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, Button, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Picker } from "@react-native-picker/picker";

const API_KEY = "b60ff2d5471058169c82f0158f2f23e1"; // Replace with your actual GNews API key

export default function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("agriculture");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchNews(1); // Load first page of news when category changes
  }, [selectedCategory]);

  const fetchNews = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${selectedCategory}&lang=en&country=in&apikey=${API_KEY}&page=${pageNumber}`
      );
      const data = await response.json();

      if (data.articles) {
        setNews((prevNews) => [...prevNews, ...data.articles]); // Append new articles
      } else {
        console.error("No more articles found");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  // Load More News
  const loadMoreNews = () => {
    setPage((prevPage) => prevPage + 1);
    fetchNews(page + 1);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Category Picker */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => {
          setSelectedCategory(itemValue);
          setNews([]); // Clear old news
          setPage(1);
          fetchNews(1);
        }}
      >
        <Picker.Item label="Agriculture" value="agriculture" />
        <Picker.Item label="Organic Farming" value="organic" />
        <Picker.Item label="AgriTech" value="agritech" />
        <Picker.Item label="Crop Management" value="crop" />
      </Picker>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="green" />}

      {/* News List with Images and Read More Button */}
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.newsImage} />
            ) : (
              <Text style={styles.noImageText}>No Image Available</Text>
            )}
            <Text style={styles.newsTitle}>{item.title || "No Title Available"}</Text>
            <Text style={styles.newsDescription}>
              {item.description || "No Description Available"}
            </Text>

            {/* Read More Link */}
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Load More Button */}
      <Button title="Load More News" onPress={loadMoreNews} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  newsImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  newsDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  readMoreText: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  noImageText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    marginBottom: 10,
  },
});
