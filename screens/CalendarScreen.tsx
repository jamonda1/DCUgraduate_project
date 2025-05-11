import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSchedule } from './ScheduleContext';

const CalendarScreen = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const navigation = useNavigation();
  const { schedules, markedDates, updateMarkedDates, deleteSchedule } = useSchedule();

  useEffect(() => {
    updateMarkedDates(today);
    setSelectedDate(today);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddSchedule', { selectedDate })}>
          <Icon name="plus" size={24} color="#FF6F61" style={{ marginRight: 16 }} />
        </TouchableOpacity>
      ),
      title: '일정',
    });
  }, [navigation, selectedDate]);

  const handleDateSelect = (date: string) => {
    updateMarkedDates(date);
    setSelectedDate(date);
  };

  const handleLongPress = (index: number) => {
    Alert.alert('일정 삭제', '정말 삭제하시겠어요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => deleteSchedule(selectedDate, index),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={today}
        markedDates={markedDates}
        onDayPress={(day) => handleDateSelect(day.dateString)}
        theme={{
          selectedDayBackgroundColor: '#FF6F61',
          todayTextColor: '#FF6F61',
          arrowColor: '#FF6F61',
        }}
      />
      <View style={styles.scheduleBox}>
        {schedules[selectedDate]?.length ? (
          schedules[selectedDate].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('EditSchedule', { date: selectedDate, index })}
              onLongPress={() => handleLongPress(index)}>
              <Text style={styles.scheduleItem}>
                ⏰ {item.startTime} - {item.endTime} {item.title}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noSchedule}>📭 일정이 없습니다</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scheduleBox: {
    backgroundColor: '#FFE0E0',
    padding: 16,
    flex: 1,
  },
  scheduleItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  noSchedule: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default CalendarScreen;