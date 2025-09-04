import React from 'react'
import { useState,useEffect } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'

const OrderPage = () => {
  const [data,setData]=useState([])
  const fetchOrderDetails = async () => {
  try {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    });
    
    const responseData = await response.json();
    console.log("order list", responseData);
    if (Array.isArray(responseData.data)) {
      setData(responseData.data);
    } else if (Array.isArray(responseData)) {
      setData(responseData);
    } else {
      setData([]); // fallback, avoid .map crash
    }
  } catch (err) {
    console.error("Error fetching orders:", err);
    setData([]);
  }
};
  useEffect(()=>{
    fetchOrderDetails()
  },[])

  return (
    <div>
      {
        !data[0] && (
          <p>No Order available</p>
        )
      }
      <div className='p-4 w-full'>
        {
          data.map((item,index)=>{
            return(
              <div key={item.userId+index}>
                   <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                   <div className='border rounded'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                      <div className='grid gap-1'>
                        {
                          item?.productDetails.map((product,index)=>{
                            return(
                          <div key={product.productId+index} className='flex flex gap-3 bg-slate-100'>
                            <img src={product.image[0]} className='w-28 h-28 bg-white object-scale-down p-2'/>
                            <div>
                              <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                            <div className='flex items-center gap-5 mt-1'>
                            <div className='text-lg text-red-600'>{displayINRCurrency(product.price)}</div>
                            <p>Quantity:{product.quantity}</p>
                              </div>
                            </div>
                            </div>
                        )
                      })
                    }
                   
                    </div>
                    <div className='flex flex-col gap-4 p-2'>
                      <div>
                    <div className='text-lg font-medium'>Payment Details:</div>
                      <p className='font-medium ml-1'>payment method : {item.paymentDetails.payment_method_type[0]}</p>
                      <p className='font-medium ml-1'>payment Status:{item.paymentDetails.payment_status}</p>
                </div>
               <div>
                    <div className='text-lg font-medium'>shipping Details</div>   
                    {
                      item.shipping_options.map((shipping,index)=>{
                        return(
                          <div key={shipping.shipping_rate} className='text-lg font-medium ml-1'>
                            Shipping Amount: {shipping.shipping_amount}
                          </div>
                        )
                      })
                    } 
                    </div>
                    </div>
                    </div>  
                    <div className='font-semibold ml-auto w-fit lg:text-lg'>
                      Total Amount: {item.totalAmount}
                      </div>  
                      </div>
                      </div>
            )
          })
        }
        </div>
        </div>
  )
}          

export default OrderPage