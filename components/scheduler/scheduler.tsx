import { Plus, X } from 'lucide-react-native';
import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
] as const;

const _spacing = 10;
const _color = '#ececec';
const _borderRadius = 16;
const _startHour = 8;
const _damping = 40;
const _entering = FadeInDown.springify().damping(_damping)
const _exiting = FadeOut.springify().damping(_damping)
const _layout = LinearTransition.springify().damping(_damping)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

function HourBlock({block}: {block: number}) {
  return (
    <View style={{
      borderWidth: 1,
      borderColor: _color,
      borderRadius: _borderRadius - _spacing,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: _spacing / 4,
    }}>
      <Text>
        {block > 9 ? block : `0${block}`}:00{" "}
        {block > 11 && block < 24? 'PM' : 'AM'}
      </Text>
    </View>
  )
}

function DayBlock() {
  const [hours, setHours] = useState([_startHour]);
  return (
    <Animated.View entering={_entering} exiting={_exiting} layout={_layout} style={{
      gap: _spacing,
    }}>
      {
        hours.map((hour) => (
          <Animated.View entering={_entering} exiting={_exiting} layout={_layout} key={`hour-${hour}`} style={{ flexDirection: 'row', gap: _spacing, alignItems: 'center' }}>
            <Text>From: </Text>
            <HourBlock block={hour} />
            <Text>To: </Text>
            <HourBlock block={hour + 1} />
            <AnimatedPressable
              onPress={() => {
                setHours((prev) => [...prev.filter((k) => k !== hour)])
              }}
            >
              <View style={{
                backgroundColor: _color,
                height: 24,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: _borderRadius - _spacing
              }}>
                <X size={14} color="#555" />
              </View>
            </AnimatedPressable>
          </Animated.View>
        ))
      }
      <AnimatedPressable
      layout={_layout}
       onPress={() => {
        if (hours.length === 0) {
          setHours([_startHour])
          return
        }
        setHours((prev) => [...prev, prev[prev.length - 1] + 1])
       }}
       >
        <View style={{
          flexDirection: 'row',
          gap: _spacing / 2,
          padding: _spacing,
          borderRadius: _borderRadius - _spacing / 2,
          backgroundColor: _color,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: _spacing / 2
        }}>
          <Plus size={18} color="#333" />
          <Text style={{ fontSize: 14, color: '#333' }}>Add more</Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  )
}

function Day({day} : {day: typeof weekDays[number]}) {
  const [isOn, setIsOn] = useState(false);
  return (
    <Animated.View layout={_layout} style={{
      borderWidth: 1,
      borderColor: _color,
      borderRadius: _borderRadius,
      padding: _spacing,
      backgroundColor: isOn ? 'transparent' : _color
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>{day}</Text>
        <Switch value={isOn} onValueChange={value => setIsOn(value)} trackColor={{ true: '#666'}} style={{
          transformOrigin: ['100%', '50%', 0],
          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }]
        }} />
      </View>
      {isOn && <DayBlock />}
    </Animated.View>
  )
}

export default function Scheduler() {
  return (
    <View style={{
      padding: _spacing,
      gap: _spacing,
      flex: 1,
      justifyContent: 'center',
    }}>
      {weekDays.map((day, index) => {
        return (<Day day={day} key={`day-${day}`} />)
      })}
    </View>
  )
}