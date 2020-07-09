import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder, Image } from "react-native";

//Card component
import CardData from './CardData';

//Image
import qrCode from '../assets/qr-code.png';

const colors = ['#5C6BC0', '#009688', '#f85959'];

const cardHolder = [
  {
    name: 'Foo Bar',
    cardNumber: '012345'
  },
  {
    name: 'Foo Baz',
    cardNumber: '054321'
  },
  {
    name: 'John Doe',
    cardNumber: '013567'
  },
];

class Card extends Component {

  constructor () {
    super()
    this.state = { 
      cardsPan: new Animated.ValueXY(),
      cardsStackedAnim: new Animated.Value( 0 ),
      currentIndex: 0,
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
    onPanResponderRelease: () => {
      Animated.timing( this.state.cardsPan, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      } ).start();

        Animated.timing( this.state.cardsStackedAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
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
        <Animated.View 
        {...styles.cardStyle} 
        style={{
          backgroundColor: colors[(this.state.currentIndex + 2) % 3],
          zIndex: 1,
          bottom: this.state.cardsStackedAnim.interpolate({
            inputRange: [ 0, 1 ], outputRange: [ 40, 20 ] }),
          transform: [{
            scale: this.state.cardsStackedAnim.interpolate({
              inputRange: [ 0, 1 ], outputRange: [ 0.80, 0.90 ] })
          }],
          opacity: this.state.cardsStackedAnim.interpolate({
            inputRange: [ 0, 1 ], outputRange: [ 0.3, 0.6 ] })
        }}>
          <View style={styles.qrCodeContainer}>
            <Image source={qrCode} resizeMode="stretch" style={styles.qrCode} />
          </View>
          <CardData 
            cardHolderName={cardHolder[(this.state.currentIndex + 2) % 3].name} 
            cardHolderNumber={cardHolder[(this.state.currentIndex + 2) % 3].cardNumber}
          />
        </Animated.View>
        <Animated.View 
          {...styles.cardStyle}
          style={{
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
          <View style={styles.qrCodeContainer}>
            <Image source={qrCode} resizeMode="stretch" style={styles.qrCode} />
          </View>
          <CardData 
            cardHolderName={cardHolder[(this.state.currentIndex + 1) % 3].name} 
            cardHolderNumber={cardHolder[(this.state.currentIndex + 1) % 3].cardNumber}
          />
        </Animated.View>
        <Animated.View
          {...styles.cardStyle}
          { ...this.cardsPanResponder.panHandlers }
          style={{
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
          <View style={styles.qrCodeContainer}>
            <Image source={qrCode} resizeMode="stretch" style={styles.qrCode} />
          </View>
          <CardData 
            cardHolderName={cardHolder[this.state.currentIndex % 3].name} 
            cardHolderNumber={cardHolder[this.state.currentIndex % 3].cardNumber}
          />
        </Animated.View>
      </View>
    )
    }
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center"
  },

  cardStyle: {
    width: 300, 
    height: 150,
    position: "absolute",
    borderRadius: 10,
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5
  },

  qrCodeContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    height: 100,
    padding: 20
  },

  qrCode: {
    height: 60,
    width: 70
  }
})

export default Card;