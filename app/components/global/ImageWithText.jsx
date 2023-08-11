import PortableText from './PortableText';
import SanityImage from './SanityImage';
import SanityLink from './SanityLinks';

export default function ImageWithText({section}) {
  const {image, title, desc, ctaUrl, ctaLabel} = section;
  return (
    <div className="image-with-text bg-color_beige py-16 ">
      <div className="container mx-auto px-6 md:px-0">
        <div className="image-with-text__wrapper block md:flex md:items-center md:gap-20">
          <div className="image">
            <SanityImage src={image.asset._ref} alt={title} />
          </div>
          <div className="text-wrapper my-9">
            <h2 className="text-primary text-2xl md:text-3xl font-normal uppercase leading-9 tracking-widest">
              {title}
            </h2>
            <PortableText blocks={desc} />
            <div className="btn mt-10 rounded-sm border border-teal-300 justify-center items-center gap-2.5 inline-flex">
              <SanityLink
                data={ctaUrl}
                className="text-center block px-7 py-4 text-teal-300 text-sm font-medium uppercase tracking-wide"
              >
                {ctaLabel}
              </SanityLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
