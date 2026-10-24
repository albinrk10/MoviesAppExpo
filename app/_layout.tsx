import { View, Text } from 'react-native'
import React from 'react'
import "../global.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// Create a client
const queryClient = new QueryClient()

const RootLayout = () => {

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        ></Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>


  )
}

export default RootLayout