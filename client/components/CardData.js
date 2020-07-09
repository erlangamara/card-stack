import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardData = props => {
  const { cardHolderName, cardHolderNumber } = props;

  return (
    <View style={styles.cardData}>
      <Text style={styles.cardName}>{cardHolderName}</Text>
      <Text style={styles.cardNumber}>{cardHolderNumber}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardData: {
    backgroundColor: "#c5e3f6",
    padding: 5,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10
  },

  cardName: {
    fontWeight: "bold"
  }
})

export default CardData;