import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import Constants from "expo-constants";

import Article from "./components/Article";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [articles, setArticles] = useState([]);

  const API_KEY = `bb2794928de444fe8ff141aadb460c70`;

  const getNews = async () => {
    try {
      const response = await fetch(
        `http://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&page=${page}`
      );
      const data = await response.json();
      setArticles([...articles, ...data.articles]);
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getNews(1);
    setIsLoading(false);
  }, []);

  const endPageHandler = () => {
    console.log(page);
    setIsLoading(true);
    setpage(page + 1);
    getNews();
    setIsLoading(false);
  };

  const renderItem = ({ item }) => <Article article={item} />;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="black" size="large" />
      </View>
    );
  }

  const ListFooterComponent = () => {
    return <ActivityIndicator color="black" size="large" animating={true} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={endPageHandler}
        onEndReachedThreshold={0.8}
        style={styles.listArticle}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  loadingArticle: {
    flex: 0.1,
  },
  listArticle: {
    flex: 1,
  },
});
