import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { lightGray, white, primaryDark, secondaryLight } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecksById } from '../utils/api'
import { receiveDeckById } from '../actions'
import { AppLoading } from 'expo'



class DeckCover extends Component {
    state = {
        ready : false
    }

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
    
    
        return {
            title: `${title}`
        }
    }

     componentDidMount () {  
         const deckId = this.props.navigation.state.params.deckId

         fetchDecksById(deckId)
         .then((deck)=> this.props.getDeck(deck, deckId))
         .then(()=> this.setState({ready: true}))
     } 

  render() {

    const { ready } = this.state 
    if (ready === false) {
        return <AppLoading />
    }  
  

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{this.props.deck.title} </Text>
            <Text style={styles.bodyText}>{this.props.deck.questions.length} Cards</Text>

            <TouchableOpacity  onPress={()=> this.props.navigation.navigate(
              'AddCard',
              {deckId: this.props.navigation.state.params.deckId,
                title: this.props.deck.title}
              )}>
              <View style={styles.addCardBtn}>
                <Text style={styles.addCardBtnTxt}>Add Card</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=> this.props.navigation.navigate(
              'Quiz',
              {deckId: this.props.navigation.state.params.deckId}
              )}>
              <View style={styles.startQuizBtn}>
                <Text style={styles.startQuizBtnTxt}>Start Quiz</Text>
              </View>
          </TouchableOpacity>
        </View> 
    ); 
  } 
} 

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: white, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      color: primaryDark
    },
    bodyText: {
      fontSize: 20,
      color: secondaryLight
    },
    addCardBtn: {
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      height: 50,
      marginTop: 50,
      paddingLeft: 20, 
      paddingRight: 20,
      borderWidth: 1,
      borderColor: primaryDark,
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
    addCardBtnTxt:{
        fontSize: 20,
        color: primaryDark
    },
    startQuizBtn:{
        borderRadius: Platform.OS === 'ios' ? 16 : 5,
        height: 60,
        marginTop: 10,
        paddingLeft: 20, 
        paddingRight: 20,
        backgroundColor: primaryDark,
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
    startQuizBtnTxt:{
        fontSize: 20,
        color: white
    },
}); 
  




function mapStateToProps (state, props) { 
    return {
        deck: state[props.navigation.state.params.deckId]
    }
    
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getDeck: (deck, deckId) => dispatch(receiveDeckById(deck, deckId)),
    }
  }
  
  export default connect(
    mapStateToProps, mapDispatchToProps
  )(DeckCover)
