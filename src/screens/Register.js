import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
      username: "",
      error: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      }
    });
  }

  onSubmit(email, pass, username) {
    if (!email || !pass || !username) {
      this.setState({ error: "Complete todos los campos." });
    } else if (!email.includes("@")) {
      this.setState({ error: "El email debe contener '@'." });
    } else {
      auth.createUserWithEmailAndPassword(email, pass)
        .then((res) => {
          const user = res.user;
          db.collection("users")
            .add({
              email: user.email,
              username: username,
              createdAt: Date.now(),
            })
            .then(() => {
              this.props.navigation.navigate("Login");
            });
        })
        .catch((err) => {
          this.setState({ error: err.message });
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>
        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email..."
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario..."
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña..."
          secureTextEntry
          onChangeText={(text) => this.setState({ pass: text })}
          value={this.state.pass}
        />
        <TouchableOpacity
          onPress={() => this.onSubmit(this.state.email, this.state.pass, this.state.username)}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Registrarme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={styles.link}>¿Ya estás registrado? Inicia sesión aquí</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  btn: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5, alignItems: "center" },
  btnText: { color: "#FFF", fontSize: 16 },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
  link: { color: "blue", marginTop: 10, textAlign: "center" },
});

export default Register;