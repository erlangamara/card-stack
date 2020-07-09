import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder} from "react-native";

const colors = ['#5C6BC0', '#009688', '#F44336'];

class Card extends Component {

  constructor () {
    super()
    this.state = { 
      cardsPan: new Animated.ValueXY(),
      cardsStackedAnim: new Animated.Value( 0 ),
      currentIndex: 0
    }
  }

  cardsPanResponder = PanResponder.create( {
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: ( event, gestureState ) => {
      this.state
        .cardsPan
        .setValue(
          { x: gestureState.dx, y: this.state.cardsPan.y }
         );
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: ( event, gestureState ) => {
      Animated.timing( this.state.cardsPan, {
        toValue: 0,
        duration: 300,
      } ).start();

      Animated.timing( this.state.cardsStackedAnim, {
        toValue: 1,
        duration: 300,
      } ).start( () => {
        this.state.cardsStackedAnim.setValue( 0 );
        this.setState({
          currentIndex: this.state.currentIndex + 1,
        });
      } );
    },
  } )

  render () {
    return (
      <View style={styles.cardContainer}>
        <Animated.View style={{
          width: 300, height: 150,
          position: 'absolute',
          zIndex: 1,
          bottom: this.state.cardsStackedAnim.interpolate({
            inputRange: [ 0, 1 ], outputRange: [ 40, 20 ] }),
          transform: [{
            scale: this.state.cardsStackedAnim.interpolate({
              inputRange: [ 0, 1 ], outputRange: [ 0.80, 0.90 ] })
          }],
          backgroundColor: colors[(this.state.currentIndex + 2) % 3],
          opacity: this.state.cardsStackedAnim.interpolate({
            inputRange: [ 0, 1 ], outputRange: [ 0.3, 0.6 ] }),
          transform: [ { scale: 0.80 } ]
        }}>
        </Animated.View>
        <Animated.View 
          style={{
          width: 300, height: 150,
          position: 'absolute',
          zIndex: 2,
          bottom: 20,
          backgroundColor: colors[(this.state.currentIndex + 1) % 3],
          zIndex: 2,
          bottom: this.state.cardsStackedAnim.interpolate({
            inputRange: [ 0, 1 ], outputRange: [ 20, 0 ] }),
          transform: [{
            scale: this.state.cardsStackedAnim.interpolate({
              inputRange: [ 0, 1 ], outputRange: [ 0.90, 1.0 ] })
          }],
          opacity: this.state.cardsStackedAnim.interpolate({
            inputRange: [ 0, 1 ], outputRange: [ 0.6, 1 ] }),
        }}>
        </Animated.View>
        <Animated.View
          { ...this.cardsPanResponder.panHandlers }
          style={{
          width: 300, height: 150,
          position: 'absolute',
          zIndex: 3,
          bottom: 0,
          backgroundColor: colors[this.state.currentIndex % 3],
          zIndex: this.state.cardsStackedAnim.interpolate({
            inputRange: [ 0, 0.5, 1 ], outputRange: [ 3, 2, 0 ] }),
          bottom: this.state.cardsStackedAnim.interpolate({
            inputRange: [ 0, 1 ], outputRange: [ 0, 40 ] }),
          opacity: this.state.cardsStackedAnim.interpolate({
            inputRange: [ 0, 1 ], outputRange: [ 1, 0.3 ] }),
          transform: [
            { translateX: this.state.cardsPan.x },
            { scale: this.state.cardsStackedAnim.interpolate({
              inputRange: [ 0, 1 ], outputRange: [ 1, 0.80 ] }) },
          ],
        }}>
      </Animated.View>
      </View>
    )
    
    }
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center"
  }
})

export default Card;