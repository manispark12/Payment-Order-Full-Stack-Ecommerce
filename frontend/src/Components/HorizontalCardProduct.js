import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import displayINRCurrency from "../helpers/displayCurrency";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    const result = await addToCart(e, id);
    if (result?.success) {
      fetchUserAddToCart();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="w-full px-2 md:px-4 my-6 relative">
      <h2 className="text-2xl font-bold py-4 text-gray-800">{heading}</h2>

      <div
        className="flex items-center gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {/* Scroll buttons */}
        <button
          className="bg-white shadow-lg rounded-full p-2 absolute left-0 z-10 text-xl hidden md:flex items-center justify-center hover:bg-gray-100"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-lg rounded-full p-2 absolute right-0 z-10 text-xl hidden md:flex items-center justify-center hover:bg-gray-100"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {/* Loading Skeleton */}
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[290px] md:min-w-[330px] h-40 bg-white rounded-2xl shadow-md flex overflow-hidden animate-pulse"
              >
                <div className="bg-slate-200 h-full w-32 md:w-36"></div>
                <div className="flex-1 p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded-full w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-4 bg-slate-200 rounded-full w-16"></div>
                    <div className="h-4 bg-slate-200 rounded-full w-12"></div>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full w-full"></div>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={"product/" + product?._id}
                key={index}
                className="w-full min-w-[290px] md:min-w-[330px] h-40 bg-white rounded-2xl shadow-md hover:shadow-xl flex overflow-hidden transition-transform hover:scale-[1.02]"
              >
                {/* Image Section */}
                <div className="bg-gray-100 h-full w-32 md:w-36 flex items-center justify-center">
                  <img
                    src={product.productImage[0]}
                    alt={product?.productName}
                    className="object-contain h-full transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Details Section */}
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-base md:text-lg text-gray-800 truncate">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-gray-500 text-sm">
                      {product?.category}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-red-600 font-bold">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-gray-400 line-through text-sm">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="mt-2 w-full text-sm bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-full transition-colors"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
