// Utility functions for automatic scheduling system

export interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
  isBreak?: boolean;
  isPast?: boolean;
}

export interface WorkingHours {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startHour: number;
  endHour: number;
  breakStart?: number;
  breakEnd?: number;
  isWorking: boolean;
}

export interface Holiday {
  date: string; // YYYY-MM-DD format
  name: string;
  isRecurring?: boolean; // for holidays that repeat yearly
}

// Configuration for working hours
export const WORKING_HOURS: WorkingHours[] = [
  { dayOfWeek: 0, startHour: 0, endHour: 0, isWorking: false }, // Sunday - closed
  { dayOfWeek: 1, startHour: 8, endHour: 18, breakStart: 12, breakEnd: 13, isWorking: true }, // Monday
  { dayOfWeek: 2, startHour: 8, endHour: 18, breakStart: 12, breakEnd: 13, isWorking: true }, // Tuesday
  { dayOfWeek: 3, startHour: 8, endHour: 18, breakStart: 12, breakEnd: 13, isWorking: true }, // Wednesday
  { dayOfWeek: 4, startHour: 8, endHour: 18, breakStart: 12, breakEnd: 13, isWorking: true }, // Thursday
  { dayOfWeek: 5, startHour: 8, endHour: 18, breakStart: 12, breakEnd: 13, isWorking: true }, // Friday
  { dayOfWeek: 6, startHour: 8, endHour: 16, breakStart: 12, breakEnd: 13, isWorking: true }, // Saturday
];

// Default holidays (can be extended)
export const HOLIDAYS: Holiday[] = [
  { date: '2025-01-01', name: 'Ano Novo', isRecurring: true },
  { date: '2025-04-21', name: 'Tiradentes', isRecurring: true },
  { date: '2025-09-07', name: 'Independência do Brasil', isRecurring: true },
  { date: '2025-10-12', name: 'Nossa Senhora Aparecida', isRecurring: true },
  { date: '2025-11-02', name: 'Finados', isRecurring: true },
  { date: '2025-11-15', name: 'Proclamação da República', isRecurring: true },
  { date: '2025-12-25', name: 'Natal', isRecurring: true },
];

export class SchedulingEngine {
  private slotDuration: number = 30; // minutes
  private bufferTime: number = 5; // minutes between appointments
  private maxAdvanceDays: number = 30; // how many days in advance can book

  constructor() {}

  /**
   * Generate available time slots for a specific date
   */
  generateSlotsForDate(date: string, existingAppointments: any[] = []): TimeSlot[] {
    const targetDate = new Date(date);
    const dayOfWeek = targetDate.getDay();
    const now = new Date();
    const isToday = targetDate.toDateString() === now.toDateString();
    
    // Check if it's a holiday
    if (this.isHoliday(date)) {
      return [];
    }

    // Get working hours for this day
    const workingHours = WORKING_HOURS.find(wh => wh.dayOfWeek === dayOfWeek);
    if (!workingHours || !workingHours.isWorking) {
      return [];
    }

    const slots: TimeSlot[] = [];
    const { startHour, endHour, breakStart, breakEnd } = workingHours;

    // Generate morning slots (before break)
    if (breakStart) {
      slots.push(...this.generateSlotsForPeriod(
        date, startHour, breakStart, existingAppointments, isToday, now
      ));
    }

    // Generate afternoon slots (after break)
    const afternoonStart = breakEnd || startHour;
    slots.push(...this.generateSlotsForPeriod(
      date, afternoonStart, endHour, existingAppointments, isToday, now
    ));

    return slots;
  }

  /**
   * Generate slots for a specific time period
   */
  private generateSlotsForPeriod(
    date: string, 
    startHour: number, 
    endHour: number, 
    existingAppointments: any[], 
    isToday: boolean, 
    now: Date
  ): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const totalMinutes = (endHour - startHour) * 60;
    const intervalMinutes = this.slotDuration + this.bufferTime;

    for (let minuteOffset = 0; minuteOffset < totalMinutes; minuteOffset += intervalMinutes) {
      const slotStartMinutes = startHour * 60 + minuteOffset;
      const hour = Math.floor(slotStartMinutes / 60);
      const minute = slotStartMinutes % 60;
      
      // Don't create slots that go beyond the end hour
      if (hour >= endHour) break;

      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Skip slots that are in the past (for today)
      if (isToday) {
        const slotDateTime = new Date();
        slotDateTime.setHours(hour, minute, 0, 0);
        if (slotDateTime <= now) {
          continue;
        }
      }

      // Check if slot is already booked
      const isBooked = existingAppointments.some(apt => 
        apt.data === date && apt.hora === time && apt.status === 'agendada'
      );

      slots.push({
        time,
        available: !isBooked,
        appointmentId: isBooked ? existingAppointments.find(apt => 
          apt.data === date && apt.hora === time
        )?.id : undefined,
        isPast: false
      });
    }

