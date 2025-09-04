import React, { useContext, useState, useEffect } from 'react';
import displayINRCurrency from '../helpers/displayCurrency';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import { Link } from 'react-router-dom';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(12).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className='max-w-7xl mx-auto px-4 w-full'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className='w-full h-full bg-white rounded-sm shadow animate-pulse p-4'
              >
                <div className='bg-slate-200 h-48 w-full mb-4'></div>
                <div className='h-5 bg-slate-200 rounded w-3/4 mb-2'></div>
                <div className='h-4 bg-slate-200 rounded w-1/2 mb-3'></div>
                <div className='h-4 bg-slate-200 rounded w-full mb-1'></div>
                <div className='h-4 bg-slate-200 rounded w-full mb-3'></div>
                <div className='h-8 bg-slate-200 rounded w-full'></div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                className='w-full bg-white rounded-sm shadow hover:shadow-md transition-shadow'
                onClick={scrollTop}
                key={product?._id}
              >
                <div className='bg-slate-200 h-48 w-full flex justify-center items-center'>
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                  />
                </div>
                <div className='p-4 grid gap-2'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                    {product?.productName}
                  </h2>
                  <p className='capitalize text-slate-500'>{product?.category}</p>
                  <div className='flex gap-3 text-base font-semibold'>
                    <p className='text-red-600'>
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className='text-slate-500 line-through'>
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className='text-sm bg-red-600 hover:bg-pink-700 text-white px-3 py-1 rounded-full'
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
