export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_DECKS_BY_ID = 'RECEIVE_DECKS_BY_ID'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function receiveDeckById (deck, deckId) {
  return {
    type: RECEIVE_DECKS_BY_ID,
    deck,
    deckId,
  }
} 

export function addDeck (deck, deckId) {
  return {
    type: ADD_DECK,
    deck,
    deckId
  }
}

export function removeDeck(key) {
  return {
    type: REMOVE_DECK,
    key: key
  }
}

export function addCard (card, deckId) {
  return {
    type: ADD_CARD,
    card,
    deckId
  }
}