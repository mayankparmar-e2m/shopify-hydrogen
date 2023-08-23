import { useState } from "react";
import { MinusIcon, PlusIcon } from "~/components/global/Icons";

export default function QuantitySpinner() {
    const [quantity, setQuantity] = useState(1)
    const decreament = (e) => {
        e.stopPropagation()
        setQuantity((prevState) => {
            // debugger
            if (prevState > 1) {
                return prevState - 1
            }
            else {
                return prevState
            }
        })

    }
    const increament = () => {
        setQuantity((prevState) => {
            if (prevState >= 1) {
                return prevState + 1
            }
        })
    }
    return (
        <div className="product-quantity-wrapper flex items-center max-w-[118px] justify-center rounded-sm border border-stone-300 w-full">
            <div className={`decreament-quantity w-1/3 cursor-pointer h-12 flex items-center ${quantity == 1 && "opacity-50"}`} onClick={decreament}><MinusIcon className="mx-auto" /></div>
            <div className="quantity  w-1/3  text-center">{quantity}</div>
            <div className="increament-quantity  w-1/3 cursor-pointer h-12 flex items-center" onClick={increament}><PlusIcon className="mx-auto" /></div>
        </div>
    )
}
