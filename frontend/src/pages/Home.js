import React from 'react'
import CategoryList from '../Components/CategoryList'
import BannerProduct from '../Components/BannerProduct'
import HorizontalCardProduct from '../Components/HorizontalCardProduct'
import VerticalCardProduct from '../Components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct heading={"Top Airpodes"} category={"airpodes"} />
      <HorizontalCardProduct heading={"Popular Watches"} category={"watches"}/>

      <VerticalCardProduct heading={"Printers"} category={"printers"}/>
      <VerticalCardProduct heading={"Popular Processors"} category={"processors"}/>
      <VerticalCardProduct heading={"Mobiles"} category={"mobiles"}/>
      <VerticalCardProduct heading={"Mouse"} category={"mouse"}/>
      <VerticalCardProduct heading={"Television"} category={"televisions"}/>
      <VerticalCardProduct heading={"Camera & Photopgraphy"} category={"camera"}/>
      <VerticalCardProduct heading={"Wired Earphones"} category={"earphones"}/>
      <VerticalCardProduct heading={"speaker"} category={"speakers"}/>
      <VerticalCardProduct heading={"Refrigerator"} category={"refrigerator"}/>
      <VerticalCardProduct heading={"Trimmers"} category={"trimmers"}/>

    </div>
    
  )
}

export default Home