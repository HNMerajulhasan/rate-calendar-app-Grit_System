// import React from 'react';
// import './RoomCategorySection.css';
// import { IRoomCategory, IRatePlan, IRoomInventoryCalender } from '../types';

// interface RoomCategorySectionProps {
//   roomCategories: IRoomCategory[];
// }

// const RoomCategorySection: React.FC<RoomCategorySectionProps> = ({ roomCategories }) => {

//   const getRoomStatus = (roomInventoryCalender: IRoomInventoryCalender[]): string => {
//     if (!roomInventoryCalender || roomInventoryCalender.length === 0) {
//       return "Not sellable";
//     }
//     const isSellable = roomInventoryCalender.some((calendar) => calendar.status);
//     return isSellable ? "Sellable" : "Not sellable";
//   };

//   return (
//     <div>
//       {roomCategories?.map((category) => (
//         <div key={category.id} className="room-category-section">
//           <h2>{category.name}</h2>
//           <div>
//             Room status: {getRoomStatus(category.roomInventoryCalender)}
//           </div>
//           <div>Rooms to sell: {category.roomsToSell ?? 'N/A'}</div>
//           <div>Net booked: {category.netBooked ?? 'N/A'}</div>
//           <div>
//             <h3>Rate Plans</h3>
//             {category.ratePlans && category.ratePlans.length > 0 ? (
//               category.ratePlans.map((ratePlan: IRatePlan) => (
//                 <div key={ratePlan.id}>
//                   <div>Rate Plan: {ratePlan.name}</div>
//                   <div>Occupancy: {category.occupancy}</div>
//                   {ratePlan.calendar && ratePlan.calendar.length > 0 ? (
//                     ratePlan.calendar.map((calendarEntry) => (
//                       <div key={calendarEntry.id}>
//                         <div>Date: {new Date(calendarEntry.date).toLocaleDateString()}</div>
//                         <div>Rate: {calendarEntry.rate}</div>
//                         <div>Min. length of stay: {calendarEntry.min_length_of_stay}</div>
//                         <div>Reservation deadline: {calendarEntry.reservation_deadline}</div>
//                       </div>
//                     ))
//                   ) : (
//                     <div>No calendar entries available</div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div>No rate plans available</div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RoomCategorySection;



import React from 'react';
import './RoomCategorySection.css';
import { IRoomCategory, IRatePlan, IRoomInventoryCalender } from '../types';

interface RoomCategorySectionProps {
  roomCategories: IRoomCategory[];
}

const RoomCategorySection: React.FC<RoomCategorySectionProps> = ({ roomCategories }) => {

  const getRoomStatus = (roomInventoryCalender: IRoomInventoryCalender[]): string => {
    if (!roomInventoryCalender || roomInventoryCalender.length === 0) {
      return "Not sellable";
    }
    const isSellable = roomInventoryCalender.some((calendar) => calendar.status);
    return isSellable ? "Sellable" : "Not sellable";
  };

  // Get unique dates from the rate plans
  const dates = Array.from(new Set(roomCategories.flatMap(category =>
    category.ratePlans.flatMap(ratePlan =>
      ratePlan.calendar.map(entry => entry.date)
    )
  ))).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div className="table-container">
      <div className="table">
        <div className="header-row">
          <div className="header-cell">Room Name</div>
          {dates.map((date, index) => (
            <div key={index} className="header-cell">
              {new Date(date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
            </div>
          ))}
        </div>
        {roomCategories.map(category => (
          <div key={category.id} className="row">
            <div className="cell">{category.name}</div>
            {dates.map((date, index) => {
              const ratePlanForDate = category.ratePlans.flatMap(ratePlan => ratePlan.calendar).find(entry => entry.date === date);
              return (
                <div key={`${category.id}-${index}`} className="cell">
                  {ratePlanForDate ? (
                    <div>
                      <div>Status: {getRoomStatus(category.roomInventoryCalender)}</div>
                      <div>Rate: {ratePlanForDate.rate}</div>
                      <div>Occupancy: {category.occupancy}</div>
                      <div>Min. stay: {ratePlanForDate.min_length_of_stay}</div>
                      <div>Res. deadline: {ratePlanForDate.reservation_deadline}</div>
                    </div>
                  ) : (
                    <div>No data</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCategorySection;
