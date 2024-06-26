// src/app/services/rateCalendarApi.ts

import axios from 'axios';
import { IRoomCategory } from '../types';

const API_URL = 'https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment';

export const fetchRoomCategories = async (startDate: string, endDate: string): Promise<IRoomCategory[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });

    const { data } = response.data;

    // Transform API data to match the IRoomCategory interface
    const transformedData = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      occupancy: item.occupancy,
      roomStatus: item.inventory_calendar.some((calendar: any) => calendar.status) ? 'Sellable' : 'Not sellable',
      roomsToSell: item.inventory_calendar.reduce((total: number, calendar: any) => total + calendar.available, 0),
      netBooked: item.inventory_calendar.reduce((total: number, calendar: any) => total + calendar.booked, 0),
      ratePlans: item.rate_plans.map((plan: any) => ({
        id: plan.id,
        name: plan.name,
        calendar: plan.calendar.map((entry: any) => ({
          id: entry.id,
          date: new Date(entry.date),
          rate: entry.rate,
          min_length_of_stay: entry.min_length_of_stay,
          reservation_deadline: entry.reservation_deadline,
        }))
      })),
      roomInventoryCalender: item.inventory_calendar.map((calendar: any) => ({
        id: calendar.id,
        date: new Date(calendar.date),
        available: calendar.available,
        status: calendar.status,
        booked: calendar.booked,
      }))
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching room categories:', error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};
