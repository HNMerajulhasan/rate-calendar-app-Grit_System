// import React, { useState } from 'react';
// import { Container, Typography, Box, CircularProgress } from '@mui/material';
// import DateRangePicker from '../components/DateRangePicker';
// import RoomCategorySection from '../components/RoomCategorySection';
// import { fetchRoomCategories } from '../services/rateCalendarApi';
// import { IRoomCategory } from '../types';

// const IndexPage = () => {
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [roomCategories, setRoomCategories] = useState<IRoomCategory[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleDateRangeChange = async (start: Date | null, end: Date | null) => {
//     setStartDate(start);
//     setEndDate(end);
//     if (start && end) {
//       setLoading(true);
//       try {
//         const data = await fetchRoomCategories(); // Replace with actual API call
//         setRoomCategories(data);
//       } catch (error) {
//         console.error('Error fetching room categories:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" my={4}>
//         Rate Calendar
//       </Typography>
//       <DateRangePicker onChange={handleDateRangeChange} />
//       {loading ? (
//         <Box mt={4} display="flex" justifyContent="center">
//           <CircularProgress />
//         </Box>
//       ) : (
//         <RoomCategorySection roomCategories={roomCategories} />
//       )}
//     </Container>
//   );
// };

// export default IndexPage;
