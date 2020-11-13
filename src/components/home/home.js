import React,{useState,useEffect} from "react";
import Slider from  "../slider/slider";
import "./home.css";
import {Link} from "react-router-dom";

const Home  = ()=>{

    const [showCase,setShowCase] = useState({});
    useEffect(()=>{
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&page=1")
            .then((res)=>res.json())
            .then((data)=>setShowCase(data.results[0]))
            .catch(_=>console.log("error occured"));
    },[])
    

    return (
        <>
            <div className="showcase">
                <Link to={`/movie/${showCase.id}`}>
                    <img src={"https://image.tmdb.org/t/p/w1280"+showCase.backdrop_path} alt="showcase" className="showcase__image" />
                    <div className="showcase__container">
                        <div className="showcase__intro">
                            <h1 className="showcase__title">{showCase.original_title}</h1>
                            <p className="showcase__overview">{showCase.overview}</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="home">
                <div id="movies">
                    <Slider url={"https://api.themoviedb.org/3/trending/movie/week?api_key=bab9fceb21a5537965a06763798905f9"} 
                        type="movie" title=" Trending Movies" 
                    />

                    <Slider url={"https://api.themoviedb.org/3/discover/movie?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"}
                        type="movie" title="Discover movies"
                    />
                </div>
                <div id="tvshows">
                    <Slider url={"https://api.themoviedb.org/3/trending/tv/week?api_key=bab9fceb21a5537965a06763798905f9"} 
                        type="tv" title="Trending TV shows" 
                    />

                    <Slider url={"https://api.themoviedb.org/3/discover/tv?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&page=1"}
                        type="tv" title="Discover TV shows"
                    />  
                </div>
            </div>
        </>
    )
}

export default Home;