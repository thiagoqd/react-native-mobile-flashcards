import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { lightGray, white, primaryDark, secondaryLight, secondaryDark, red, green } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecksById } from '../utils/api'
import { receiveDeckById } from '../actions'
import { AppLoading } from 'expo'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'



class Quiz extends Component {
    state = {
        ready : false,
        currentQuestion: 0,
        checkAnswer: 0,
        answersScore: {},
        quizEnd: 0
    }

    static navigationOptions = ({ navigation }) => {
    
        return {
            title: `Quiz`
        }
    }

     componentDidMount () {  
    
         const deckId = this.props.navigation.state.params.deckId

         fetchDecksById(deckId)
         .then((deck)=> this.props.getDeck(deck, deckId))
         .then(()=> this.setState({ready: true}))
     } 

     submitAnswer = (answer) => {

        const {currentQuestion} = this.state
        const lengthDeck = (this.props.deck.questions.length-1)
        
        if(lengthDeck == currentQuestion){
            clearLocalNotification()
            .then(setLocalNotification)
        }
      

        this.setState((state)=> ({
            answersScore : {
                ...state.answersScore,
                [currentQuestion] : answer
            },
            currentQuestion: lengthDeck == currentQuestion ? currentQuestion : (currentQuestion+1),
            checkAnswer: 0,
            quizEnd: lengthDeck == currentQuestion ? 1 : 0

        }))

     }

     restartQuiz = () => {
         this.setState(()=>({
            currentQuestion: 0,
            checkAnswer: 0,
            answersScore: {},
            quizEnd: 0
        }))
     }

  render() {

    const { goBack } = this.props

    const { ready } = this.state 
    if (ready === false) {
        return <AppLoading />
    }  

    
   


    if(this.state.quizEnd === 1) {
        const {answersScore} = this.state
        var total = 0;

        for (var value in answersScore) {
            total += answersScore[value];
        }
        return <View style={styles.endContainer}>
                <Text style={styles.endText}>Você acertou {((total / this.props.deck.questions.length)*100).toFixed(0)}% das perguntas.</Text>
            
                <TouchableOpacity  onPress={()=> this.restartQuiz()}>
                        <View style={styles.restartBtn}>
                            <Text style={styles.restartBtnTxt}>Restart Quiz</Text>
                        </View>
                </TouchableOpacity>
                
                <TouchableOpacity  onPress={()=> goBack()}>
                        <View style={styles.backBtn}>
                            <Text style={styles.backBtnTxt}>Back</Text>
                        </View>
                </TouchableOpacity>
            
            </View>
    }


    if(this.props.deck.questions.length == 0){
        return(<View style={styles.endContainer}>
        <Text style={styles.endText}>Empty Deck.</Text>
    
        <TouchableOpacity  onPress={()=> goBack()}>
                <View style={styles.answerBtn}>
                    <Text style={styles.answerBtnTxt}>Back</Text>
                </View>
        </TouchableOpacity>

    
        </View> )
    }
    
    return (



        <View style={styles.container}>
             <View> 
                <Text style={styles.counter}> {this.state.currentQuestion+1}/{this.props.deck.questions.length} </Text>
            </View>

            <View style={styles.questionView}>

                {
                    this.state.checkAnswer === 0 ?
                        <Text style={styles.question}> {this.props.deck.questions[this.state.currentQuestion].question} </Text>
                    : 
                        <Text style={styles.answer}> {this.props.deck.questions[this.state.currentQuestion].answer} </Text>


                }

                

                { this.state.checkAnswer === 0 ?

                    <TouchableOpacity  onPress={()=> this.setState(()=> ({checkAnswer: 1}))}>
                        <View style={styles.answerBtn}>
                            <Text style={styles.answerBtnTxt}>Answer</Text>
                        </View>
                    </TouchableOpacity>

                    :
                    <View>
                        <TouchableOpacity  onPress={()=> this.submitAnswer(1)}>
                            <View style={styles.correctBtn}>
                                <Text style={styles.correctBtnTxt}>Correct</Text>
                            </View>
                        </TouchableOpacity>
 
                        <TouchableOpacity  onPress={()=> this.submitAnswer(0)}>
                            <View style={styles.incorrectBtn}>
                                <Text style={styles.incorrectBtnTxt}>Incorrect</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }

                

                
            </View>


            
            
        </View> 
    ); 
  } 
} 

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    }, 
    counter: { 
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10, 
        paddingLeft: 20
    },
    questionView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
      fontSize: 30,
      color: secondaryDark,
      textAlign: 'center'
    },
    answer: {
        fontSize: 20,
        color: secondaryDark,
        textAlign: 'center'

    },
    correctBtn: {
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      width: 150,
      height: 50,
      marginTop: 50,
      paddingLeft: 20, 
      paddingRight: 20,
      backgroundColor: green,
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
    correctBtnTxt:{
        fontSize: 20,
        color: white
    },
    incorrectBtn: {
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      width: 150,
      height: 50,
      marginTop: 10,
      paddingLeft: 20, 
      paddingRight: 20,
      backgroundColor: red,
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
    incorrectBtnTxt:{
        fontSize: 20,
        color: white
    },
    answerBtn: {
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      width: 150,
      height: 50,
      marginTop: 50, 
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
    answerBtnTxt:{
        fontSize: 20,
        color: white
    },
    backBtn: {
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      width: 150,
      height: 50,
      marginTop: 10, 
      paddingLeft: 20, 
      paddingRight: 20,
      borderWidth: 1,
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
    backBtnTxt:{
        fontSize: 20,
        color: secondaryDark
    },
    restartBtn: {
      borderRadius: Platform.OS === 'ios' ? 16 : 5,
      width: 150,
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
    restartBtnTxt:{
        fontSize: 20,
        color: white
    },
    endContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    endText: {
        fontSize: 30,
        color: secondaryDark,
        textAlign: 'center'
    }
}); 
  


function mapStateToProps (state, props) { 
    return {
        deck: state[props.navigation.state.params.deckId]
    }
    
  }
  
  const mapDispatchToProps = (dispatch, { navigation }) => {
    return {
      getDeck: (deck, deckId) => dispatch(receiveDeckById(deck, deckId)),
      goBack: () => navigation.goBack()
    }
  }
  
  export default connect(
    mapStateToProps, mapDispatchToProps
  )(Quiz)
