import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import Constants from "expo-constants";

import Article from "./components/Article";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const API_KEY = `bb2794928de444fe8ff141aadb460c70`;

  const getNews = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
      );

      const data = await response.json();
      setData(data);
    } catch (e) {
      console.log("Error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNews();
  }, []);

  const renderItem = ({ item }) => <Article article={item} />;

  if (isLoading) {
    return (
      <View style={styles.loaddingContainer}>
        <ActivityIndicator color="black" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  loaddingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
