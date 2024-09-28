
import { useEffect, useState } from "react";
import './App.css';
import News from "./pages/News";


function App() {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [newsPage, setNewsPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const api = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=20&apiKey=${process.env.REACT_APP_MY_API_KEY}&page=${newsPage}`;

  const newsAPI = async () => {
    setIsLoading(true);
    try{
      const response = await fetch(api);
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
