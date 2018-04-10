import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView} from 'react-native'
import { lightGray, white, primaryDark, secondaryLight, secondaryDark } from '../utils/colors'
import { addCard, receiveDeckById } from '../actions'
import { fetchAddCard } from '../utils/api'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import { fetchDecksById } from '../utils/api'

 
class AddCard extends React.Component {
  state = {
    inputQuestion: null,
    inputAnswer: null,
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params


    return {
        title: `${title}`
    }
}


  handleTextChangeQuestion = (inputQuestion) => {
    this.setState(() => ({
      inputQuestion
    }))
  }

  handleTextChangeAnswer = (inputAnswer) => {
    this.setState(() => ({
      inputAnswer
    }))
  }

  submitAddCard = () => {

    const {inputQuestion, inputAnswer} = this.state

    if(!inputQuestion || inputQuestion.trim().length === 0 ||
    !inputAnswer || inputAnswer.trim().length === 0 ) {
      return;
    } 


    const deckId = this.props.navigation.state.params.deckId
    const title = this.props.navigation.state.params.title
    card = {
          question: inputQuestion,
          answer: inputAnswer
        }



    fetchAddCard({card}, deckId) 
     .then(()=> (this.props.addCard(card, deckId))) 
     .then(()=> this.props.navigation.goBack()) 


      
      
    
  }

  resetView = () => {
    this.setState(()=>({
      inputQuestion: null,
      inputAnswer: null,
    }))
  } 

  render() {

    const {inputQuestion, inputAnswer} = this.state

 

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <Text style={styles.title}>What is the Question?</Text>
          <TextInput 
            underlineColorAndroid='transparent'
            value={inputQuestion}
            style={styles.input}
            onChangeText={this.handleTextChangeQuestion}
          /> 
          <Text style={styles.title}>What is the Answer?</Text>
          <TextInput 
            underlineColorAndroid='transparent'
            value={inputAnswer}
            style={styles.input}
            onChangeText={this.handleTextChangeAnswer}
          /> 
          <TouchableOpacity  onPress={()=> this.submitAddCard()}>
                <View style={styles.addDeckBtn}>
                  <Text style={styles.addDeckTxt}>Submit</Text>
                </View>
            </TouchableOpacity>
      </KeyboardAvoidingView>
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
    color: secondaryDark,
    textAlign: 'center'
  },
  addDeckBtn:{
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      height: 50,
      marginTop: 40,
      paddingLeft: 20, 
      paddingRight: 20,
      backgroundColor: secondaryDark,
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
  addDeckTxt:{
      fontSize: 20,
      color: white
  },
  input: {
    borderRadius: Platform.OS === 'ios' ? 16 : 5,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 20,
    height: 50,
    width: 200,
    textAlign: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }

  }
});

function mapStateToProps (state, props) { 
  return {
    // deck: state[props.navigation.state.params.deckId]
      
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return { 
    addCard: (card, deckId) => dispatch(addCard(card, deckId)),
    getDeck: (deck, deckId) => dispatch(receiveDeckById(deck, deckId)),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(AddCard)
 