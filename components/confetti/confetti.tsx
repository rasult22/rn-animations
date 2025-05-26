
import { useRef, useState } from 'react';
import { View } from 'react-native';
import { ConfettiMethods, PIConfetti } from 'react-native-fast-confetti';

export default function Confetti() {
  const elRef = useRef<ConfettiMethods>(null)
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onTouchStart={e => {
      setPosition({
        x: e.nativeEvent.locationX,
        y: e.nativeEvent.locationY,
      });
      elRef.current?.restart();
    }}>
      <PIConfetti
        ref={elRef}
        colors={['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']}
        count={100}
        blastDuration={150}
        fallDuration={1200}
        sizeVariation={0.8}
        fadeOutOnEnd
        height={position.y}
        blastPosition={{
          x: position.x,
          y: position.y,
        }}
        onAnimationEnd={() => console.log('Animation ended')}
        />
    </View>
  );
}