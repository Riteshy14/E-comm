import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import {useLocation} from 'react-router-dom'

export default function SearchBar() {
  const { showSearch, setShowSearch, searchText, setSearchText } = useContext(ShopContext);
  const [visible , setVisible] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname.includes('collection')|| location.pathname.includes('/')){
      setVisible(true)
       setShowSearch(true);
    }else{
      setVisible(false)
      setShowSearch(false)
    }
    
  },[location])

  return showSearch && visible ? (<div className="mt-2 bg-gray-50 flex items-center p-2 gap-2 justify-center">
    <div className="flex justify-center items-center gap-2 border rounded-xl w-3/4 sm:w-1/2">
    <img className="pl-1 ml-1 w-5 h-5" onClick={()=> setShowSearch(false)} src="search_icon.png" alt="" />
    <input className="w-full p-2 rounded-xl rounded-l-none " type="text" onChange={(e)=> {setSearchText(e.target.value); console.log()}} placeholder="Search Products" />
    </div>
    <div onClick={()=> setShowSearch(false)} className="text-black w-7 flex justify-center items-center border p-1 cursor-pointer rounded-xl text-xl border-black transition-all duration-300 active:scale-90 active:shadow-inner active:bg-red-600 ">X</div>
  </div>): null
}
