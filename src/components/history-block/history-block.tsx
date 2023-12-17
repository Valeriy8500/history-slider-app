import { centerX, centerY, numPoints, radius, slideInfo } from '../../constans/constans';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Circle } from '../circle/circle';
import { SwitchingButtons } from '../switching-buttons/switching-buttons';
import { Slider } from '../slider/slider';
import { IPointsPosition, ISlideState } from '../../interfaces/interfaces';
import './history-block.scss';

export const HistoryBlock = (): ReactElement => {
  const [slideInfoArr, setSlideInfoArr] = useState<ISlideState[]>(slideInfo);
  const [slideState, setSlideState] = useState<ISlideState>(slideInfo[0]);
  const [sliderAnimation, setSliderAnimation] = useState<boolean>(true);
  const [pointsPosition, setPointsPosition] = useState<IPointsPosition[]>([]);

  useEffect(() => {
    let arr: IPointsPosition[] = [];

    slideInfo.forEach((item) => {
      const angle = (item.numForCircle / numPoints) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      arr = [...arr, { x, y, id: item.id, name: item.name }];
    });

    setPointsPosition(arr);
  }, []);

  const onSliderAnimation = (): void => {
    setSliderAnimation(prev => !prev);
    setTimeout(() => {
      setSliderAnimation(prev => !prev);
    }, 750);
  };

  const changePositionOnRandomPoint = useCallback((id: number) => {
    let arr: IPointsPosition[] = [];

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
  }, [slideInfoArr]);

  const onPointClick = useCallback((id: number): void => {
    const newSlide = slideInfo.filter(i => i.id === id)[0];
    onSliderAnimation();
    setTimeout(() => {
      setSlideState(newSlide);
    }, 500);

    changePositionOnRandomPoint(id);
  }, [changePositionOnRandomPoint]);

  const changePositionOnRightBtn = useCallback((): void => {
    let arr: IPointsPosition[] = [];

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
  }, [slideInfoArr]);

  const changePositionOnLeftBtn = useCallback((): void => {
    let arr: IPointsPosition[] = [];

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
  }, [slideInfoArr]);

  const onClickRightBtn = useCallback((): void => {
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
  }, [changePositionOnRightBtn]);

  const onClickLeftBtn = useCallback((): void => {
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
  }, [changePositionOnLeftBtn]);

  return (
    <div className='history-block'>
      <Header />
      <div className='main-content'>
        <Circle
          pointsPosition={pointsPosition}
          onPointClick={onPointClick}
          slideState={slideState}
        />

        <SwitchingButtons
          onClickLeftBtn={onClickLeftBtn}
          onClickRightBtn={onClickRightBtn}
          slideState={slideState}
        />

        <Slider
          sliderAnimation={sliderAnimation}
          slideState={slideState}
        />
      </div>
    </div>
  );
}
