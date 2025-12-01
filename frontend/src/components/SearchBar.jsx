import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setShowSearch } from "../store/productSlice";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, showSearch } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    // search-bar started
    <div className="border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      {/* search bar complete*/}

      {/* close icon to close search bar */}
      <img
        onClick={() => dispatch(setShowSearch(false))}
        src={assets.cross_icon}
        className="inline w-3 cursor-pointer"
        alt=""
      />
      {/* close icon to close search bar */}
    </div>
  ) : null;
};

export default SearchBar;
