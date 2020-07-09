import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Component
import Card from './components/Card.js';

export default function App() {
  return (
    <View style={styles.cardContainer}>
      <Card />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
