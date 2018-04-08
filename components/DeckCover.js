import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { lightGray, white, primaryDark, secondaryLight } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecksById, fetchRemoveDeck } from '../utils/api'
import { receiveDeckById, removeDeck } from '../actions'
import { AppLoading } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal'

class DeckCover extends Component {
    state = {
        ready : false,
        isModalVisible: false
    }

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
    
    
        return {
            title: `${title}`
        }
    }

    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    submitDelete = () => {

      fetchRemoveDeck(this.props.deck.title)
      .then(this.setState({ isModalVisible: !this.state.isModalVisible }))
      .then(this.props.removeDeck(this.props.deck.title)) 
      .then(this.props.navigation.navigate(
        'Home'
        ))    
    }

     componentDidMount () {  
         const deckId = this.props.navigation.state.params.deckId

         fetchDecksById(deckId)
         .then((deck)=> this.props.getDeck(deck, deckId))
         .then(()=> this.setState({ready: true}))
     } 

  render() {

    const { ready } = this.state  
    if (ready === false || !this.props.deck) {
        return <AppLoading />
    }  
  
    const {isModalVisible} = this.state 

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
          <TouchableOpacity  onPress={this._toggleModal}>  
              <View>
                {
                  Platform.OS == 'ios' ?
                  <Ionicons style={styles.trashIcon} size={30} name='ios-trash' /> :
                  <Ionicons style={styles.trashIcon} size={30} name='md-trash' />
                }  
              </View>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modal}>
              <Text style={styles.title}>Delete Deck?</Text>
              <View style={styles.modalBody}>
                <TouchableOpacity onPress={this.submitDelete}>
                  <View style={styles.confirmBtn}>
                    <Text style={styles.confirmBtnTxt}>Confirm</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._toggleModal}>
                  <View style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnTxt}>Cancel</Text> 
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View>
          
          </View>

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
    modal: {
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      height: 300,
      marginLeft: 20,
      marginRight: 20,
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
    modalBody: {
      flexDirection: 'row'
    },
    bodyText: {
      fontSize: 20,
      color: secondaryLight
    },
    cancelBtn: {
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      height: 50,
      marginTop: 50,
      marginLeft: 10, 
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
    cancelBtnTxt:{
        fontSize: 20,
        color: primaryDark
    },
    confirmBtn:{
        borderRadius: Platform.OS === 'ios' ? 16 : 5,
        height: 50,
        marginTop: 50,
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
    confirmBtnTxt:{
        fontSize: 20,
        color: white
    },
    trashIcon: {
      marginTop: 30,
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
      removeDeck: (key) => dispatch(removeDeck(key)),
    }
  }
  
  export default connect(
    mapStateToProps, mapDispatchToProps
  )(DeckCover)
