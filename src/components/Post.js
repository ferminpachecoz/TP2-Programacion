import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Post({ data, type, onDelete }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.email}</Text>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{data.content}</Text>

        {type === "delete" && (
          <TouchableOpacity
            style={styles.button}
            onPress={onDelete} 
          >
            <Text> Borrar </Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.fecha}>
        {new Date(data.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    border: "1px solid black",
    margin: "10px",
    borderRadius: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    paddingRight: 15,
    fontSize: 14,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    padding: "none"
  },
  button: {
    border: "1px solid black",
    alignSelf: "flex-start",
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 15,
  },
  fecha: {
    color: "gray",
  },
});