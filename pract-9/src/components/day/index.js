import { useContext, useState } from 'react';
import './style.css';
import CalendarContext from '../../context/calendar.context';


const DayComponent = () => {

  const {
    setCreateEvent,
    currentDate,
    events = {}
  } = useContext(CalendarContext);

  const click = (event, hours) => {
    if (event.target !== event.currentTarget) {
      event.stopPropagation();
      return;
    }

    const newDate = new Date(currentDate);
    newDate.setHours(hours);
    setCreateEvent({ date: newDate, x: event.clientX, y: event.clientY, });
  };

  const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDay()}`;
  const eventsToday = events[key] || [];

  return (
    <div className='content-wrapper day-wrapper '>
      {
        Array(24).fill(null)
          .map((_, index) => {
            return (
              <div className='hours-wrapper'>
                <div className='hours'>
                  <span>{index}:00</span>
                </div>
                <div
                  className='content'
                  onClick={(event) => click(event, index)}>
                  {eventsToday.map(event => {
                    const hour = event.date.getHours();
                    if (hour !== index) {
                      return null;
                    }
                    return (
                      <div className='event'>
                        Title: {event.title}
                      </div>);
                  })}
                </div>
              </div>
            );
          })
      }
      <div className='hours-wrapper'>
        <div className='hours'>
          <span>24:00</span>
        </div>
        <div className='content'>
        </div>
      </div>
    </div>
  );
};

export default DayComponent;