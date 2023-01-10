import React from 'react'
import { View, Text, Button } from 'react-native'

import { TokenContext } from '../Context/Context'

export default function SignOut ({ navigation }) {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <>
          <Text>Me déconnecter</Text>
          <Button title='Je me déconnecte' onPress={() => setToken(null)} />
        </>
      )}
    </TokenContext.Consumer>
  )
}
