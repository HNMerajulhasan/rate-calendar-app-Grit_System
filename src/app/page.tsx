"use client";

import React, { useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

import RoomCategorySection from './components/RoomCategorySection';
import { fetchRoomCategories } from './services/rateCalendarApi';
import { IRoomCategory } from './types';
import moment, { Moment } from 'moment';
import CustomDateRangePicker from './components/DateRangePicker';

const MainPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [roomCategories, setRoomCategories] = useState<IRoomCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateRangeChange = async (start: Moment | null, end: Moment | null) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setLoading(true);
      try {
        const data = await fetchRoomCategories(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        setRoomCategories(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching room categories:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='container'>
      <Typography variant="h4" my={4}>
        Rate Calendar
      </Typography>
      <CustomDateRangePicker onChange={handleDateRangeChange} />
      {loading ? (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        // Render RoomCategorySection only if roomCategories has data
        roomCategories.length > 0 ? (
          <RoomCategorySection roomCategories={roomCategories} />
        ) : (
          <Typography variant="body1" mt={4}>No room categories available</Typography>
        )
      )}
    </div>
  );
};

export default MainPage;
