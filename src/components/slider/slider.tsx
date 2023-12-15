import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';

import { centerX, centerY, numPoints, radius, slideInfo } from '../../constans/constans';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";
import { ReactElement, useEffect, useState } from 'react';
import './slider.scss';

export const Slider = (): ReactElement => {
  const [slideInfoArr, setSlideInfoArr] = useState(slideInfo);
  const [slideState, setSlideState] = useState(slideInfo[0]);
  const [currStartDate, setCurrStartDate] = useState(Number(slideState.startDate));
  const [currEndDate, setCurrEndDate] = useState(Number(slideState.endDate));
  const [sliderAnimation, setSliderAnimation] = useState(true);
  const [pointsPosition, setPointsPosition] = useState<any>([]);

  useEffect(() => {
    let arr: Object[] = [];

    slideInfo.forEach((item) => {
      const angle = (item.numForCircle / numPoints) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      arr = [...arr, { x, y, id: item.id }];
    });

    setPointsPosition(arr);
  }, []);

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

  const onClickRightBtn = () => {
    let arr: Object[] = [];

    const updatedSlideInfo = slideInfoArr.map((item, index) => {
      if (index === 0) {
        return { ...item, numForCircle: slideInfo[slideInfo.length - 1].numForCircle };
      } else {
        return { ...item, numForCircle: slideInfo[index - 1].numForCircle };
      }
    });

    const firstEl = updatedSlideInfo[0];
    updatedSlideInfo.push(firstEl);
    updatedSlideInfo.shift();

    setSlideInfoArr(updatedSlideInfo);

    updatedSlideInfo.forEach((item) => {
      const angle = (item.numForCircle / numPoints) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      arr = [...arr, { x, y, id: item.id }];
    });

    setPointsPosition(arr);

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

  return (
    <div className='main-content'>
      <div className='circle-container'>
        <div className="circle">
          <div className='point-container'>
            {pointsPosition.map((item: { x: number, y: number, id: number }) => {
              return (
                <div
                  key={item.id}
                  className="point"
                  style={{ left: `${item.x}px`, top: `${item.y}px` }}
                  id={String(item.id)}
                  onClick={() => onPointClick(item.id)}
                ></div>
              );
            })}
          </div>
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

      <div
        className={
          sliderAnimation ? 'slider-container slider-container-fade-in'
            : 'slider-container slider-container-fade-out'
        }
      >
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

