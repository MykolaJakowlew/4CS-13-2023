import { useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import CalendarContext from '../../context/calendar.context';

const PopupComponent = () => {

 const { createEvent, setCreateEvent, addEvent } = useContext(CalendarContext);

 const inputRef = useRef();
 const textAreaRef = useRef();

 if (!createEvent) {
  return null;
 }

 const x = createEvent.x;
 const y = createEvent.y;

 const close = () => {
  setCreateEvent(null);
 };

 const click = () => {
  const key = `${createEvent.date.getFullYear()}-${createEvent.date.getMonth()}-${createEvent.date.getDay()}`;

  const title = inputRef.current.value;
  const description = textAreaRef.current.value;

  const eventData = {
   key,
   title,
   description,
   date: createEvent.date,
  };
  console.log(`eventData:${JSON.stringify(eventData)}`);

  addEvent(eventData);

  close();
 };

 return (
  <div className='popup-wrapper' style={{ top: y, left: x }}>
   <FontAwesomeIcon icon={faClose} id='popup-close' onClick={close} />
   <div>
    <div>Date: {createEvent.date.toLocaleString()}</div>
    <div>Title: <input ref={inputRef} /></div>
    <div>
     Description:
     <textarea ref={textAreaRef}></textarea>
    </div>
   </div>
   <button onClick={click}>save</button>
  </div>
 );
};


export default PopupComponent;
