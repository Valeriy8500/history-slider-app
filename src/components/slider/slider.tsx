import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './slider.scss';
import { centerX, centerY, numPoints, radius, slideInfo } from '../../constans/constans';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";

export const Slider = () => {

  const points = slideInfo.map((item, index) => {
    const angle = (index / numPoints) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return (
      <div
        key={item.id}
        className="point"
        style={{ left: `${x}px`, top: `${y}px` }}
        id={String(item.id)}
      ></div>
    );
  });

  return (
    <div className='slider-container'>
      <div className='circle-container'>
        <div className="circle">{points}</div>
        <div className='line horizontal-line'></div>
        <div className='line vertical-line'></div>
      </div>

      <div className='switches-container'>
        <div className='slide-number'>06/06</div>
        <div className='buttons'>
          <button className='btn-left'><AiOutlineLeftCircle className='btn-icon' /></button>
          <button className='btn-right'><AiOutlineRightCircle className='btn-icon' /></button>
        </div>
      </div>

      <div className='slider'></div>
    </div>
  );
}

{/* <Swiper
  spaceBetween={50}
  slidesPerView={3}
  onSlideChange={() => console.log('slide change')}
  onSwiper={(swiper: any) => console.log(swiper)}
>
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
  <SwiperSlide>Slide 3</SwiperSlide>
  <SwiperSlide>Slide 4</SwiperSlide>
  ...
</Swiper> */}