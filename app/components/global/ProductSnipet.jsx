import { Image, useMoney } from '@shopify/hydrogen'
import { PlaceHolderImage } from './Icons'
export default function ProductSnipet({product}) {
    const {featuredImage,title,priceRange}=product
    const {maxVariantPrice}=priceRange
    const price= useMoney(maxVariantPrice)
  return (
   <div className='product '>
     <div className='product-image border-solid border-[#DED9C64D] border-[1px]'>
       {
         featuredImage ? <Image data={featuredImage} alt={title}  aspectRatio="1/1"/>:<PlaceHolderImage type="product"/>
       }
        
     </div>
     <div className='product-title'>
        <p className='text-primary text-xs font-normal uppercase tracking-wider text-center mt-3 mb-[7px]'>{title}</p>
     </div>
     <div className='product-price mb-6'>
        <p className='text-center text-neutral-800 text-sm font-normal leading-snug tracking-tight'>{price.withoutTrailingZeros}</p>
     </div>
     <div className='product-add_to_cart text-center'>
        <button className='border-b border-solid pb-[2px] border-secondary product-add_to_cart_btn text-center text-secondary text-xs font-medium uppercase tracking-wide'>Add To Cart</button>
     </div>
   </div>
  )
}
