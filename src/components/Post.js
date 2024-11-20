import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native-web'

export default function Post({data, type}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{data.contenido}</Text>
        <TouchableOpacity style={styles.button}>
          {type=="default" && <Text style={styles.like}>Me gusta</Text>}
          {type=="delete" && <Text style={styles.like}>Borrar</Text>}
        </TouchableOpacity>
      </View>
      <Text style={styles.fecha}>{data.fechaPublicacion}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    padding: 20,
    border: "1px solid black",
    margin: "10px",
    borderRadius: 10
  },
  wrapper:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text:{
    paddingRight: 15,
    fontSize: 16
  },
  button:{
    border: "1px solid black",
    alignSelf: "flex-start",
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 15
  },
  like:{
    textTransform: "capitalize"
  },
  fecha:{
    color: "gray"
  }
})