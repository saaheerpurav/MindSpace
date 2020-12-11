import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import Draggable from "../components/Draggable";

export default class Screen1 extends React.Component {
  constructor(){
    super();
    this.state={
      doneArr: [],
      ciPos: {x: 0, y: 0},
      trPos: {x: 0, y: 0},
      sqPos: {x: 0, y: 0},
      stPos: {x: 0, y: 0},
      ciKey: 2,
      trKey: 4,
      sqKey: 6,
      stKey: 8,
      shape1: require("../assets/shapes/circle.png"),
      shape2: require("../assets/shapes/square.png"),
      shape3: require("../assets/shapes/triangle.png"),
      shape4: require("../assets/shapes/star.png"),
    }
    this.ciOp = new Animated.Value(0);
    this.sqOp = new Animated.Value(0);
    this.trOp = new Animated.Value(0);
    this.stOp = new Animated.Value(0);
    this.bttonScale = new Animated.Value(1);
  }

  measure=()=>{
    setTimeout(()=>{
      this.triangle.measure((x, y, width, height, pageX, pageY)=>{
        this.setState({trPos: {...this.state.trPos, x: pageX, y: pageY}})
      })
      this.star.measure((x, y, width, height, pageX, pageY)=>{
        this.setState({stPos: {...this.state.stPos, x: pageX, y: pageY}})
      })
      this.circle.measure((x, y, width, height, pageX, pageY)=>{
        this.setState({ciPos: {...this.state.ciPos, x: pageX, y: pageY}})
      })
      this.square.measure((x, y, width, height, pageX, pageY)=>{
        this.setState({sqPos: {...this.state.sqPos, x: pageX, y: pageY}})
      })}, 0);
  }

  componentDidMount(){
    this.measure();
    this.entryAnim();
  }

  entryAnim=()=>{
    Animated.parallel([
      Animated.timing(this.ciOp, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this.sqOp, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this.trOp, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this.stOp, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }

  update=(res, shape)=>{
    var doneArr = this.state.doneArr;
    doneArr.push(res);
    this.setState({doneArr: doneArr}, ()=>{
      Animated.timing(this[shape + "Op"], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(()=>{
        if(doneArr.length==4){
          this.setState({
            ciKey: this.state.ciKey+1,
            sqKey: this.state.sqKey+1,
            trKey: this.state.trKey+1,
            stKey: this.state.stKey+1,
            shape1: require("../assets/shapes/diamond.png"),
            shape2: require("../assets/shapes/heart.png"),
            shape3: require("../assets/shapes/octagon.png"),
            shape4: require("../assets/shapes/pentagon.png"),
          }, this.entryAnim)
        }
        else if(doneArr.length==8){
          this.setState({
            ciKey: this.state.ciKey+1,
            sqKey: this.state.sqKey+1,
            trKey: this.state.trKey+1,
            stKey: this.state.stKey+1,
            shape1: require("../assets/shapes/parallelogram.png"),
            shape2: require("../assets/shapes/plus.png"),
            shape3: require("../assets/shapes/trapezium.png"),
            shape4: require("../assets/shapes/hexagon.png"),
          }, this.entryAnim)
        }
        else if(doneArr.length==12){
          Animated.loop(
            Animated.sequence([
              Animated.timing(this.bttonScale, {
                toValue: 1.5,
                duration: 500,
                useNativeDriver: false,
              }),
              Animated.spring(this.bttonScale, {
                toValue: 1,
                useNativeDriver: false,
                duration: 500,
                friction: 2,
                tension: 70,
              })
            ]), {iterations: 2}
          ).start();
        }
      });
    });
  }

  render(){
    return(
      <View style={{height: '100%', backgroundColor: '#faae19'}}>
        <Image source={require('../assets/logo.png')} style={{width: 80, height: 80, alignSelf: 'center', marginTop: 10}} />
        <Text style={styles.description}>Match The Shapes</Text>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.container}>
            <Draggable source={this.state.shape1} key={this.state.ciKey}
            onDone={(res)=>{this.update(res, "ci")}} objPos={this.state.ciPos} />

            <Draggable source={this.state.shape2} key={this.state.sqKey}
            onDone={(res)=>{this.update(res, "sq")}} objPos={this.state.sqPos} />

            <Draggable source={this.state.shape3} key={this.state.trKey}
            onDone={(res)=>{this.update(res, "tr")}} objPos={this.state.trPos} />

            <Draggable source={this.state.shape4} key={this.state.stKey}
            onDone={(res)=>{this.update(res, "st")}} objPos={this.state.stPos} />
          </View>

          <View style={{width: 2, height: '80%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 50, zIndex: -1}} />

          <View style={styles.container}>
            <Animated.Image ref={view=>{this.triangle=view}} source={this.state.shape3}
            style={[styles.shape, {opacity: this.trOp}]} />

            <Animated.Image ref={view=>{this.star=view}} source={this.state.shape4}
            style={[styles.shape, {opacity: this.stOp}]} />

            <Animated.Image ref={view=>{this.circle=view}} source={this.state.shape1}
            style={[styles.shape, {opacity: this.ciOp}]} />

            <Animated.Image ref={view=>{this.square=view}} source={this.state.shape2}
            style={[styles.shape, {opacity: this.sqOp}]} />
          </View>
        </View>

        <TouchableOpacity style={[styles.button, {position: 'absolute', bottom: 10, left: 10, width: 100}]}
        onPress={()=>{this.props.navigation.navigate("ActivitySelectScreen")}} >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>

        <Animated.View style={{position: 'absolute', bottom: 10, right: 10, width: 100, transform: [{scale: this.bttonScale}]}}>
          <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen2")}} >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
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
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
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
    alignSelf: 'center'
  },
  shape:{
    width: 50,
    height: 50,
    alignSelf: 'center',
    margin: Dimensions.get("window").width/13,
  },
  container:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    flexWrap: 'wrap',
  }
});