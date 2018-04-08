import { RECEIVE_DECKS, ADD_DECK, RECEIVE_DECKS_BY_ID, ADD_CARD, REMOVE_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...action.decks,
      }
    case RECEIVE_DECKS_BY_ID:
      return {
        ...state,
        [action.deckId]: action.deck
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deckId]: action.deck
      }

    case REMOVE_DECK:
      var data = Object.assign({}, state)
      delete data[action.key]
      
      return data
          
      
    case ADD_CARD :
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions:[
            ...state[action.deckId].questions,
            action.card
          ]
        }
      }
    default :
      return state
  }
}

export default decks