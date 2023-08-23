import { useNavigate } from '@remix-run/react';
import { flattenConnection, parseGid } from '@shopify/hydrogen';
import { handleize, removeDuplicatesObjFromArray } from '~/utils/utils';
export default function VariantSelector({ product, selectedVariant }) {
    const variants = flattenConnection(product.variants)
    const navigate = useNavigate();
    const optionSelector = (option) => {
        const selectedOptions = removeDuplicatesObjFromArray([...selectedVariant.selectedOptions, option], 'name')
        let selectedVariantId;
        for (let index = 0; index < variants.length; index++) {
            const variantOption = variants[index].selectedOptions;
            if (JSON.stringify(variantOption) === JSON.stringify(selectedOptions)) {
                selectedVariantId = parseGid(variants[index].id)?.id
                break
            }
        }
        if (selectedVariantId) {
            navigate(`${window.location.pathname}?variant=${selectedVariantId}`, {
                preventScrollReset: true
            })
        }
    }
    return (
        <div className='varinat-selector'>
            {
                product.options.map((option, index) => {

                    return <div className='variant-option mb-5'>
                        <div className='name mb-3'><p>{option.name}</p></div>
                        <div className='option-values flex items-center gap-5'>
                            {
                                option.values.map((value) => {
                                    const selectedOption = selectedVariant.selectedOptions[index].name === option.name && selectedVariant.selectedOptions[index].value === value
                                    return <div className='value' onClick={() => optionSelector({ __typename: 'SelectedOption', name: option.name, value })}>
                                        {
                                            option.name === "Size" && <div className={`p-3 cursor-pointer ${selectedOption && "rounded border border-solid border-primary"}`}><p className='text-accent text-base font-medium leading-snug tracking-tight '>{value}</p></div>
                                        }
                                        {
                                            (option.name === "Color" || option.name === "Colour") && <div className={`cursor-pointer ${selectedOption && "border-primary border-[2px] border-solid "}   w-10 h-10 flex items-center justify-center  rounded-full`}><img src={`https://cdn.shopify.com/s/files/1/0553/7624/8898/files/${handleize(value)}.png`} width={36} height={36} /></div>
                                        }

                                    </div>
                                })
                            }
                        </div>
                    </div>

                })
            }
        </div>
    )
}
