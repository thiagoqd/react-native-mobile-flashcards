import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatDeckResults } from './_decks'

export function fetchDecksResult () {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
                 .then(formatDeckResults)
}

export function fetchDecksById (deckId) {

  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((result)=> (JSON.parse(result)[deckId]) )     
}  




export function fetchAddDeck ({ deck },  key ) {

  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function fetchAddCard ({deck}, key) {

  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
          const data = JSON.parse(results)
          const questions = data[key].questions
          questions.push(card)
          data[key].questions = questions
          AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}




export function removeDeck (key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}