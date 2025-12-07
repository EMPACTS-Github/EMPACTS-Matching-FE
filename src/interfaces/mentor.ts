export interface Mentor {
  id: string;
  name: string;
  avtUrl?: string;
  description?: string;
  sdgGoal?: string;
  locationBased?: string;
}

export interface SdgGoal {
  id: string;
  label: string;
}

export interface TimeSlot {
  id: string;
  from: number;
  to: number;
  isAvailable: boolean;
}

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface MentorAvailability {
  [key: string]: TimeSlot[];
}
