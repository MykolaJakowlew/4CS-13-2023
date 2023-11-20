import { useContext, useState } from 'react';
import { MONTHS } from '../shared/months';
import './style.css';
import CalendarContext from '../../context/calendar.context';

const WEEK_DAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

function getDaysInMonth (year, month) {
  return new Date(year, month + 1, 0).getDate();
}

const MonthComponent = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const days = getDaysInMonth(year, month);

  const click = (day) => {
    setCurrentDate((prevCurrentDate) => {
      const newDate = new Date(prevCurrentDate);
      newDate.setDate(day);
      return newDate;
    });
  };

  return (
    <div className='content-wrapper month-wrapper'>
      <div className='header'>{MONTHS[month]}</div>
      {
        WEEK_DAYS.map(day => (<div className='day-name'>{day}</div>))
      }
      {
        Array(days).fill(null)
          .map((_, index) => {
            const date = new Date(year, month, index + 1);
            return (<div
              className='day content-item'
              style={{
                "--day-col-start": date.getDay() + 1
              }}
              onClick={() => click(index + 1)}
            >{index + 1}</div>);
          })
      }
    </div>
  );
};

export default MonthComponent;