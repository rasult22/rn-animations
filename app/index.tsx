import Confetti from '@/components/confetti/confetti';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <Confetti />
      </GestureHandlerRootView>
    </View>
  );
}