import React from 'react'
import firebase from 'firebase';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import database from "../../database"
import Post from '../components/Post';

export default function Home( {navigation} ) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>botón de prueba: ir a register (si no anda es porque estas logeado) </Text>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <TextInput 
          style={styles.input}
          keyboardType='default'
          placeholder='Buscar posteo...'
        />
      </View>
      <FlatList 
        style={styles.flatlist}
        data={database}
        keyExtractor={item => item.id.toString()}
        renderItem={
          ({item}) => <Post 
        data={item} 
        postId={item.id}
        type= "likes"
         />}
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
  },
  flatlist:{
    width: "100%",
    flex: 1
  },
  wrapper:{
    padding: 15,
    width: "100%"
  },
  input:{
    width: "100%",
    border: "1px solid gray",
    padding: 10,
    borderRadius: 15
  }
});