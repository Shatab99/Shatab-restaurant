import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from '../../assets/home/slide1.jpg'
import slide2 from '../../assets/home/slide2.jpg'
import slide3 from '../../assets/home/slide3.jpg'
import slide4 from '../../assets/home/slide4.jpg'
import slide5 from '../../assets/home/slide5.jpg'
import Heading from '../SharedComponents/Heading';

const OrderOutline = () => {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <Heading subheading={'---From 11:00am to 10:00pm---'} heading={'ORDER ONLINE'}/>
      <div className='border-2 p-4 rounded-lg'>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          // centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide><img src={slide1} alt="" />
            <p className='text-center text-4xl font-semibold text-white -mt-20 drop-shadow-2xl'>SALAD</p>
          </SwiperSlide>
          <SwiperSlide><img src={slide2} alt="" />
            <p className='text-center text-4xl font-semibold text-white -mt-20 drop-shadow-2xl'>PIZZA</p>
          </SwiperSlide>
          <SwiperSlide><img src={slide3} alt="" />
            <p className='text-center text-4xl font-semibold text-white -mt-20 drop-shadow-2xl'>SOUP</p>
          </SwiperSlide>
          <SwiperSlide><img src={slide4} alt="" />
            <p className='text-center text-4xl font-semibold text-white -mt-20 drop-shadow-2xl'>DESERT</p>
          </SwiperSlide>
          <SwiperSlide><img src={slide5} alt="" />
          
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default OrderOutline;