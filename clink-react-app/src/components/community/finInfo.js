import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import '../../styles/community/finInfo.css';
import News from './newsAPI';
function FinInfo({ data }) {
  return (
    <div className="finInfo">
      <p className="finTitle">
        <b>금융뉴스</b>
      </p>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        loop={true}
      >
        <SwiperSlide className="news">
          <News data={data} idx={1} />
        </SwiperSlide>
        <SwiperSlide className="news">
          <News data={data} idx={2} />
        </SwiperSlide>
        <SwiperSlide className="news">
          <News data={data} idx={3} />
        </SwiperSlide>
        <SwiperSlide className="news">
          <News data={data} idx={4} />
        </SwiperSlide>
        <SwiperSlide className="news">
          <News data={data} idx={5} />
        </SwiperSlide>
        <SwiperSlide className="news">
          <News data={data} idx={6} />
        </SwiperSlide>
        <SwiperSlide className="news">
          <News data={data} idx={7} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default FinInfo;
