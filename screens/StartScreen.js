import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class StartScreen extends React.Component {

  render(){
    return (
      <View style={{height: '100%', alignItems: 'center', backgroundColor: '#faae19'}}>
        <Image source={require('../assets/logo.png')} style={{width: 150, height: 150, marginVertical: 20,}} />

        <Text style={styles.title}>MindSpace</Text>
        <Text style={styles.description}>An app to help children deal with intellectual disabilities.</Text>

        <TouchableOpacity style={styles.button}
        onPress={()=>{this.props.navigation.navigate("ActivitySelectScreen")}}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title:{
    fontSize: 40,
    color: 'white',
    marginVertical: 10,
    fontFamily: 'Poppins-Bold',
  },
  description:{
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  button:{
    borderWidth: 3,
    borderRadius: 50,
    borderColor: 'white',
    padding: 7,
    width: '60%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'white',
  },
  buttonText:{
    color: '#faae19',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  }
});
