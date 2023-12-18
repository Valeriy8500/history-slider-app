import { ReactElement } from "react";
import { IEvent, ISliderProps } from "../../interfaces/interfaces";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/pagination';
import './slider.scss';

export const Slider = (props: ISliderProps): ReactElement => {

  const {
    sliderAnimation,
    slideState
  } = props;

  return (
    <div
      className={
        sliderAnimation ? 'slider-container slider-container-fade-in'
          : 'slider-container slider-container-fade-out'
      }
    >
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        className='slider'
      >
        {slideState.events.map((item: IEvent, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <div className='slide'>
                <div className='slide-date'>{item.date}</div>
                <div className='slide-info'>{item.event}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  )
};