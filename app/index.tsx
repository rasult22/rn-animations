import OnboardingPage from '@/components/onboarding/onboardingpage';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, }}>
      <GestureHandlerRootView style={{flex: 1, justifyContent: 'center' }}>
        <OnboardingPage />
      </GestureHandlerRootView>
    </View>
  );
}