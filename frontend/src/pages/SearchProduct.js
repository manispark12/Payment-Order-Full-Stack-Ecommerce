import React, { useEffect ,useState} from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../Components/VerticalCard'

const SearchProduct = () => {
  const query = useLocation()
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)
  console.log("query",query.search)
  
 const fetchProduct = async () => {
  try {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();
    setData(Array.isArray(dataResponse.data) ? dataResponse.data : []);
  } catch (error) {
    console.error("Error fetching product:", error);
    setData([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() =>{
    fetchProduct()
  },[query])
  return (
    <div className='container w-full p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading .....</p>
        )
      }
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0  && !loading &&(
          <p className='bg-white text-lg text-center p-4'>No data Found ...</p>

        )
      }

      {
        data.length !== 0 && !loading && (
        <VerticalCard loading = {loading} data = {data}/>
            )

}
      
    </div>
  )
}

export default SearchProduct