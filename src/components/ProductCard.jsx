import React from 'react'
import { IoCartOutline } from 'react-icons/io5';

function ProductCard({ product, addToCart }) {
    console.log(product);
    
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max flex justify-center items-center flex-col'>
     <img src={product.image} alt={product.title} className='bg-gray-100 aspect-square h-[200px]' />
     <h1 className='line-clamp-2 p-1 font-semibold'>{product.title}</h1>
     <p className='my-1 text-lg text-gray-800 font-bold'>${product.price}</p>
     <button 
      onClick={() => addToCart(product)}
     className='bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold'>
        <IoCartOutline className='w-6 h-6'/>Add to Cart
     </button>
     </div>
  )
}

export default ProductCard