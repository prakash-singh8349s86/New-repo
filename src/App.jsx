import React, { useState } from 'react'
import axios from "axios";

const App = () => {
  
  const [products, setproducts] = useState([])
  const [copyProducts, setcopyProducts] = useState([])

  const getData = async ()=>{
    const response =await axios.get("https://fakestoreapi.com/products")
    // console.log(response.data)
    setproducts(response.data)
  }
  
  const AddToCart = (idx)=>{
    setcopyProducts([...copyProducts,products[idx]])
  }

  const RemoveProduct = (idx)=>{
     const toRemove = [...copyProducts]
     toRemove.splice(idx,1)
     setcopyProducts(toRemove)
  }

  return (
    <div className=''>
      <button className='py-2 px-4 rounded bg-black text-white text-xl m-4' onClick={()=>{getData()}}>Get Data</button>
      <div className='flex '>
        <div className='w-3/4 px-2 py-4 bg-gray-200 flex flex-wrap gap-4 items-center'>
          {
            products.map(function(elem,idx){

              const truncateDesc = (text,maxlen)=>{
                    return text.length > maxlen ? text.slice(0,maxlen)+'...':text
               }

              return <div key={idx} className=' bg-white w-[285px] h-[480px] rounded text-center overflow-hidden p-3 py-6 shadow-md shadow-gray-600'>
                 <img className='h-40 w-36 m-auto mb-2' src={elem.image} alt="" />
                 <h2 className='mb-2 text-lg font-medium'>{truncateDesc(elem.title, 20)}</h2>
                 <p className='text-sm mb-3'>{truncateDesc(elem.description,90)} </p>
                 <h4 className='mb-3'>⭐{elem.rating.rate}     {elem.rating.count}</h4>
                 <h4 className='text-xl font-semibold mb-'>${elem.price}</h4>
                 <div className='w-full bg-blue-500 text-white text-xl rounded py-2 px-4' onClick={()=>{AddToCart(idx)}}>Add to Cart</div>
              </div>
            })
          }
        </div>
        <div className='w-1/4 py-3 px-2 bg-slate-500'>
               <h2 className='text-white text-center text-xl font-semibold mb-4'>Cart</h2>
               {
                copyProducts.map(function(elem,idx){

                  const truncateDesc = (text,maxlen)=>{
                    return text.length > maxlen ? text.slice(0,maxlen)+'...':text
                  }

                  return <div className='w-full p-3 bg-white rounded flex items-center gap-3 mb-4'>
                    <img className='h-32 w-32 object-cover'  src={elem.image} alt="" />
                    <div>
                       <h1 className='mb-2 tracking-tighter font-medium'>{ truncateDesc(elem.title,50)}</h1>
                       <h1 className='mb-3 font-bold'>Price: ${elem.price}</h1>
                       <div className='px-3 py-2 bg-red-600 text-white text-sm rounded inline' onClick={()=>{RemoveProduct(idx)}}>Remove</div>
                    </div>
                  </div>
                })
               }
        </div>
      </div> 
    </div>
  )
}

export default App