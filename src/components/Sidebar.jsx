import React from 'react'

function Sidebar({handleSearch, searchTerm, handleSelect, category, uniqueCategories}) {  
  return (
    <>
    <div className="sidebar-wrap border flex flex-col lg:w-[25%] w-full p-[30px] shadow-2xl">
      <div className="sidebar-wrap ">
        <div className="search-news">
        <label htmlFor="" className="mb-2 inline-block">Search News</label>
          <input className="border border-[#ccc] w-full h-10 py-[6px] px-[12px]" type="text" onChange={handleSearch} value={searchTerm} />
        </div>
      </div> 

      <div className="news-category lg:mt-20 mt-10">
        <label htmlFor="" className="mb-2 inline-block">Filter News by Category</label>
          <select className="w-full h-10 border border-[#ccc] py-[6px] px-[12px]" onChange={handleSelect} value={category} >
          {
            uniqueCategories.map((val,index) =>
              <option key={index} value={val}>{val}</option>
            )
          }
          </select>
      </div>
      </div>
    </>
  )
}

export default Sidebar