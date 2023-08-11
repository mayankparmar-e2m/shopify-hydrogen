import {Swiper, SwiperSlide} from 'swiper/react';
import SanityImage from '~/components/global/SanityImage';
import SanityLink from '~/components/global/SanityLinks';
export default function HomeCollectionList({section}) {
  return (
    <section className="collection-grid">
      <div className="container mx-auto">
        {/* gid structure in desktop */}
        <div className="collection-grid__wrapper hidden md:flex items-center flex-wrap gap-5">
          {section.map((collection, index) => {
            return (
              <SanityLink
                data={collection.url}
                className={` block collection-grid__item relative ${
                  index <= 1
                    ? 'md:w-[calc(50%-20px)]'
                    : 'md:w-[calc(33.333%-20px)]'
                }`}
                key={`${collection.title}-${index}`}
              >
                <div
                  className={`collection-grid__item__title flex-shrink-0 flex-grow-[1] absolute left-1/2 -translate-x-1/2  bottom-9 ${
                    index <= 1
                      ? 'md:left-8 md:bottom-7 md:translate-x-0'
                      : 'md:left-1/2 md:-translate-x-1/2 md:bottom-7'
                  } `}
                >
                  {collection?.subtitle && (
                    <p className="text-white text-center md:text-left text-xs mb-2 md:mb-5 font-medium uppercase tracking-wider">
                      {collection?.subtitle}
                    </p>
                  )}
                  {collection?.title && (
                    <p className="text-white text-xl md:text-3xl text-center md:text-left font-normal uppercase leading-9 tracking-widest">
                      {collection?.title}
                    </p>
                  )}
                </div>
                <div className="image">
                  <SanityImage
                    src={collection.image.asset._ref}
                    alt={collection?.title || 'collection list'}
                  />
                </div>
              </SanityLink>
            );
          })}
        </div>
        {/* slider structure in mobile */}
        <div className="collection-slider__wrapper block md:hidden">
          <Swiper
            slidesPerView={1.5}
            loop={true}
            centeredSlides={true}
            spaceBetween={35}
            className="mySwiper"
          >
            {section.map((collection, index) => {
              return (
                <SwiperSlide key={`${collection.title}-${index}`}>
                  <SanityLink
                    data={collection.url}
                    className={` block collection-slider__item relative `}
                    key={`${collection.title}-${index}`}
                  >
                    <div
                      className={`collection-slider__item__title flex-shrink-0 flex-grow-[1] absolute left-1/2 -translate-x-1/2  bottom-9  `}
                    >
                      {collection?.subtitle && (
                        <p className="text-white text-center text-xs mb-2  font-medium uppercase tracking-wider">
                          {collection?.subtitle}
                        </p>
                      )}
                      {collection?.title && (
                        <p className="text-white text-xl md:text-3xl text-center md:text-left font-normal uppercase leading-9 tracking-widest">
                          {collection?.title}
                        </p>
                      )}
                    </div>
                    <div className="image">
                      <SanityImage
                        src={collection.image.asset._ref}
                        alt={collection?.title || 'collection list'}
                        width={300}
                        height={300}
                        layout={'responsive'}
                      />
                    </div>
                  </SanityLink>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
