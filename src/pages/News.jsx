import React, { useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar"

function News({newsList, filteredNews, setFilteredNews, newsPageSize, setNewsPageSize, newsPage, setNewsPage, newsAPI, setNewsList, isLoading, setIsLoading}) {

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  };

  const handleSelect = (e) => {
    setCategory(e.target.value)
  }

  

  // search news
  useEffect(() => {
    let filtered = newsList;
    if (category !== 'All') {
      filtered = filtered.filter(value =>
        value.source.name === category
      );  
    }

    if (searchTerm) {
      filtered = filtered.filter( value =>   
        value.title.toLowerCase().includes(searchTerm.toLowerCase())
      );  
    }
    
    setFilteredNews(filtered);
    
  }, [searchTerm, category, newsList])

  // remove duplicate
  const uniqueCategories = ['All', ...new Set(newsList.map(item => item.source.name))];


  const nextFunc = async () => {
    setIsLoading(true);
    try{
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=20&apiKey=${process.env.REACT_APP_MY_API_KEY}&page=${newsPage + 1}`);
      const data = await response.json();
      setNewsList(data.articles);
      setFilteredNews(data.articles);
      setNewsPage(newsPage + 1);
      setIsLoading(false);
    }
    catch(error){
      console.error('error fetching news', error);
    }
  }
  const prevFunc = async () => {
    setIsLoading(true);
    try{
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=20&apiKey=${process.env.REACT_APP_MY_API_KEY}&page=${newsPage - 1}`);
      const data = await response.json();
      setNewsList(data.articles);
      setFilteredNews(data.articles);
      setNewsPage(newsPage - 1);
      setIsLoading(false);
    }
    catch(error){
      console.error('error fetching news', error);
    }
  }

  return (
    <>
    <div className="main-wrap">
    <span>{newsPage}</span>
    <div className={`bg-[rgba(0,0,0,0.8)] w-full h-full z-10 fixed ${isLoading ? '' : 'hidden'}`}>
      <img src="images/rolling.gif" alt="" className={`absolute w-[50px] h-[50px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10`} />
    </div>
      <section className="news-banner bg-pink-200 py-20">
        <div className="container">
          <h1 className="text-[40px] font-bold text-center">News</h1>
        </div>
      </section>
      <section className="news-wrap my-20">
        <div className="container">
          <div className="row flex gap-8 lg:flex-row flex-col">
            <Sidebar handleSearch={handleSearch} searchTerm={searchTerm} handleSelect={handleSelect} category={category} uniqueCategories={uniqueCategories}/>
            <div className="lg:w-[75%] border w-full shadow-2xl p-[30px]">
              <div className="row grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
              {
                filteredNews.map((v,i)=>{
                  return(
                    <div className="col border flex flex-col" key={i}>
                      <div className="news-thumbnail overflow-hidden">
                        <img className="w-full h-[162px] object-cover" src={ v.urlToImage === null ? 'https://dummyimage.com/288x162/cccccc/fff.jpg' : v.urlToImage } alt="" />
                      </div>
                      <div className="content-box p-5 flex flex-col flex-1">
                      <div className="inner-content flex-1">
                        <span className="text-[12px] text-[#bbb]">{v.source.name}</span>
                        <h3 className="text-[16px] font-semibold">{v.title?.slice(0, 50)}</h3>
                        <p className="text-[14px] mt-2 flex flex-1">{v.description?.slice(0, 88)}</p>
                      </div>
                        <a href={v.url} className="bg-[blue] text-center text-white py-[5px] px-5 inline-block mt-10">Read More</a>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="btn-group py-10">
        <div className="container">
          <div className="flex justify-between gap-5">
            <button disabled={newsPage <= 1 ? true : false} className="bg-[black] text-white py-[5px] px-[30px]" onClick={prevFunc}>Prev</button>
            <button disabled={newsPage >= 4 ? true : false} className="bg-[black] text-white py-[5px] px-[30px]" onClick={nextFunc}>Next</button>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default News