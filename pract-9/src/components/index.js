import { useEffect, useState } from 'react';
import CalendarContext from '../context/calendar.context';
import './style.css';
import CurrentDateComponent from './currentDate';
import RadioComponent from './selector';
import MonthsComponent from './months';
import YearsComponent from './years';
import MonthComponent from './month';
import DayComponent from './day';
import PopupComponent from './popup';


function App () {


  // const currentDateHook = useState(new Date()); // => Array size 2
  // const currentDate = currentDateHook[0];
  // const setCurrentDate = currentDateHook[1]];
  const [currentDate, _setCurrentDate] = useState(new Date()); // => Array size 2
  const setCurrentDate = (callbackFunction) => {
    _setCurrentDate((prevDate) => {
      const newDate = callbackFunction(prevDate);

      localStorage.setItem('currentDate', newDate.toISOString());

      return newDate;
    });
  };

  useEffect(() => {
    const currentDate = localStorage.getItem("currentDate");
    if (currentDate) {
      _setCurrentDate(new Date(currentDate));
    }
  }, []);


  const [selectedPeriod, _setSelectedPeriod] = useState('month');
  const setSelectedPeriod = (callbackFunction) => {
    _setSelectedPeriod(callbackFunction);
  };

  const [createEvent, _setCreateEvent] = useState(null);
  const setCreateEvent = (callbackFunction) => {
    _setCreateEvent(callbackFunction);
  };
  let content = null;

  switch (selectedPeriod) {
    case 'years': {
      content = <YearsComponent />;
      break;
    }
    case 'months': {
      content = <MonthsComponent />;
      break;
    }
    case 'month': {
      content = <MonthComponent />;
      break;
    }
    case 'day': {
      content = <DayComponent />;
      break;
    }
    default: {
      content = null;
    }
  }

  return (
    <div className="App">
      <CalendarContext.Provider value={{
        currentDate,
        setSelectedPeriod,
        setCurrentDate,
        createEvent,
        setCreateEvent,
      }}>
        <PopupComponent />
        <header>
          <CurrentDateComponent />

          <RadioComponent keyName='years' title='years' />
          <RadioComponent keyName='months' title='months' />
          <RadioComponent keyName='month' title='month' />
          <RadioComponent keyName='day' title='day' />
        </header>

        {content}
      </CalendarContext.Provider >
    </div>
  );
}

export default App;