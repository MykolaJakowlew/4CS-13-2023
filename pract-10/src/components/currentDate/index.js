import { useContext } from 'react';
import './style.css';
import CalendarContext from '../../context/calendar.context';
import { MONTHS } from '../shared/months';

const CurrentDateComponent = () => {
 const { currentDate, setCurrentDate } = useContext(CalendarContext);

 const month = currentDate.getMonth();
 const day = currentDate.getDate();
 const year = currentDate.getFullYear();

 const today = () => {
  const now = new Date();
  setCurrentDate([
   { type: 'year', value: now.getFullYear() },
   { type: 'month', value: now.getMonth() },
   { type: 'day', value: now.getDate() },
  ]);
 };

 return (
  <div className='current-date-wrapper'>
   <div>{day} {MONTHS[month]}, {year}</div>
   <div id="today"><button onClick={today}>today</button></div>
  </div >);
};

export default CurrentDateComponent;