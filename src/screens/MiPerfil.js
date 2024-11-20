import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList, Text, View } from 'react-native-web';
import database from "../../database"
import Post from '../components/Post';

export default function MiPerfil() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Nombre: Fermin Pacheco</Text>
        <Text style={styles.text}>Email: fermin@gmail.com</Text>
        <Text style={styles.text}>Username: ferminpacheco</Text>
        <Text style={styles.text}>Cantidad de Posteos: 8</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        style={styles.flatlist}
        data={database}
        keyExtractor={item => item.id.toString()}
        renderItem={({item})=> <Post data={item} type={"delete"} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    overflowY: "scroll"
  },
  button:{
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: "red",
  },
  buttonText:{
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600
  },
  text:{
    fontSize: 16,
    marginTop: 15
  }
})