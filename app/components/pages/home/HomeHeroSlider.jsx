// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// import required modules
import {Pagination} from 'swiper/modules';
import SanityImage from '~/components/global/SanityImage';
import SanityLink from '~/components/global/SanityLinks';
export default function HomeHeroSlider({heroSlider}) {
  return (
    <section id="shopify-section-temmplate-home_slider">
      <Swiper
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        modules={[Pagination]}
        className="mySwiper"
        loop={true}
      >
        {heroSlider.map((slider, index) => {
          const {links} = slider;
          const btnLabel = links.title;
          return (
            <SwiperSlide key={index}>
              <div className="banner-wrappper relative">
                <div className="image-wrapper">
                  <SanityImage
                    src={slider.desk_image.asset._ref}
                    alt={'home banner image'}
                    className="h-full hidden md:block"
                    layout="responsive"
                    loading="eager"
                    decoding={'sync'}
                  />
                  <SanityImage
                    src={slider.mob_image.asset._ref}
                    alt={'home banner image'}
                    className="h-full block md:hidden"
                    loading="eager"
                    decoding={'sync'}
                  />
                </div>
                <div
                  className={`text-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-[70px] md:left-20 md:w-[450px] `}
                >
                  <p className="subttile text-center md:text-start font-medium text-primary text-xs">
                    {slider.subtitle}
                  </p>
                  <h5 className="title font-normal text-primary text-[28px] md:text-[32px] mt-4 mb-9">
                    {slider.title}
                  </h5>
                  <SanityLink
                    data={links.reference}
                    className={`block border-0 max-w-[143px] mx-auto md:ml-0 py-4 px-8 uppercase rounded-sm text-center w-full bg-secondary text-white text-sm font-medium`}
                  >
                    {btnLabel}
                  </SanityLink>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
