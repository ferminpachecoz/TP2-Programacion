import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.data.likes || [],
      likedByUser: props.data.likes ? props.data.likes.includes(auth.currentUser) : false,
    };
  }

  actualizarLikes() {
    const postId = this.props.postId
    const userEmail = auth.currentUser.email

    console.log("ID del post:", postId);
    console.log("Email del usuario:", userEmail);

    if (this.state.likedByUser) {
      db.collection('posts').doc(postId).update({
        likes: firebase.firestore.FieldValue.arrayRemove(userEmail)
      }).then(() => {
        const updatedLikes = this.state.likes.filter(email => email !== userEmail)
        this.setState({
          likes: updatedLikes,
          likedByUser: false
        });
      });
    } else {
      db.collection('posts').doc(postId).update({
        likes: firebase.firestore.FieldValue.arrayUnion(userEmail)
      }).then(() => {
        const updatedLikes = this.state.likes.concat(userEmail)
        this.setState({
          likes: updatedLikes,
          likedByUser: true
        })
      })
    }
  }

  render() {

    const data = this.props.data
    const type = this.props.type
    const onDelete = this.props.onDelete

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{data.email}</Text>
        <View style={styles.wrapper}>
          <Text style={styles.text}>{data.content}</Text>

          {type === "delete" && (
            <TouchableOpacity style={styles.button} onPress={onDelete}>
              <Text>Borrar</Text>
            </TouchableOpacity>
          )}

          {type === "likes" && (
          <View style={styles.likeContainer}>
            <Text style={styles.likeCount}>{this.state.likes.length} likes</Text>
            <TouchableOpacity onPress={() => this.actualizarLikes()}>
              <Text style={styles.likeButton}>
                {this.state.likedByUser ? "Quitar Like" : "Dar Like"}
              </Text>
            </TouchableOpacity>
          </View>
          )}

        </View>
        <Text style={styles.fecha}>
          {new Date(data.createdAt).toLocaleDateString()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  wrapper: {
    marginVertical: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
  },
  button: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  fecha: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 10,
    textAlign: "right",
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  likeCount: {
    fontSize: 14,
    color: "#555",
  },
  likeButton: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
  },
});



export default Post;
