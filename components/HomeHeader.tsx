import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'

const HomeHeader = () => {
    const {user} = useAuth();
  return (
    <View className='mt-10'>
      <Text className='mt-10'>{user?.email}</Text>
    </View>
  )
}

export default HomeHeader