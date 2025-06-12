import mockData from '@/mock/perplexity';
import { View } from "react-native";
import VerticalList from './vertical-list';

export default function PerplexityPage() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#111',
      justifyContent: 'center',
    }}>
      <VerticalList data={mockData} />
    </View>
  )
}