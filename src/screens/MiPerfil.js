import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, FlatList, Text, View } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      userPosts: [], 
      msg: "", 
    };
  }

  componentDidMount() {
    const user = auth.currentUser;

    if (!user) {
      this.props.navigation.navigate("Login");
    } else {

      db.collection("users")
        .where("email", "==", user.email) 
        .onSnapshot((docs) => {
          let userData = [];
          docs.forEach((doc) => {
            userData.push(doc.data());
            this.setState({ email: userData[0].email})
            this.setState({ username: userData[0].username})
          });
        });

      db.collection("posts")
        .where("email", "==", user.email)
        .onSnapshot((docs) => {
          let posts = [];
          docs.forEach((doc) => {
            posts.push({
              id: doc.id,
              data: doc.data(),
            }); 
          });
          this.setState({ userPosts: posts });
        });
    }
  }

  handleLogout() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  }

  deletePost(postId) {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        this.setState({ msg: "El post fue eliminado correctamente." });
      })
      .catch((error) => {
        console.error("Error al borrar el post:", error);
        this.setState({ msg: "Hubo un problema al borrar el post." });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileInfo}>
          <Text style={styles.title}>{this.state.username}</Text>
          <Text style={styles.text}>{this.state.email}</Text>
          <Text style={styles.text}>Cantidad de posteos: {this.state.userPosts.length}</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        {this.state.msg && <Text style={styles.msg}>{this.state.msg}</Text>}
        <FlatList
          style={styles.flatlist}
          data={this.state.userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              data={item.data}
              type="delete"
              onDelete={() => this.deletePost(item.id)}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 100,
    marginTop: 10,
    maxWidth: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  msg: {
    color: "green",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
  flatlist: {
    marginTop: 10,
  },
});

export default MiPerfil;