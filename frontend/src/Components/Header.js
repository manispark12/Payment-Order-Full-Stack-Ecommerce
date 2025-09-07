import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import SearchProduct from '../pages/SearchProduct';
import {GrSearch} from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import {setUserDetails} from '../stores/userSlice'
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q") || ""
    const [search, setSearch] = useState(searchQuery)


    const handleLogout = async() =>{
        const fetchData = await fetch(SummaryApi.logout_user.url,{
            method: SummaryApi.logout_user.method,
            credentials : 'include'
        })
        const data = await fetchData.json()
        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate("/")

        }
        if(data.error){
            toast.error(data.message)
        }
    }

    const handleSearch = (e) =>{
        setSearch(e.target.value);

    }
   const handleSearchSubmit = (e) => {
  e.preventDefault();
  if (search.trim()) {
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  } else {
    navigate("/search");
  }
};
useEffect(() =>{
  setSearch("")
},[searchInput.pathname])

    return (
        <header className='h-16 bg-white shadow-md fixed w-full z-40'>
          <div className=' h-full w-full flex items-center px-4 justify-between'>
                <div className=''>
                    <Link to={"/"}>
                        <Logo w={90} h={50}/>
                    </Link>
                </div>
    
                <form
  onSubmit={handleSearchSubmit}
  className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'
>
  <input
    type='text'
    placeholder='Search product here...'
    className='w-full outline-none text-black  min-w-[20px] md:min-w-[30px]'
    onChange={handleSearch}
    value={search}
  />
  <button
    type='submit'
    className='text-lg min-w-[50px] h-8 bg-slate-600 flex items-center justify-center rounded-r-full text-white'
  >
    <GrSearch />
  </button>
</form>
                 
                <div className='flex items-center gap-7'>
                    
                    <div className='relative flex justify-center'>
    
                      {
                        user?._id && (
                          <div className='text-3xl cursor-pointer relative flex justify-center px-9 my-5' onClick={()=>setMenuDisplay(preve => !preve)}>
                            {
                              user?.profilePic ? (
                                <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                              ) : (
                                <FaRegCircleUser/>
                              )
                            }
                          </div>
                        )
                      }                        
                      {
                        menuDisplay && (
                          <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                            <nav>
                              {
                                user?.role === ROLE.ADMIN && (
                                  <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve =>!preve)}>Admin Panel</Link>
                                )
                              }
                             <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Order</Link>
                            </nav>
                          </div>
                        )
                      }
                     
                    </div>
    
                      {
                         user?._id && (
                          <Link to={"/cart"} className='text-2xl relative mx-3 w-9'>
                              <span><FaShoppingCart/></span>
          
                              <div className='bg-green-100 text-white w-7 h-7 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                  <p className='text-black'>{context?.cartProductCount}</p>
                              </div>
                          </Link>
                          )
                      }
                  
    
    
                    <div>
                      {
                        user?._id  ? (
                          <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-blue-700 hover:bg-purple-300'>Logout</button>
                        )
                        : (
                        <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                        )
                      }
                        
                    </div>
    
                </div>
    
          </div>
        </header>
      )
}

export default Header