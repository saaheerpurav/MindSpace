import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import * as Speech from 'expo-speech';

export default class Screen3 extends React.Component {
  constructor(){
    super();
    this.state={
      word: "",
      toVal: 0,
      busy: false,
    }
    this.textPos = new Animated.Value(Dimensions.get("window").height);
  }

  showWord=(word)=>{
    if(!this.state.busy){
      this.setState({word: word, busy: true}, ()=>{
        Animated.timing(this.textPos, {
          toValue: this.state.toVal,
          duration: 1000,
          useNativeDriver: false,
        }).start(()=>{
          for(var letter of word){
            Speech.speak(letter);
          }
          Speech.speak(word);
          setTimeout(() => {
            Animated.timing(this.textPos, {
              toValue: Dimensions.get("window").height,
              duration: 1000,
              useNativeDriver: false,
            }).start(()=>{
              this.setState({busy: false});
            })
          }, 3000);
        });
      })
    }
  }

  render(){
    return(
      <View style={{height: '100%', backgroundColor: '#00c48c'}}>
        <Image source={require('../assets/logo.png')} style={{width: 80, height: 80, alignSelf: 'center', marginTop: 20}} />
        <Text style={styles.description}>Click on an object to learn the word</Text>

        <View style={styles.container}>
          <TouchableOpacity onPress={()=>{this.showWord("Bat")}}>
            <Animated.Image source={require('../assets/words/bat.png')} style={styles.shape} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{this.showWord("Cat")}}>
            <Animated.Image source={require('../assets/words/cat.png')} style={styles.shape} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{this.showWord("Mat")}}>            
            <Animated.Image source={require('../assets/words/mat.png')} style={styles.shape} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{this.showWord("Rat")}}>            
            <Animated.Image source={require('../assets/words/rat.png')} style={styles.shape} />
          </TouchableOpacity>
        </View>

        <View style={{width: '80%', height: 2, backgroundColor: 'white', alignSelf: 'center', borderRadius: 50, zIndex: -1}} />

        <Animated.View style={{flex: 1, width: '100%', justifyContent: 'center', top: this.textPos}}
         onLayout={event => {
          const layout = event.nativeEvent.layout;
          this.setState({toValue: layout.y})
        }}>            
          <Text style={styles.word}>{this.state.word}</Text>
        </Animated.View>

        <TouchableOpacity style={[styles.button, {position: 'absolute', bottom: 10, left: 10, width: 100}]}
        onPress={()=>{this.props.navigation.navigate("ActivitySelectScreen")}} >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen4")}} >
          <Text style={styles.buttonText}>Next</Text>
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
    width: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  buttonText:{
    color: '#00c48c',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  description:{
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center'
  },
  shape:{
    width: 70,
    height: 70,
    alignSelf: 'center',
    margin: Dimensions.get("window").width/17,
    zIndex: -100,
  },
  container:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    flexWrap: 'wrap',
  },
  word:{
    fontSize: 70,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
  }
});