    return slots;
  }

  /**
   * Check if a date is a holiday
   */
  private isHoliday(date: string): boolean {
    return HOLIDAYS.some(holiday => {
      if (holiday.isRecurring) {
        // For recurring holidays, check month and day only
        const holidayDate = new Date(holiday.date);
        const checkDate = new Date(date);
        return holidayDate.getMonth() === checkDate.getMonth() && 
               holidayDate.getDate() === checkDate.getDate();
      }
      return holiday.date === date;
    });
  }

  /**
   * Get the next available slot
   */
  getNextAvailableSlot(existingAppointments: any[] = []): { date: string; time: string } | null {
    const today = new Date();
    
    for (let i = 0; i < this.maxAdvanceDays; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const dateString = checkDate.toISOString().split('T')[0];
      
      const slots = this.generateSlotsForDate(dateString, existingAppointments);
      const availableSlot = slots.find(slot => slot.available);
      
      if (availableSlot) {
        return {
          date: dateString,
          time: availableSlot.time
        };
      }
    }
    
    return null;
  }

  /**
   * Get availability summary for multiple days
   */
  getAvailabilitySummary(days: number = 14, existingAppointments: any[] = []): {
    date: string;
    dayName: string;
    availableSlots: number;
    totalSlots: number;
    isHoliday: boolean;
    isWorking: boolean;
  }[] {
    const today = new Date();
    const summary = [];
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    for (let i = 0; i < days; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const dateString = checkDate.toISOString().split('T')[0];
      const dayOfWeek = checkDate.getDay();
      
      const isHoliday = this.isHoliday(dateString);
      const workingHours = WORKING_HOURS.find(wh => wh.dayOfWeek === dayOfWeek);
      const isWorking = workingHours?.isWorking || false;
      
      if (isWorking && !isHoliday) {
        const slots = this.generateSlotsForDate(dateString, existingAppointments);
        const availableSlots = slots.filter(slot => slot.available).length;
        
        summary.push({
          date: dateString,
          dayName: dayNames[dayOfWeek],
          availableSlots,
          totalSlots: slots.length,
          isHoliday,
          isWorking
        });
      } else {
        summary.push({
          date: dateString,
          dayName: dayNames[dayOfWeek],
          availableSlots: 0,
          totalSlots: 0,
          isHoliday,
          isWorking
        });
      }
    }

    return summary;
  }

  /**
   * Validate if a specific date/time slot is available
   */
  isSlotAvailable(date: string, time: string, existingAppointments: any[] = []): boolean {
    const slots = this.generateSlotsForDate(date, existingAppointments);
    const slot = slots.find(s => s.time === time);
    return slot?.available || false;
  }

  /**
   * Get suggested alternative slots if preferred slot is not available
   */
  getSuggestedAlternatives(
    preferredDate: string, 
    preferredTime: string, 
    existingAppointments: any[] = [], 
    count: number = 3
  ): { date: string; time: string; reason: string }[] {
    const alternatives = [];
    const targetDate = new Date(preferredDate);
    
    // Try same day, different times
    const sameDay = this.generateSlotsForDate(preferredDate, existingAppointments);
    const sameDayAvailable = sameDay.filter(slot => slot.available && slot.time !== preferredTime);
    
    sameDayAvailable.slice(0, 2).forEach(slot => {
      alternatives.push({
        date: preferredDate,
        time: slot.time,
        reason: 'Mesmo dia, horário diferente'
      });
    });

    // Try adjacent days, same time
    for (let i = 1; i <= 3 && alternatives.length < count; i++) {
      // Try next day
      const nextDate = new Date(targetDate);
      nextDate.setDate(targetDate.getDate() + i);
      const nextDateString = nextDate.toISOString().split('T')[0];
      
      if (this.isSlotAvailable(nextDateString, preferredTime, existingAppointments)) {
        alternatives.push({
          date: nextDateString,
          time: preferredTime,
          reason: `${i === 1 ? 'Próximo' : `${i} dias depois`} mesmo horário`
        });
      }

      // Try previous day (if not in the past)
      const prevDate = new Date(targetDate);
      prevDate.setDate(targetDate.getDate() - i);
      const prevDateString = prevDate.toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      
      if (prevDateString >= today && this.isSlotAvailable(prevDateString, preferredTime, existingAppointments)) {
        alternatives.push({
          date: prevDateString,
          time: preferredTime,
          reason: `${i === 1 ? 'Dia anterior' : `${i} dias antes`} mesmo horário`
        });
      }
    }

    return alternatives.slice(0, count);
  }
}

// Export singleton instance
export const schedulingEngine = new SchedulingEngine();