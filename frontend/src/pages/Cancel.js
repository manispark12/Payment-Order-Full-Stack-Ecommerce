import React from 'react'
import CANCELIMAGE from '../assest/cancel.gif'
import { Link } from 'react-router-dom'

const Cancel = () => {
 return (
     <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
       <img src={CANCELIMAGE} height={150} width={150}/>
       <p className='text-green-600 font-bold text-xl'>Payment Cancelled</p>
       <Link to={"/cart"} className='p-2 px-3 mt-4 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-500'>See Cart</Link>
     </div>
   )
}

export default Cancel