import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';

import { centerX, centerY, numPoints, radius, slideInfo } from '../../constans/constans';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";
import { ReactElement, useEffect, useState } from 'react';
import './slider.scss';

export const Slider = (): ReactElement => {
  const [slideState, setSlideState] = useState(slideInfo[0]);
  const [currStartDate, setCurrStartDate] = useState(Number(slideState.startDate));
  const [currEndDate, setCurrEndDate] = useState(Number(slideState.endDate));
  const [sliderAnimation, setSliderAnimation] = useState(true);

  useEffect(() => {
    if (currStartDate < Number(slideState.startDate)) {
      currStartDate !== Number(slideState.startDate) && setTimeout(setCurrStartDate, 20, currStartDate + 1);
    } else {
      currStartDate !== Number(slideState.startDate) && setTimeout(setCurrStartDate, 20, currStartDate - 1);
    }
  }, [currStartDate, slideState]);

  useEffect(() => {
    if (currEndDate < Number(slideState.endDate)) {
      currEndDate !== Number(slideState.endDate) && setTimeout(setCurrEndDate, 20, currEndDate + 1);
    } else {
      currEndDate !== Number(slideState.endDate) && setTimeout(setCurrEndDate, 20, currEndDate - 1);
    }
  }, [currEndDate, slideState]);

  const onSliderAnimation = () => {
    setSliderAnimation(prev => !prev);
    setTimeout(() => {
      setSliderAnimation(prev => !prev);
    }, 750);
  };

  const onPointClick = (id: number) => {
    const newSlide = slideInfo.filter(i => i.id === id)[0];
    onSliderAnimation();
    setTimeout(() => {
      setSlideState(newSlide);
    }, 500);
  };

  const onClickLeftBtn = () => {
    onSliderAnimation();
    setTimeout(() => {
      setSlideState((prev) => {
        if (prev.id === 1) {
          return slideInfo.filter((i) => i.id === 6)[0];
        } else {
          return slideInfo.filter((i) => i.id === prev.id - 1)[0];
        }
      });
    }, 500);
  }

  const onClickRightBtn = () => {
    onSliderAnimation();
    setTimeout(() => {
      setSlideState((prev) => {
        if (prev.id === 6) {
          return slideInfo.filter((i) => i.id === 1)[0];
        } else {
          return slideInfo.filter((i) => i.id === prev.id + 1)[0];
        }
      });
    }, 500);
  };

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
        onClick={() => onPointClick(item.id)}
      ></div>
    );
  });

  return (
    <div className='main-content'>
      <div className='circle-container'>
        <div className="circle">
          {points}
          <div
            className="circle-date-container"
          >
            <span>{currStartDate}</span>
            <span>{currEndDate}</span>
          </div>
        </div>
        <div className='line horizontal-line'></div>
        <div className='line vertical-line'></div>
      </div>

      <div className='switches-container'>
        <div className='slide-number'>{`0${slideState.id}/06`}</div>
        <div className='buttons'>
          <button className='btn-left' onClick={() => onClickLeftBtn()}>
            <AiOutlineLeftCircle className='btn-icon' />
          </button>
          <button className='btn-right' onClick={() => onClickRightBtn()}>
            <AiOutlineRightCircle className='btn-icon' />
          </button>
        </div>
      </div>

      <div className={sliderAnimation ? 'slider-container fade-in' : 'slider-container fade-out'}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          className='slider'
        >
          {slideState.events.map((item, idx) => {
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
    </div>
  );
}

