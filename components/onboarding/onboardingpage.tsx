import { useState } from 'react'
import { View } from 'react-native'
import Onboarding from './onboarding'

export default function OnboardingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <View>
      <Onboarding total={4} selectedIndex={selectedIndex} onIndexChange={(index) => setSelectedIndex(index) } />
    </View>
  )
}