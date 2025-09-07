import React from 'react'
import log from '../assest/log.png'

const Logo = ({w,h}) => {
  return (
    <img src={log} className='w-16 h-20 object-contain bg-transparent'/>
  )
}

export default Logo