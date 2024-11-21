import React, {Component} from 'react'
import { TouchableOpacity } from 'react-native';
import { Text, TextInput, View, StyleSheet, ActivityIndicator } from 'react-native-web'
import { auth } from '../firebase/config'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
      error: false,
      loading: true,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged( user => {
      console.log(user);
      if (user) {
        this.props.navigation.navigate('HomeMenu')
      } else {
        this.setState({loading: false})
      }
    })
  }

  onSubmit(email, pass) {
    if (!this.state.email.includes('@') || this.state.pass.length < 6) {
      this.setState({ error: 'El email o la contraseña no son válidos' })
    } else {
      auth.signInWithEmailAndPassword(email, pass)
        .then(res => {
          this.props.navigation.navigate('HomeMenu');
        })
        .catch(err => {
          this.setState({ error: 'Fallo en el logueo' })
          console.log(err);
        })
    }
  }

  render() {
    if (this.state.loading) {
      return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      )
    } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pagina Login</Text>

        {this.state.error && <Text style={styles.error}>Hay un error en el Login</Text>}

        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder='Introducí tu correo electrónico'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Escribí tu contraseña'
          onChangeText={text => this.setState({ pass: text })}
          value={this.state.pass}
        />

        <TouchableOpacity style={styles.btn} onPress={() => this.onSubmit(this.state.email, this.state.pass)}>
          <Text style={styles.btnText} >Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.btnText} >Registrate acá</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  btn: {backgroundColor: "#007BFF", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 20, },
  btnText: { color: "#FFF", fontSize: 16 },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
  link: { color: "blue", textAlign: "center" },
});



export default Login;
