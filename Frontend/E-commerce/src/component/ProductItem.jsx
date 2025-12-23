import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import {Link} from 'react-router-dom'



export function ProductItem({productId,name,image,price}){
    const {currency} = useContext(ShopContext)
    return (
        <Link onClick={()=> scrollTo(0,0)} className='text-gray-700 p-2 cursor-pointer mb-4 ' to={`/collections/${productId}`}>
            <div className="overflow-hidden">
                <img className='hover:scale-110  transition ease-in-out 2xl:w-full h-64 lg:h-80 2xl:h-96' src={image} alt=""  />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className=' text-sm font-medium '><span className="pr-1">{currency}</span>{price}</p>
        </Link>
    )
}