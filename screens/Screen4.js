import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, Animated } from 'react-native';
import Draggable from "../components/Draggable";

export default class Screen4 extends React.Component {
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
      shape1: require("../assets/halves/bus1.png"),
      shape2: require("../assets/halves/plane1.png"),
      shape3: require("../assets/halves/train1.png"),
      shape4: require("../assets/halves/tree1.png"),

      shape5: require("../assets/halves/plane2.png"),
      shape6: require("../assets/halves/tree2.png"),
      shape7: require("../assets/halves/bus2.png"),
      shape8: require("../assets/halves/train2.png"),
    }
    this.ciOp = new Animated.Value(0);
    this.sqOp = new Animated.Value(0);
    this.trOp = new Animated.Value(0);
    this.stOp = new Animated.Value(0);

    this.doneIMg1 = (<Image source={require('../assets/done.gif')} style={{width: 70, height: 70, alignSelf: 'center'}} />);
    this.doneIMg2 = (<Image source={require('../assets/done.gif')} style={{width: 70, height: 70, alignSelf: 'center', transform: [{rotateY: "180deg"}]}} />);
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
            shape1: require("../assets/halves/clock1.png"),
            shape2: require("../assets/halves/ball1.png"),
            shape3: require("../assets/halves/cycle1.png"),
            shape4: require("../assets/halves/car1.png"),
            shape5: require("../assets/halves/ball2.png"),
            shape6: require("../assets/halves/car2.png"),
            shape7: require("../assets/halves/clock2.png"),
            shape8: require("../assets/halves/cycle2.png"),
          }, this.entryAnim)
        }
        else if(doneArr.length==8){
          this.setState({
            ciKey: this.state.ciKey+1,
            sqKey: this.state.sqKey+1,
            trKey: this.state.trKey+1,
            stKey: this.state.stKey+1,
            shape1: require("../assets/halves/burger1.png"),
            shape2: require("../assets/halves/pizza1.png"),
            shape3: require("../assets/halves/shell1.png"),
            shape4: require("../assets/halves/bottle1.png"),

            shape5: require("../assets/halves/pizza2.png"),
            shape6: require("../assets/halves/bottle2.png"),
            shape7: require("../assets/halves/burger2.png"),
            shape8: require("../assets/halves/shell2.png"),
          }, this.entryAnim)
        }
      });
    });
  }

  modal=()=>(
    <Modal animationType="slide" transparent={true} visible={this.state.doneArr.length==12}>
      <View style={styles.modalContainer}>
        <Text style={[styles.description, {fontSize: 30, color: '#faae19', marginTop: 10}]}>You Won!</Text>

        <TouchableOpacity style={[styles.button, {backgroundColor: '#faae19', position: 'relative', bottom: null, left: null, alignSelf: 'center', margin: 20}]}
          onPress={()=>{this.setState({doneArr: []}); this.props.navigation.navigate("ActivitySelectScreen")}} >
            <Text style={[styles.buttonText, {color: 'white'}]}>Finish</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
          {this.doneIMg1}
          {this.doneIMg2}
        </View>
      </View>
		</Modal>
  )

  render(){
    return(
      <View style={{height: '100%', backgroundColor: '#f7d794'}}>
        <Image source={require('../assets/logo.png')} style={{width: 80, height: 80, alignSelf: 'center', marginTop: 20}} />
        <Text style={styles.description}>Match the halves</Text>

        {this.modal()}

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
            <Animated.Image ref={view=>{this.square=view}} source={this.state.shape5}
            style={[styles.shape, {opacity: this.sqOp}]} />            

            <Animated.Image ref={view=>{this.star=view}} source={this.state.shape6}
            style={[styles.shape, {opacity: this.stOp}]} />

            <Animated.Image ref={view=>{this.circle=view}} source={this.state.shape7}
            style={[styles.shape, {opacity: this.ciOp}]} />

            <Animated.Image ref={view=>{this.triangle=view}} source={this.state.shape8}
            style={[styles.shape, {opacity: this.trOp}]} />
          </View>
        </View>

        <TouchableOpacity style={styles.button}
        onPress={()=>{this.props.navigation.navigate("ActivitySelectScreen")}} >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    borderRadius: 50,
    padding: 7,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 100,
  },
  buttonText:{
    color: '#f7d794',
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
    zIndex: -100,
  },
  container:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    flexWrap: 'wrap',
  },
  modalContainer:{
    marginTop: Dimensions.get("window").height/4,
		top: '5%',
		width: '80%',
    height: '40%',
    padding: 10,
		alignSelf: 'center',
		borderRadius: 10,
		backgroundColor: '#ffffff',
		shadowColor: "#000",
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.30,
    shadowRadius: 10,
    elevation: 16,
	},
});