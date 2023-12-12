import { HistoryBlock } from '../history-block/history-block';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './App.scss';

function App() {
  return (
    <>
      <HistoryBlock />

      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper: any) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        ...
      </Swiper>
    </>
  );
}

export default App;
