import './slider.scss';

export const Slider = () => {
  return (
    <div className='slider-container'>
      <div className='slider'>
        <div className="circle">
          <div className='line horizontal-line'></div>
          <div className='line vertical-line'></div>
        </div>
      </div>

      <div className='events-container'>
        <div>13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды</div>
      </div>
    </div>
  );
}