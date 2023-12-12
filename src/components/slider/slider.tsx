import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './slider.scss';
import { centerX, centerY, numPoints, radius, slideInfo } from '../../constans/constans';

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
      <div className='slider'>
        <div className="circle">{points}</div>
        <div className='line horizontal-line'></div>
        <div className='line vertical-line'></div>
      </div>

      <div className='events-container'>
      </div>
    </div>
  );
}