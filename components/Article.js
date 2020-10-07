import React from "react";
import { View, StyleSheet, Image, Button, Text, Linking } from "react-native";

import moment from "moment";

const Article = ({ article }) => {
  const buttonHandler = () => {
    Linking.canOpenURL(article.url).then((supported) => {
      if (supported) {
        Linking.openURL(article.url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  return (
    <View style={styles.article}>
      <Text style={styles.title}>{article.title}</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: article.urlToImage }}
          resizeMode="contain"
        />
        <Text style={styles.source}>Source : {article.source.name}</Text>
      </View>
      <Text style={styles.description}>{article.description}</Text>
      <Text style={styles.publishedAt}>
        Published at : {moment(article.publishedAt).format("LLL")}
      </Text>
      <View style={styles.button}>
        <Button title="Read more" onPress={buttonHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  article: {
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  title: { fontSize: 22, fontWeight: "bold" },
  image: { height: 250, width: "100%" },
  description: {
    paddingBottom: 3,
  },
  publishedAt: {
    color: "grey",
  },
  source: {
    color: "black",
    fontWeight: "bold",
    paddingBottom: 3,
  },
  button: {
    paddingBottom: 5,
    paddingTop: 5,
  },
});

export default Article;
