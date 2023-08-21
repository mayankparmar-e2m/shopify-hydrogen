import SanityImage from './SanityImage';

export default function HeroImage({img_mob, title, img_desk}) {
  return (
    <div className="hero_image relative">
      <div className="image">
        {img_mob && (
          <SanityImage
            loading="eager"
            decoding={'sync'}
            layout="responsive"
            src={img_mob}
            className="block md:hidden"
            alt={title || 'hero image'}
          />
        )}
        {img_desk && (
          <SanityImage
            loading="eager"
            decoding={'sync'}
            layout="responsive"
            src={img_desk}
            className="hidden md:block"
            alt={title || 'hero image'}
          />
        )}
      </div>
      {title && (
        <div className="title absolute bottom-16 left-20">
          <p className="hidden md:block text-primary text-3xl font-normal uppercase leading-10 tracking-widest">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
