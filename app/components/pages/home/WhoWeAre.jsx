import SanityImage from '~/components/global/SanityImage';
import SanityLink from '~/components/global/SanityLinks';
export default function WhoWeAre({section}) {
  const {title, ctaLabel, ctaUrl, data} = section;
  return (
    <section className="who-we-are pt-24">
      <h2 className="text-center text-primary text-3xl font-normal uppercase leading-9 tracking-widest mb-10 md:mb-12">
        {title}
      </h2>
      <div className="bg-color_beige mt-32 text-center">
        <div className="container mx-auto">
          <div className="who-we-are__wrapper  flex items-center gap-14 justify-center flex-wrap">
            {data.map((item, index) => {
              return (
                <div
                  className="icon-wrapper flex-shrink-0  px-10 md:px-0 flex-grow w-full md:w-[calc(20%-56px)]"
                  key={`${item._type}-${index}`}
                >
                  <div
                    className={`icon-image max-w-[145px] w-full  mx-auto ${
                      index == 0 && '-mt-[72.5px]'
                    } md:-mt-[72.5px]`}
                  >
                    <SanityImage
                      src={item.image.asset._ref}
                      alt={item.title}
                      className="rounded-full"
                      noSrcSet={true}
                      loading={'lazy'}
                    />
                  </div>
                  <p className="text-center mb-3 mt-5 text-primary text-xs font-normal uppercase tracking-wider">
                    {item.title}
                  </p>
                  <p className="text-center text-neutral-800 text-xs font-normal leading-tight tracking-tight">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="btn-wtapper w-40 h-12 mt-12 mb-24  rounded-sm border border-teal-300 justify-center items-center gap-2.5 inline-flex">
            <SanityLink
              data={ctaUrl}
              className="text-center block px-7 py-4 text-teal-300 text-sm font-medium uppercase tracking-wide"
            >
              {ctaLabel}
            </SanityLink>
          </div>
        </div>
      </div>
    </section>
  );
}
