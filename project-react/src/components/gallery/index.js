import { useState } from 'react';
import './style.css';
import like from './images/like.png';
import dislike from './images/dislike.png';
import selectedLike from './images/like (1).png';
import selectedDislike from './images/dislike (1).png';
import * as uuid from 'uuid';

/**
 * 
 * @param {Object} props 
 * @param {string} props.title 
 * @param {string} props.imageSrc 
 * @returns 
 */
const GalleryItemComponent = (props) => {

 let [selected, setSelected] = useState(null);

 const id = uuid.v1();
 const likeId = `like-${id}`;
 const dislikeId = `dislike-${id}`;
 const groupName = `group-${id}`;

 return (
  <div className='gallery-item'>
   <img src={props.imageSrc} />
   <div className='gallery-item-title'>title: {props.title}</div>
   <div className='gallery-item-feedback'>
    <input id={likeId} type='radio' name={groupName} />
    <label for={likeId} onClick={() => setSelected('like')}>
     <img src={selected == 'like' ? selectedLike : like} />
    </label>
    <input id={dislikeId} type='radio' name={groupName} />
    <label for={dislikeId} onClick={() => setSelected('dislike')}>
     <img src={selected == 'dislike' ? selectedDislike : dislike} />
    </label>
   </div>
  </div>
 );
};

const GalleryComponent = () => {

 const data = [
  {
   title: 'Title 1',
   imageSrc: './images/colors-1383652.jpg'
  },
  {
   title: 'Title 2',
   imageSrc: './images/forest-1400475.jpg'
  },
  {
   title: 'Title 3',
   imageSrc: './images/smoky-mountains-at-sunset-north-carolina-2152413.jpg'
  },
  {
   title: 'Title 3',
   imageSrc: './images/smoky-mountains-at-sunset-north-carolina-2152413.jpg'
  },
 ];

 return (
  <div className="gallery">
   {
    data.map(el => {
     return (<GalleryItemComponent title={el.title} imageSrc={el.imageSrc} />);
    })
   }
   {/* <GalleryItemComponent
    title='Title 1'
    imageSrc='./images/colors-1383652.jpg'
   />
   <GalleryItemComponent
    title='Title 2'
    imageSrc='./images/forest-1400475.jpg'
   />
   <GalleryItemComponent
    title='Title 3'
    imageSrc='./images/smoky-mountains-at-sunset-north-carolina-2152413.jpg'
   />
   <GalleryItemComponent
    title='Title 4'
    imageSrc='./images/smoky-mountains-at-sunset-north-carolina-2152413.jpg'
   /> */}
  </div>
 );
};

export default GalleryComponent;