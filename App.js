import React from 'react';
import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { primaryDark, white, primary} from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckCover from './components/DeckCover'
import Quiz from './components/Quiz'
import AddCard from './components/AddCard'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { lightGray } from './utils/colors'
import { setLocalNotification, clearLocalNotification } from './utils/helpers'

console.disableYellowBox = true;

function FlashCardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/> 
    </View>
  )
}

export default class App extends React.Component {

  componentDidMount () {
    setLocalNotification()
  }

  render() {
    
    return (
      <Provider store={createStore(reducer)}> 
        <View style={{flex: 1, backgroundColor: lightGray}}> 
          <FlashCardsStatusBar backgroundColor={primaryDark}  barStyle='light-content' /> 
          <MainNavigator />
        </View>
      </Provider>
    );
  }
} 


const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({tinColor}) => <Ionicons name='ios-bookmarks' size={30} color={tinColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tinColor}) => <FontAwesome name='plus-square' size={30} color={tinColor} />
    }
  }
},{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? primaryDark : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : primary,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs, 
  }, 
  DeckCover: {
    screen: DeckCover,
    navigationOptions: {
      headerMode : 'screen',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary,
      }
    } 
  },  
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerMode : 'screen',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary,
      }
    } 
  }, 
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerMode : 'screen',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary,
      }
    } 
  },
})

