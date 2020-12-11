import React from 'react';
import { StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';

export default class Draggable extends React.Component {
  constructor(){
    super();
    this.state={
      objOpacity: new Animated.Value(0),
      animObjPos: new Animated.ValueXY(),
    }
    this.objPos = null;
    this.val={x: 0, y: 0};
    this.state.animObjPos.addListener((value)=>this.val=value);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, {dx: this.state.animObjPos.x, dy: this.state.animObjPos.y}
      ], {useNativeDriver: false}),
      onPanResponderRelease: (e, gesture) => {
        if(this.isDropArea(gesture)){
          this.props.onDone(true);
          Animated.timing(this.state.objOpacity,{
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
        else{
          Animated.spring(this.state.animObjPos, {
            toValue: {x: 0, y: 0},
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      }
    }); 
  }

  componentDidMount(){
    this.objPos = this.props.objPos;
    Animated.timing(this.state.objOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  componentDidUpdate(){
    this.objPos = this.props.objPos;
  }

  isDropArea(gesture){
    var objPos = this.objPos;

    if(gesture.moveX*2>(objPos.x - 80) && gesture.moveX*2<(objPos.x + 80)){
      return (gesture.moveY>(objPos.y - 80) && gesture.moveY<(objPos.y + 80) && 
      gesture.moveX*2>(objPos.x - 80) && gesture.moveX*2<(objPos.x + 80));
    }
    else{
      return (gesture.moveY>(objPos.y - 80) && gesture.moveY<(objPos.y + 80) && 
      gesture.moveX>(objPos.x - 80) && gesture.moveX<(objPos.x + 80));
    }
  }

  render(){
    const panStyle={
      transform: this.state.animObjPos.getTranslateTransform(),
      opacity: this.state.objOpacity,
    }
    return(
      <Animated.Image {...this.panResponder.panHandlers} style={[panStyle, styles.shape]}
      ref={view=>{this.obj=view}} source={this.props.source} />
    );
  }
}

const styles = StyleSheet.create({
  shape:{
    width: 50,
    height: 50,
    alignSelf: 'center',
    margin: Dimensions.get("window").width/13,
  },
});