import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native'
import { white, primaryDark, secondaryLight } from '../utils/colors'


class DeckThumb extends Component {


  render() {

    return (
        <View key={this.props.id}>
            <Text style={styles.title}>{this.props.deck.title}</Text>
            <Text style={styles.bodyText}>{this.props.deck.questions.length} Cards</Text>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    deckContainer: {
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      height: 150,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
      backgroundColor: white,
      alignItems: 'center',
      justifyContent: 'center',
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      }
    },
    title: {
      fontSize: 20,
      color: primaryDark
    },
    bodyText: {
      fontSize: 15,
      color: secondaryLight
    }
  });
  
  export default DeckThumb