import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Schedule = {
  date: string;
  title: string;
  startTime: string;
  endTime: string;
};

type ScheduleContextType = {
  schedules: Record<string, Schedule[]>;
  markedDates: Record<string, any>;
  addSchedule: (date: string, schedule: Schedule) => void;
  updateMarkedDates: (date: string) => void;
  deleteSchedule: (date: string, index: number) => void;
  updateSchedule: (date: string, index: number, newSchedule: Schedule) => void;
};

const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedules, setSchedules] = useState<Record<string, Schedule[]>>({});
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  // 🔄 1. 앱 시작 시 저장된 일정 불러오기
  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const savedData = await AsyncStorage.getItem('schedules');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setSchedules(parsed);
        }
      } catch (error) {
        console.error('📦 일정 불러오기 오류:', error);
      }
    };
    loadSchedules();
  }, []);

  // 💾 2. 일정 변경 시 자동 저장
  useEffect(() => {
    const saveSchedules = async () => {
      try {
        await AsyncStorage.setItem('schedules', JSON.stringify(schedules));
      } catch (error) {
        console.error('📦 일정 저장 오류:', error);
      }
    };
    saveSchedules();
  }, [schedules]);

  const updateMarkedDates = (date: string) => {
    const newMarked: Record<string, any> = {};

    Object.keys(schedules).forEach((d) => {
      const hasSchedule = schedules[d]?.length > 0;
      newMarked[d] = {
        selected: d === date,
        selectedColor: d === date ? '#FF6F61' : undefined,
        marked: hasSchedule,
        dotColor: hasSchedule ? '#FF6F61' : undefined,
      };
    });

    if (!newMarked[date]) {
      newMarked[date] = {
        selected: true,
        selectedColor: '#FF6F61',
      };
    }

    setMarkedDates(newMarked);
  };

  const addSchedule = (date: string, schedule: Schedule) => {
    setSchedules((prev) => {
      const updated = {
        ...prev,
        [date]: [...(prev[date] || []), schedule],
      };

      const newMarked: Record<string, any> = {};

      Object.keys(updated).forEach((d) => {
        const hasSchedule = updated[d]?.length > 0;
        newMarked[d] = {
          selected: false,
          marked: hasSchedule,
          dotColor: hasSchedule ? '#FF6F61' : undefined,
        };
      });

      newMarked[date].selected = true;
      newMarked[date].selectedColor = '#FF6F61';

      setMarkedDates(newMarked);
      return updated;
    });
  };

  const deleteSchedule = (date: string, index: number) => {
    setSchedules((prev) => {
      const updatedDay = [...(prev[date] || [])];
      updatedDay.splice(index, 1);
      const updated = { ...prev, [date]: updatedDay };

      const hasSchedule = updatedDay.length > 0;
      setMarkedDates((prevMarked) => ({
        ...prevMarked,
        [date]: hasSchedule
          ? {
              selected: true,
              selectedColor: '#FF6F61',
              marked: true,
              dotColor: '#FF6F61',
            }
          : {
              selected: true,
              selectedColor: '#FF6F61',
            },
      }));

      return updated;
    });
  };

  const updateSchedule = (date: string, index: number, newSchedule: Schedule) => {
    setSchedules((prev) => {
      const updatedDay = [...(prev[date] || [])];
      updatedDay[index] = newSchedule;
      return { ...prev, [date]: updatedDay };
    });
  };

  // 📌 markedDates 갱신
  useEffect(() => {
    const newMarked: Record<string, any> = {};
    Object.keys(schedules).forEach((date) => {
      if (schedules[date]?.length > 0) {
        newMarked[date] = {
          marked: true,
          dotColor: '#FF6F61',
        };
      }
    });
    setMarkedDates((prev) => ({
      ...prev,
      ...newMarked,
    }));
  }, [schedules]);

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        markedDates,
        addSchedule,
        updateMarkedDates,
        deleteSchedule,
        updateSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) throw new Error('useSchedule must be used within ScheduleProvider');
  return context;
};
