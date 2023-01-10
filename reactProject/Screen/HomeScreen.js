import React from 'react'
import { View, Text } from 'react-native'

import { UsernameContext } from '../Context/Context'

export default function HomeScreen () {
  return (
    <UsernameContext.Consumer>
      {([username, setUsername]) => {
        return (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Welcome !</Text>
            <Text>You are logged as {username}</Text>
          </View>
        )
      }}
    </UsernameContext.Consumer>
  )
}
