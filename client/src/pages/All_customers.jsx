import React from 'react'
import { useEffect, useState } from "react";
import banner1 from '../assets/banner.png'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import NoData from '../components/NoData'








const All_customers = () => {


  const orders = useSelector(state => state.orders.order)
  //console.log(orders);

  const [orders1, setOrders] = useState([]);
  console.log("orders1:-->",orders1);

  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()


  //console.log("-----> cat data: ->",categoryData)
  //console.log("-----> sub cat data: ->",subCategoryData)
  //console.log("-----> loadingCategory: ->",loadingCategory)
  //console.log("navigate:",navigate);

  const handleRedirectProductListpage = (id,cat)=>{
      console.log("-- Handle Redirect --",id,cat)

      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })


      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
      console.log("--Url--",url)
      navigate(url)
      
  }

  

  return (
    
   <section className='bg-white'>
      <div className='container mx-auto'>

          <p>Hi! initial page of mine!</p>
      </div>

      <div className='container mx-auto'>
          <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner1 && "animate-pulse my-2" } `}>
              <img
                src={banner1}
                className='w-full h-full hidden lg:block'
                alt='banner' 
              />

               <img
                src={banner1}
                className='w-full h-full lg:hidden'
                alt='banner' 
              />
          </div>
      </div>



      {/* order section start */}
      <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
       

        {
          orders.map((order,index)=>{
            console.log("check -- order:",order," Index ",index);
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm'>
                  <p>Order No : {order?.orderId}</p>
                  <div className='flex gap-3'>
                    <img
                      //src={order.product_details.image[0]} 
                      className='w-14 h-14'
                    />  
                    <p className='font-medium'>{order.product_details.name}</p>
                  </div>
              </div>
            )
          })
        }


    {
      <div>
      <h2>Customer Orders</h2>
      {orders1.map(order => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Total: {order.total}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
     </div>
    }

    </div>





      {
        categoryData?.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay 
              key={c?._id+"CategorywiseProduct"} 
              id={c?._id} 
              name={c?.name}
            />
          )
        })
      }

   </section>
  )
}

export default All_customers
