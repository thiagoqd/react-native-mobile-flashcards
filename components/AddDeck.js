import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView} from 'react-native'
import { lightGray, white, primaryDark, secondaryLight, secondaryDark } from '../utils/colors'
import { addDeck } from '../actions'
import { fetchAddDeck } from '../utils/api'
import { connect } from 'react-redux'


 
class AddDeck extends React.Component {
  state = {
    input: null,
    deckAdded: false
  }


  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }

  submitAddDeck = () => {

    const {input} = this.state
    deck = {
          title: input,
          questions: []
        }
      
    fetchAddDeck({deck}, input)
    .then(()=> (this.props.addDeck(deck, input)))
    .then(()=> this.props.navigation.navigate(
      'DeckCover',
      {deckId: input,
      title: input}
      ))
    // .then(this.setState(()=>({deckAdded: true})))
    
  }

  resetView = () => {
    this.setState(()=>({
      input: null,
      deckAdded: false
    }))
  } 

  render() {

    const { input } = this.state

    if(this.state.deckAdded){
      return <View style={styles.container}>
                <Text style={styles.title}> Deck "{input}" Added! </Text>

                <TouchableOpacity  onPress={()=> this.resetView()}>
                    <View style={styles.addDeckBtn}>
                      <Text style={styles.addDeckTxt}>Add another Deck</Text>
                    </View>
                </TouchableOpacity>

              </View>
    }

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <Text style={styles.title}>What is the title of your new Deck?</Text>
          <TextInput 
            underlineColorAndroid='transparent'
            value={input}
            style={styles.input}
            onChangeText={this.handleTextChange}
          /> 
          <TouchableOpacity  onPress={()=> this.submitAddDeck()}>
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
      
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDeck: (deck, deckId) => dispatch(addDeck(deck, deckId)),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(AddDeck)
