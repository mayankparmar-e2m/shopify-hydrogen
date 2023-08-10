import {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import ProductSnipet from '~/components/global/ProductSnipet';
export default function HomeFeaturedCollection({section}) {
  const {title, data} = section;
  const [activeCollectionIndex, setActiveCollectionIndex] = useState(0);
  return (
    <section className="feature-collection pt-20 pb-32">
      <h2 className="text-center text-primary text-2xl md:text-3xl font-normal uppercase leading-9 tracking-widest">
        {title}
      </h2>
      <div className="container mx-auto">
        <div className="feature-collection__tabs flex items-center justify-center gap-10 mt-7 mb-10">
          {data.map((tab, index) => {
            return (
              <div
                className="feature-collection__tab relative cursor-pointer"
                key={tab.data.data.collection.id}
                onClick={() => setActiveCollectionIndex(index)}
              >
                <p
                  className={`
                    ${
                      index === activeCollectionIndex
                        ? "text-secondary after:absolute after:h-[1px] after:w-full after:left-0 after:-bottom-2 after:bg-secondary after:content-['']"
                        : "text-['#231F20'] opacity-50"
                    }   
                    feature_title
                  text-center  text-xs font-medium uppercase tracking-wider`}
                >
                  {tab.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="feature-collection__tab-content">
          {data.map((tab, index) => {
            return (
              <div
                className="feature-collection__tab_slider"
                key={tab.data.data.collection.id}
              >
                {index == activeCollectionIndex && (
                  <Swiper
                    slidesPerView={1.5}
                    loop={true}
                    centeredSlides={true}
                    key={tab.data.data.collection.id}
                    spaceBetween={35}
                    className="mySwiper"
                    breakpoints={{
                      // when window width is >= 768px
                      768: {
                        spaceBetween: 22,
                        slidesPerView: 4,
                        centeredSlides: false,
                      },
                    }}
                  >
                    {tab.data.data.collection.products.nodes.map((product) => {
                      return (
                        <SwiperSlide key={product.id}>
                          <ProductSnipet product={product} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
