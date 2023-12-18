import { ReactElement, useEffect, useState } from "react";
import { ICircleProps, IPointsPosition } from "../../interfaces/interfaces";
import './circle.scss';

export const Circle = (props: ICircleProps): ReactElement => {

  const {
    pointsPosition,
    onPointClick,
    slideState
  } = props;

  const [currStartDate, setCurrStartDate] = useState<number>(Number(slideState.startDate));
  const [currEndDate, setCurrEndDate] = useState<number>(Number(slideState.endDate));

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

  return (
    <div className='circle-container'>
      <div className="circle">
        <div className='point-container'>
          {pointsPosition.map((item: IPointsPosition, idx: number) => {
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
        <div className="circle-date-container">
          <span>{currStartDate}</span>
          <span>{currEndDate}</span>
        </div>
      </div>
      <div className='line horizontal-line'></div>
      <div className='line vertical-line'></div>
    </div>
  )
};