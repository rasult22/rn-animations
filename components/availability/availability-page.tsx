import { generateHomes, HomeType } from "@/mock/homes";
import { useRef, useState } from "react";
import { Button, View } from "react-native";
import AvailabilityAnimation from "./availability-animation";

export default function AvailabilityPage () {
  const [data, setData] = useState<HomeType[]>(generateHomes());

  const [isLoading, setIsLoading] = useState(false);
  const timer = useRef<number>(null)

  return <View style={{
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 24
  }}>
    <AvailabilityAnimation isLoading={isLoading} data={data} />
    <View>
      <Button title="Generate new data" onPress={() => {
        if (timer.current) {
          clearTimeout(timer.current)
        }
        setIsLoading(true)
        timer.current = setTimeout(() => {
          setIsLoading(false)  
          setData(generateHomes())
        }, Math.random() * 1000 + 1000)
      }} />
    </View>
  </View>
}
