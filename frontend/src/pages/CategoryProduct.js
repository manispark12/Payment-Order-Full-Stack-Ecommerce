import React ,{useEffect, useState} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'

import VerticalCard from '../Components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {

    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading]  = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
 const selectedCategory = urlSearch.get("category") || "";
const urlCategoryListinArray = selectedCategory ? [selectedCategory] : [];
    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true

      
    })
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [sortBy, setSortBy] = useState("")

    const fetchData = async()=>{
     
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()

      setData(dataResponse?.data || [])
      

    }

    const handleSelectCategory = (e) =>{
      const {name, value, checked} = e.target;
      setSelectCategory((preve) =>{
        return{
          ...preve,
          [value] : checked
        }
      })
      
    }
    useEffect(() =>{
        fetchData()
    },[filterCategoryList])
 
useEffect(() =>{
   const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
    if(selectCategory[categoryKeyName]){
      return categoryKeyName
    }
    return null
   }).filter(el =>el)
  setFilterCategoryList(arrayOfCategory)
  const urlFormat = arrayOfCategory.map((el,index) =>{
    if((arrayOfCategory.length - 1) === index ){
      return `category=${el}`
    }
    return `category=${el}&&` 
  })

  navigate("/product-category?"+urlFormat.join(""))
},[selectCategory])




const handleOnChangeSortBy = (e) =>{
  const {value} = e.target
  setSortBy(value)

  if (value === 'asc'){
    setData(preve => preve.sort((a,b) =>a.sellingPrice - b.sellingPrice))
  }
  if (value == "dsc"){
    setData(preve => preve.sort((a,b) =>b.sellingPrice - a.sellingPrice))
  }
  
}

useEffect(() =>{

},[sortBy])

  return (
    <div className='w-full p-4'>
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
      <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
      
           <div className=''> 
              <h3 className='text-base uppercase font-medium text-slate-500 border border-slate-500 border-b pb-1'>Sort by</h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                  <input type='radio' name ='sortBy' checked={sortBy === 'asc'} value={"asc"} onChange={handleOnChangeSortBy}/>
                  <label>Price - Low to High</label>

                </div>
                 <div className='flex items-center gap-3'>
                  <input type='radio' name ='sortBy' checked={sortBy === 'dsc'} value={"dsc"} onChange={handleOnChangeSortBy}/>
                  <label>Price - High to Low</label>
                  
                </div>
              </form>

           </div>



           <div className=''> 
              <h3 className='text-base uppercase font-medium text-slate-500 border border-slate-500 border-b pb-1'>Category</h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((categoryName, index) =>{
                    return(
                      <div className='flex items-center gap-3'>
                        <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>

           </div>
      </div>
      <div className='px-4'>
        <p className='font-medium text-slate-800 text-lg my-2'>Search Results :{data.length}</p>
      <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
         {
        data.length !== 0 && (
          <VerticalCard data={data} loading={loading}/>
        )
       }
      </div>
      </div>
      </div>

    </div>
  )
}

export default CategoryProduct