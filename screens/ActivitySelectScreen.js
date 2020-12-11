import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class ActivitySelectScreen extends React.Component {
  render(){
    return (
      <View style={{height: '100%', alignItems: 'center', backgroundColor: '#faae19', justifyContent: 'center'}}>
        <Image source={require('../assets/logo.png')} style={{width: 80, height: 80}} />

        <Text style={styles.description}>Select Activity</Text>

        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen1")}}>
          <Text style={styles.buttonText}>Activity 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen2")}}>
          <Text style={styles.buttonText}>Activity 2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen3")}}>
          <Text style={styles.buttonText}>Activity 3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen4")}}>
          <Text style={styles.buttonText}>Activity 4</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    borderWidth: 3,
    borderRadius: 50,
    borderColor: 'white',
    padding: 7,
    margin: 10,
    width: '60%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonText:{
    color: '#faae19',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  description:{
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 30,
  },
});
