import React, { useEffect, useRef, useState } from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${import.meta.env.VITE_NEWS_API}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - InBrief`;
        updateNews();
    }, [location.href])


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${import.meta.env.VITE_NEWS_API}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
    const [showDialog, setShowDialog] = useState(false)
    const [summary, setSummary] = useState(false)
    const dialog = useRef(null)

    useEffect(()=>{
        console.log(dialog.current)
        showDialog && dialog.current.show()
    }, [showDialog])

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>InBrief - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            {showDialog && <dialog ref={dialog} className='card border-dark col-md-6 rounded-3' style={{ zIndex: '50', position: 'fixed', inset:'0',top:'48px'}}>
                <p className='card-text'>{summary}</p>
                <button className='btn btn-danger' onClick={()=>setShowDialog(false)}>Close</button>
            </dialog>}
            <InfiniteScroll
                dataLength={articles?.length}
                next={fetchMoreData}
                hasMore={articles?.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {articles?.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem dialog={dialog} setShowDialog={setShowDialog} setSummary={setSummary} title={element?.title ? element?.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )

}

export default News