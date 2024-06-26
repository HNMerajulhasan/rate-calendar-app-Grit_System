// src/app/components/RateCalendar.tsx
"use client"
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface IRoomCategory {
  id: number;
  name: string;
  occupancy: number;
}

interface IRatePlan {
  id: number;
  name: string;
}

interface IRateCalendar {
  date: string;
  rate: number;
  min_length_of_stay: number;
  reservation_deadline: number;
  status: boolean;
  available: number;
  booked: number;
}

interface RateCalendarProps {
  startDate: string;
  endDate: string;
}

const fetchRateCalendar = async (startDate: string, endDate: string) => {
  const response = await axios.get(
    `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate}&end_date=${endDate}`
  );
  return response.data;
};

const RateCalendar = ({ startDate, endDate }: RateCalendarProps) => {
  const { data, isLoading, error } = useQuery(['rateCalendar', startDate, endDate], () =>
    fetchRateCalendar(startDate, endDate)
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">An error occurred while fetching the rate calendar.</Typography>;
  }

  return (
    <Box>
      {data?.roomCategories?.map((roomCategory: IRoomCategory) => (
        <Box key={roomCategory.id} mb={4}>
          <Typography variant="h6">{roomCategory.name}</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Rate Plan</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Min Length of Stay</TableCell>
                  <TableCell>Reservation Deadline</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Rooms to Sell</TableCell>
                  <TableCell>Net Booked</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.rateCalendars?.map((rateCalendar: IRateCalendar) => (
                  <TableRow key={rateCalendar.date}>
                    <TableCell>{rateCalendar.date}</TableCell>
                    <TableCell>{rateCalendar.rate}</TableCell>
                    <TableCell>{rateCalendar.min_length_of_stay}</TableCell>
                    <TableCell>{rateCalendar.reservation_deadline}</TableCell>
                    <TableCell>{rateCalendar.status ? 'Sellable' : 'Not Sellable'}</TableCell>
                    <TableCell>{rateCalendar.available}</TableCell>
                    <TableCell>{rateCalendar.booked}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};

export default RateCalendar;
