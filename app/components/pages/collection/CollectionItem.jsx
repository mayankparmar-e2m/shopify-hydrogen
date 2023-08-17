import { Link } from "@remix-run/react";
import { Image } from "@shopify/hydrogen";

export default function CollectionItem({ collection, index }) {
  return (
    <Link
      className="collection-item w-full md:w-[calc(33.33%-16px)] md:flex-shrink-0  mb-10 md:mb-14"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection.image && (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
        />
      )}
      <h5 className='text-center text-primary text-sm md:text-xl font-normal uppercase tracking-widest my-7'>{collection.title}</h5>
      <div className='text-center px-3 py-4 bg-primary max-w-[200px] mx-auto rounded'>
        <span className='text-white uppercase text-sm font-normal tracking-widest'>View products</span>
      </div>
    </Link>
  );
}