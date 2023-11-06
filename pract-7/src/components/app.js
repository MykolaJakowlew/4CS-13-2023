import { useState } from 'react';
import * as uuid from 'uuid';
import GoodsComponent from './goods';
import CounterComp from './counter';
import './style.css';
import GoodsMock from './goodsMock.json';
import GoodsContext from '../context/goods.context';
import campIcon from './camp-table.png';

const goods = GoodsMock.map(el => ({ ...el, id: uuid.v1() }));

const AppComponent = () => {

 const [allGoods, setAllGoods] = useState(goods);
 const [selectedGoods, setSelectedGoods] = useState([]);

 const addGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => {
   return [...prevSelectedGoods, item];
  });
 };

 const removeGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => {
   return prevSelectedGoods.filter(el => el.id !== item.id);
  });
 };

 const campClick = () => {
  setAllGoods((prevAllGoods) => {
   return prevAllGoods.filter(el => {
    const exists = selectedGoods.find(item => item.id === el.id);
    // if (exists) {
    //  return false;
    // }
    // return true;

    return !exists;
   });
  });
  setSelectedGoods([]);
 };

 return (
  <div className='app'>
   <div className='wrapper'>
    <GoodsContext.Provider value={{ selectedGoods: selectedGoods, addGoods, removeGoods }}>
     <CounterComp />
     <div className='goods-wrapper'>
      {
       allGoods.map(el => {
        // return <GoodsComponent cost={el.cost} imageSrc={el.imageSrc} title={el.title} />;
        return <GoodsComponent {...el} key={el.id} />;
       })
      }
     </div>
     {/* <GoodsComponent cost={20} title='title' imageSrc='./images/goods-1.webp' /> */}

     <div className='camp'>
      <img src={campIcon} onClick={campClick} />
     </div>
    </GoodsContext.Provider>
   </div>
  </div>
 );
};

export default AppComponent;;