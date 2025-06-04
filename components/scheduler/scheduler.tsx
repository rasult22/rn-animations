import { Plus } from 'lucide-react-native';
import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
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

function DayBlock() {
  const [hours, setHours] = useState([_startHour]);
  return (
    <View>
      <Text>
        day block
      </Text>
      <Pressable
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
      </Pressable>
    </View>
  )
}

function Day({day} : {day: typeof weekDays[number]}) {
  const [isOn, setIsOn] = useState(false);
  return (
    <View style={{
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
    </View>
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