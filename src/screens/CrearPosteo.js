import React, { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from "react-native";
import { auth, db } from "../firebase/config";

class CrearPosteo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postContent: "",
      postTitle: "",
      msg: "",
      greenMsg: ""
    };
  }

  componentDidMount() {
    const user = auth.currentUser;
    if (!user) {
      this.props.navigation.navigate("Login");
    }
  }

  createPost() {
    const postContent = this.state.postContent;
    const postTitle = this.state.postTitle;

    if (postContent === "" || postTitle === "") {
      this.setState({ msg: "Todos los campos son obligatorios." });
      return;
    }

    const user = auth.currentUser;
    db.collection("posts")
      .add({
        title: postTitle,
        content: postContent,
        email: user.email,
        createdAt: Date.now(),
        likes: [],
      })
      .then(() => {
        this.setState({
          postContent: "",
          postTitle: "",
          greenMsg: "El posteo se creó correctamente.",
        });
        this.props.navigation.navigate("HomeMenu");
      })
      .catch((error) => {
        console.error("Error al crear el posteo:", error);
        this.setState({ msg: "Hubo un problema al crear el posteo." });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Crear Posteo </Text>
        {this.state.msg && (
          <Text style={styles.msg}>{this.state.msg}</Text>
        )}
        {this.state.greenMsg && (
          <Text style={styles.greenMsg}>{this.state.greenMsg}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Título..."
          value={this.state.postTitle}
          onChangeText={(text) => this.setState({ postTitle: text })}
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="..."
          value={this.state.postContent}
          onChangeText={(text) => this.setState({ postContent: text })}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.createPost()}>
          <Text style={styles.buttonText}> Postear </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1C",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#E0E0E0"
  },
  msg: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  greenMsg: {
    color: "green",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#555555",
    color: "#E0E0E0",
    outlineStyle: "none",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CrearPosteo;