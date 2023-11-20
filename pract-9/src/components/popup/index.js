import { useContext } from 'react';
import './style.css';
import CalendarContext from '../../context/calendar.context';

const PopupComponent = () => {

 const { createEvent } = useContext(CalendarContext);

 if (!createEvent) {
  return null;
 }

 const x = createEvent.x;
 const y = createEvent.y;

 return (
  <div className='popup-wrapper' style={{ top: y, left: x }}>
   <div>Title: <input /></div>
   <div>Date: {createEvent.date.toLocaleString()}</div>
   <div>
    Description:
    <textarea></textarea>
   </div>
  </div>
 );
};


export default PopupComponent;
