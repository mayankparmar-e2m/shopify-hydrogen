import { flattenConnection, useMoney } from "@shopify/hydrogen"
import VariantSelector from "~/components/global/VariantSelector"
import QuantitySpinner from "./QuantitySpinner"

export default function ProductDetail({ product, selectedVariant }) {
    const selectedVariantPrice = useMoney(selectedVariant?.price)
    return (
        <div className='product-details w-[calc(50%-20px)]'>
            <h1 className='text-primary text-2xl font-normal uppercase leading-loose tracking-widest'>{product.title}</h1>
            <div className='product-variant-price flex items-center gap-9 pb-5  border-b border-primary'>
                {
                    selectedVariantPrice && <span className='text-accent text-xl font-normal leading-loose tracking-tight'>{selectedVariantPrice.withoutTrailingZeros}</span>
                }
                {
                    selectedVariant.title && <span className='text-accent text-sm font-normal leading-snug tracking-tight relative before:absolute before:contents-[""] before:w-1 before:h-1 before:bg-accent before:rounded-full before:top-1/2 before:-left-5 before:-translate-y-1/2 uppercase'>{selectedVariant.title}</span>
                }
                <span></span>
            </div>
            {
                product.description && <div className='product-description py-5'>
                    <p className='text-accent text-sm font-normal leading-snug tracking-tight'>{product.description}</p>
                </div>
            }
            {/* variant selector */}
            <VariantSelector product={product} selectedVariant={selectedVariant} />
            {/* Quantity Spinner */}
            <QuantitySpinner />
        </div>
    )
}
