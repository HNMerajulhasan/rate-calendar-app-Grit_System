// src/app/types.ts

export interface IRateCalendar {
  id: string;
  date: Date;
  rate: number;
  min_length_of_stay: number;
  reservation_deadline: number;
}

export interface IRatePlan {
  id: number;
  name: string;
  calendar: IRateCalendar[];
}

export interface IRoomInventoryCalender {
  id: string;
  date: Date;
  available: number;
  status: boolean;
  booked: number;
}

export interface IRoomCategory {
  id: string;
  name: string;
  occupancy: number;
  roomStatus?: string;
  roomsToSell?: number;
  netBooked?: number;
  ratePlans: IRatePlan[];
  roomInventoryCalender: IRoomInventoryCalender[];
}
