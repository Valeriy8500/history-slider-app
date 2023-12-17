import { ReactElement } from "react";
import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";
import { ISwitchingButtonsProps } from "../../interfaces/interfaces";
import './switching-buttons.scss';

export const SwitchingButtons = (props: ISwitchingButtonsProps): ReactElement => {

  const { onClickLeftBtn, onClickRightBtn, slideState } = props;

  return (
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
  )
};