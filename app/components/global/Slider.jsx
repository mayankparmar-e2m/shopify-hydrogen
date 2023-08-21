import {Navigation} from 'swiper/modules';
import {SliderNextIcon, SliderPrevIcon} from './Icons';
import {Swiper, SwiperSlide} from 'swiper/react';
export default function Slider({children, slides, key}) {
  return (
    <>
      <div id={`prev-slide`}>
        <SliderPrevIcon />
      </div>
      <Swiper
        slidesPerView={1.5}
        loop={true}
        centeredSlides={true}
        key={key}
        modules={[Navigation]}
        navigation={{
          prevEl: `#prev-slide`,
          nextEl: `#next-slide`,
        }}
        spaceBetween={35}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 768px
          768: {
            spaceBetween: 22,
            slidesPerView: 4,
            centeredSlides: false,
            loop: true,
            loopedSlides: 50,
          },
        }}
      >
        {slides.map((product) => {
          return <SwiperSlide key={product.id}>{children}</SwiperSlide>;
        })}
      </Swiper>
      <div id={`next-slide`}>
        <SliderNextIcon />
      </div>
    </>
  );
}
