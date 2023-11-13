import './style.css';
import SearchContext from '../../context/search.context';
import { useContext, useEffect } from 'react';

/**
 * 
 * @param {Object} props 
 * @param {string} props.title
 * @param {string} props.paramKey
 * @param {Array<{ name: string, value: string }>} props.dataSet 
 * @returns 
 */
const SelectorComponent = (props) => {

 const { setSearchParams } = useContext(SearchContext);
 useEffect(() => {
  setSearchParams(props.paramKey, dataSet[0].value);
 }, []);

 const dataSet = props.dataSet || [];

 if (!props.title && !dataSet.length) {
  return null;
 }


 const onChange = (event) => {
  const selectedValue = event.target.value;
  setSearchParams(props.paramKey, selectedValue);
 };

 return (
  <div className='selector-wrapper'>
   {props.title}:
   <select onChange={onChange}>
    {dataSet.map(el => (<option value={el.value}>{el.name}</option>))}
   </select>
  </div>
 );
};

export default SelectorComponent;