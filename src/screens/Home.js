import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Post from '../components/Post';
import { auth, db } from "../firebase/config";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: []
    }
  }
  componentDidMount() {
    const user = auth.currentUser;
    if (!user) {
      this.props.navigation.navigate("Login");
    }
    db.collection("posts").onSnapshot(
      docs => {
        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          posteos: posts
        })
      }
    )

  }
  handleChange(text) {
    let pos = this.state.posteos;
    if (text) {
      let ax = pos.filter(item => {
        return item.data.title.toLowerCase().includes(text.toLowerCase()) || item.data.content.toLowerCase().includes(text.toLowerCase())
      })
      this.setState({
        posteos: ax
      })
    } else {
      db.collection("posts").onSnapshot(
        docs => {
          let posts = []
          docs.forEach(doc => {
            posts.push({
              id: doc.id,
              data: doc.data()
            })
          })
          this.setState({
            posteos: posts
          })
        }
      )
    }
  }
  render() {
    console.log(this.state.posteos);

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            keyboardType='default'
            placeholder='Buscar posteo...'
            onChangeText={text => this.handleChange(text)}
          />
        </View>
        <FlatList
          style={styles.flatlist}
          data={this.state.posteos}
          keyExtractor={item => item.id.toString()}
          renderItem={
            ({ item }) => <Post
              data={item.data}
              postId={item.id}
              type="likes"
            />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: "#1C1C1C"
  },
  flatlist: {
    width: "100%",
    flex: 1
  },
  wrapper: {
    padding: 15,
    width: "100%"
  },
  input: {
    width: "100%",
    border: "1px solid #007bff",
    padding: 10,
    borderRadius: 15,
    color: "#E0E0E0",
    backgroundColor: "#555555",
    outlineStyle: "none",
  },
});

export default Home