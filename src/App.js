
import { useEffect, useState } from "react";
import './App.css';
import News from "./pages/News";


function App() {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [newsPage, setNewsPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // const api = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=20&apiKey=${process.env.REACT_APP_MY_API_KEY}&page=${newsPage}`;
  const api = `https://newsapi.org/v2/everything?q=apple&from=2024-09-27&to=2024-09-27&sortBy=popularity&pageSize=20&apiKey=${process.env.REACT_APP_MY_API_KEY}&page=${newsPage}`;

  const newsAPI = async () => {
    setIsLoading(true);
    try{
      const response = await fetch(api,{
        method: "GET",
        // headers: {"Content-type": "application/json;charset=UTF-8"}
      });
      const data = await response.json();
      setNewsList(data.articles);
      setFilteredNews(data.articles);
      setIsLoading(false);
      
    }
    catch(error){
      console.error('error fetching news', error);
    }
  }

  useEffect(() => {
    newsAPI();
  }, [api])
  
  
  return (
    <>
      <News newsList={newsList} filteredNews={filteredNews} setFilteredNews={setFilteredNews} newsPage={newsPage} setNewsPage={setNewsPage} newsAPI={newsAPI} setNewsList={setNewsList} isLoading={isLoading} setIsLoading={setIsLoading} />
    </>
  );
}

export default App;
