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

      arr = [...arr, { x, y, id: item.id, name: item.name }];
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

    changePositionOnRandomPoint(id);
  };

  const changePositionOnRandomPoint = (id: number) => {
    let arr: Object[] = [];

    const copySlideInfoArr = [...slideInfoArr];
    const idx = slideInfoArr.indexOf(slideInfoArr.filter((item) => item.id === id)[0]);
    const spliceArr1 = copySlideInfoArr.splice(idx);
    const spliceArr2 = copySlideInfoArr.splice(0, idx);
    const newArr = [...spliceArr1, ...spliceArr2];
    const updatedSlideInfo = newArr.map((item, idx) => {
      return { ...item, numForCircle: idx + 5 };
    });

    setSlideInfoArr(updatedSlideInfo);

    updatedSlideInfo.forEach((item) => {
      const angle = (item.numForCircle / numPoints) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      arr = [...arr, { x, y, id: item.id, name: item.name }];
    });

    setPointsPosition(arr);
  };

  const changePositionOnRightBtn = () => {
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

      arr = [...arr, { x, y, id: item.id, name: item.name }];
    });

    setPointsPosition(arr);
  };

  const changePositionOnLeftBtn = () => {
    let arr: Object[] = [];

    const updatedSlideInfo = slideInfoArr.map((item, index) => {
      if (index === 5) {
        return { ...item, numForCircle: slideInfo[0].numForCircle };
      } else {
        return { ...item, numForCircle: slideInfo[index + 1].numForCircle };
      }
    });

    const lastEl = updatedSlideInfo[updatedSlideInfo.length - 1];
    updatedSlideInfo.unshift(lastEl);
    updatedSlideInfo.pop();

    setSlideInfoArr(updatedSlideInfo);

    updatedSlideInfo.forEach((item) => {
      const angle = (item.numForCircle / numPoints) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      arr = [...arr, { x, y, id: item.id, name: item.name }];
    });

    setPointsPosition(arr);
  };

  const onClickRightBtn = () => {
    changePositionOnRightBtn();
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
    changePositionOnLeftBtn();
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

  console.log('pointsPosition: ', pointsPosition);
  return (
    <div className='main-content'>
      <div className='circle-container'>
        <div className="circle">
          <div className='point-container'>
            {pointsPosition.map((item: { x: number, y: number, id: number, name: string }, idx: number) => {
              return (
                <div
                  key={item.id}
                  className="point"
                  style={{ left: `${item.x}px`, top: `${item.y}px` }}
                  id={String(item.id)}
                  onClick={() => onPointClick(item.id)}
                >
                  <div className="point-name">{idx === 0 ? item.name : null}</div>
                </div>
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

