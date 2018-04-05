import React from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { white, primaryDark, secondaryLight, lightGray } from '../utils/colors'
import { fetchDecksResult } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'


class DeckList extends React.Component {
    state = {
        ready: false,
      }

    componentDidMount () {
      const { dispatch } = this.props
      fetchDecksResult()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
    } 
 

    renderItem = ({ deck }, id) => { 
          return <TouchableOpacity key={id}  onPress={()=> this.props.navigation.navigate(
              'DeckCover',
              {deckId: id,
              title: deck.title}
              )}>
              <View key={id} style={styles.deckContainer}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.bodyText}>{deck.questions.length} Cards</Text>
              </View>
          </TouchableOpacity>
        

      }

  render() {
    const { ready } = this.state 
    if (ready === false) {
        return <AppLoading />
    }  

    const { decks } = this.props
    return (
        <View style={styles.container}>
          <ScrollView>
            {Object.keys(decks).map((id)=>{
              const deck = decks[id]
              return this.renderItem({ deck }, id)
            })}
          </ScrollView>
        </View>
    );
  }
}
 


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: lightGray,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
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


function mapStateToProps (decks) {
  return {
    decks
  }
}


export default connect(
  mapStateToProps,
)(DeckList)