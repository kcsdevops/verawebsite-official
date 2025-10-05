'use client';

import { useState, useEffect } from 'react';

interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  isSelected: boolean;
  availableSlots: number;
  isHoliday: boolean;
  holidayName?: string;
}

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  availabilityData: {
    date: string;
    availableSlots: number;
    isHoliday: boolean;
    holidayName?: string;
  }[];
  minDate?: string;
  maxDate?: string;
}

export function Calendar({ 
  selectedDate, 
  onDateSelect, 
  availabilityData,
  minDate,
  maxDate 
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth, availabilityData, selectedDate]);

  const generateCalendarDays = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const firstDayOfCalendar = new Date(firstDayOfMonth);
    firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - firstDayOfMonth.getDay());

    const days: CalendarDay[] = [];
    const currentDate = new Date(firstDayOfCalendar);

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const dateString = currentDate.toISOString().split('T')[0];
      const availability = availabilityData.find(avail => avail.date === dateString);
      
      const isCurrentMonth = currentDate.getMonth() === currentMonth.getMonth();
      const isToday = currentDate.toDateString() === today.toDateString();
      const isPastDay = currentDate < today && !isToday;
      const isSelected = dateString === selectedDate;
      
      // Check date restrictions
      const isBeforeMinDate = minDate ? dateString < minDate : false;
      const isAfterMaxDate = maxDate ? dateString > maxDate : false;
      const isRestricted = isBeforeMinDate || isAfterMaxDate;

      days.push({
        date: dateString,
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isPast: isPastDay || isRestricted,
        isSelected,
        availableSlots: availability?.availableSlots || 0,
        isHoliday: availability?.isHoliday || false,
        holidayName: availability?.holidayName
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setCalendarDays(days);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const handleDateClick = (day: CalendarDay) => {
    if (day.isPast || !day.isCurrentMonth || day.isHoliday) {
      return;
    }
    onDateSelect(day.date);
  };

  const getDayClassName = (day: CalendarDay) => {
    const baseClasses = "h-12 w-full text-sm border border-gray-100 transition-all duration-200 relative group";
    
    if (!day.isCurrentMonth) {
      return `${baseClasses} text-gray-300 bg-gray-50 cursor-not-allowed`;
    }
    
    if (day.isPast) {
      return `${baseClasses} text-gray-400 bg-gray-100 cursor-not-allowed`;
    }
    
    if (day.isHoliday) {
      return `${baseClasses} text-red-500 bg-red-50 cursor-not-allowed`;
    }
    
    if (day.isSelected) {
      return `${baseClasses} bg-blue-500 text-white border-blue-600 cursor-pointer`;
    }
    
    if (day.isToday) {
      return `${baseClasses} bg-blue-50 text-blue-700 border-blue-200 cursor-pointer hover:bg-blue-100`;
    }
    
    if (day.availableSlots > 0) {
      return `${baseClasses} bg-white text-gray-700 cursor-pointer hover:bg-green-50 hover:border-green-200 hover:text-green-700`;
    }
    
    return `${baseClasses} bg-gray-50 text-gray-500 cursor-not-allowed`;
  };

  const getAvailabilityIndicator = (day: CalendarDay) => {
    if (!day.isCurrentMonth || day.isPast || day.isHoliday) {
      return null;
    }

    if (day.availableSlots === 0) {
      return (
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-red-400 rounded-full"></div>
      );
    }

    if (day.availableSlots <= 3) {
      return (
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
      );
    }

    return (
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-400 rounded-full"></div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          title="Mês anterior"
          aria-label="Navegar para o mês anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          title="Próximo mês"
          aria-label="Navegar para o próximo mês"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayNames.map((dayName) => (
          <div key={dayName} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50">
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => (
          <button
            key={`${day.date}-${index}`}
            onClick={() => handleDateClick(day)}
            className={getDayClassName(day)}
            title={
              day.isHoliday 
                ? `Feriado: ${day.holidayName}` 
                : day.availableSlots > 0 
                  ? `${day.availableSlots} horários disponíveis`
                  : day.isPast 
                    ? 'Data já passou'
                    : 'Sem horários disponíveis'
            }
          >
            <span className="relative z-10">{day.day}</span>
            {getAvailabilityIndicator(day)}
            
            {/* Tooltip for holidays */}
            {day.isHoliday && day.holidayName && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                {day.holidayName}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <span>Muitos horários</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            <span>Poucos horários</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
            <span>Sem horários</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Hoje</span>
          </div>
        </div>
      </div>
    </div>
  );
}