import { Header } from '../header/header';
import { Slider } from '../slider/slider';
import './history-block.scss';

export const HistoryBlock = () => {
  return (
    <div className='history-block'>
      <Header />
      <Slider />
    </div>
  );
}
