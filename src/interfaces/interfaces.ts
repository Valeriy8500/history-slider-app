export interface ISlideState {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  numForCircle: number;
  events: IEvent[];
}

export interface IEvent {
  date: string;
  event: string;
}

export interface IPointsPosition {
  x: number;
  y: number;
  id: number;
  name: string;
}

export interface ICircleProps {
  pointsPosition: IPointsPosition[];
  onPointClick: (id: number) => void;
  slideState: ISlideState;
}

export interface ISliderProps {
  sliderAnimation: boolean;
  slideState: ISlideState;
}

export interface ISwitchingButtonsProps {
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
  slideState: ISlideState;
}