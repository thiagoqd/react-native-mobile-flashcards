export const DECKS_STORAGE_KEY = 'MobileFlashCards:deck'
import { AsyncStorage } from 'react-native'


function setDummyData () {

    let dummyData = {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
      }
    
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
  }



  export function formatDeckResults (results) {
    const data = JSON.parse(results)
    return data === null
      ? setDummyData()
      : JSON.parse(results)
  }

