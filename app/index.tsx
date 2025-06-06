import Scheduler from '@/components/scheduler/scheduler';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Scheduler />
      </GestureHandlerRootView>
    </View>
  );
}