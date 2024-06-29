import React, { useRef } from 'react';
import './RoomCategorySection.css';
import { IRoomCategory, IRatePlan, IRoomInventoryCalender } from '../types';
import { FaUser } from 'react-icons/fa'; // Importing a person icon from react-icons

interface RoomCategorySectionProps {
  roomCategories: IRoomCategory[];
}

const RoomCategorySection: React.FC<RoomCategorySectionProps> = ({ roomCategories }) => {

  console.log('roomCategories',roomCategories)

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const getRoomStatus = (roomInventoryCalender: IRoomInventoryCalender[]): string => {
    if (!roomInventoryCalender || roomInventoryCalender.length === 0) {
      return "Not sellable";
    }
    const isSellable = roomInventoryCalender.some((calendar) => calendar.status);
    return isSellable ? "Sellable" : "Not sellable";
  };

  const dates = Array.from(new Set(roomCategories.flatMap(category =>
    category.ratePlans.flatMap(ratePlan =>
      ratePlan.calendar.map(entry => entry.date)
    )
  ))).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const handleMouseDown = (event: React.MouseEvent) => {
    if (tableContainerRef.current) {
      const startX = event.pageX - tableContainerRef.current.offsetLeft;
      const scrollLeft = tableContainerRef.current.scrollLeft;

      const handleMouseMove = (e: MouseEvent) => {
        const x = e.pageX - tableContainerRef.current!.offsetLeft;
        const walk = (x - startX) * 2; // Scroll faster
        tableContainerRef.current!.scrollLeft = scrollLeft - walk;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <div
      className="table-container"
      onMouseDown={handleMouseDown}
      ref={tableContainerRef}
    >
      <div className="table">
        <div className="header-row">
          {/* <div className="header-cell sticky">Below is your Search Result</div> */}
          {dates.map((date, index) => (
            <div key={index} className="header-cell">
              {/* {new Date(date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })} */}
            </div>
          ))}
        </div>
        {roomCategories.map(category => (
          <div key={category.id} className='full_cell'>
            <div className="row">
              <div className="cell sticky room-name room_row_color">{category.name}</div>
              {dates.map((date, index) => (
                <div key={`${category.id}-name-${index}`} className="cell date_row_color">
                  {new Date(date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
                </div>
              ))}
            </div>

            <div className="row">
              <div className="cell sticky title row_title">Room Status</div>
              {dates.map((date, index) => (
                <div key={`${category.id}-status-${index}`} className="cell roomStatus_design">
                  {category.roomStatus}
                </div>
              ))}
            </div>

            <div className="row">
              <div className="cell sticky title row_title">Rooms to Sell</div>
              {dates.map((date, index) => (
                <div key={`${category.id}-roomsToSell-${index}`} className="cell">
                  {category.roomsToSell}
                </div>
              ))}
            </div>

            <div className="row">
              <div className="cell sticky title row_title">Net Booked</div>
              {dates.map((date, index) => (
                <div key={`${category.id}-netBooked-${index}`} className="cell">
                  {category.netBooked}
                </div>
              ))}
            </div>

            {category.ratePlans.map(ratePlan => (
              <div key={ratePlan.id}>
                <div className="row">
                  <div className="cell sticky title row_title">{ratePlan.name}

                  <div className="user_design">
                    <FaUser /> x {category.occupancy}
                  </div>

                  </div>
                 
                  {dates.map((date, index) => {
                    const ratePlanForDate = ratePlan.calendar.find(entry => entry.date === date);
                    return (
                      <div key={`${ratePlan.id}-rate-${index}`} className="cell">
                        {ratePlanForDate ? ratePlanForDate.rate : 'No data'}
                      </div>
                    );
                  })}
                   
                </div>
             
              </div>
            ))}

            <div className="row">
              <div className="cell sticky title row_title">Min Stay</div>
              {dates.map((date, index) => {
                const ratePlanForDate = category.ratePlans.flatMap(ratePlan => ratePlan.calendar).find(entry => entry.date === date);
                return (
                  <div key={`${category.id}-minStay-${index}`} className="cell">
                    {ratePlanForDate ? ratePlanForDate.min_length_of_stay : 'No data'}
                  </div>
                );
              })}
            </div>
            <div className="row">
              <div className="cell sticky title row_title">Res Deadline</div>
              {dates.map((date, index) => {
                const ratePlanForDate = category.ratePlans.flatMap(ratePlan => ratePlan.calendar).find(entry => entry.date === date);
                return (
                  <div key={`${category.id}-resDeadline-${index}`} className="cell">
                    {ratePlanForDate ? ratePlanForDate.reservation_deadline : 'No data'}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCategorySection;
