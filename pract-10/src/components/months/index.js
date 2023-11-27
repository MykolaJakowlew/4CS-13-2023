import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import CalendarContext from '../../context/calendar.context';
import { MONTHS } from '../shared/months';

const MonthsComponent = () => {

 const navigate = useNavigate();
 const { month } = useParams();
 const { setCurrentDate, currentDate } = useContext(CalendarContext);

 const click = (index) => {
  setCurrentDate([{ value: index, type: 'month' }]);
 };

 useEffect(() => {
  if (!month) {
   return;
  }

  const monthNumber = +month;

  if (isNaN(monthNumber)) {
   return navigate('/page-not-found');
  }

  setCurrentDate([{ type: 'month', value: monthNumber }]);
 }, []);

 return (
  <div className='months-wrapper content-wrapper'>
   <div className='header'>{MONTHS[currentDate.getMonth()]}</div>
   {
    MONTHS.map((month, i) => (<div
     className='month content-item'
     onClick={() => click(i)}
    >{month}
    </div>))
   }
  </div >
 );
};

export default MonthsComponent;