import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'mobileFlashcard:notifications'

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: "Start your Today's Quiz",
        body: 'Dont forget to study today!',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification () {
    
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data)=> {
        if(data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status })=> {
                    if(status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate()+1)
                        tomorrow.setHours(19)
                        tomorrow.setMinutes(0)
                        
                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: tomorrow,
                                reapeat: "day",
                            }
                        )

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
        }
    })
}