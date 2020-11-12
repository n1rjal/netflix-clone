import React,{useState,useEffect} from "react";
import {AiFillStar} from "react-icons/ai";
import Card from "../card/card";
import "../detail/detail.css";
import Recom from "../recommendations/recommendation";
const DetailTv = (props)=>{
    const [id,setId] = useState(props.match.params.id);
    const [info,setInfo] = useState({});
    const [view, setView] = useState(props.match.params.view || "description")
    const [recommendation,setRecommendations] = useState([]);
    
    useEffect(
        ()=>{
            // https://api.themoviedb.org/3/tv/${id}?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&append_to_response=videos

            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&append_to_response=videos`)
                .then((res)=>res.json())
                .then((data=>setInfo(data)))
                .catch(e=>console.log("error occured "+e));
            fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&page=1`)
                .then((res)=>res.json())
                .then((data=>setRecommendations(data.results)))
                .catch(e=>console.log("error occured "+e));
        },
    [id,info]);
    
    return (
        <>
        <div className="detail-container">
            <div className="left-poster">
                <img src={"https://image.tmdb.org/t/p/w300/"+info.poster_path} alt="movie-poster"></img>
            </div>
            <div className="right-info">
                <div className="intro">
                    <div>
                        <h1>
                            {info.original_title}
                        </h1>
                        <small>
                            {info.status}
                        </small>
                        <small>
                            <a href={"https://www.imdb.com/title/"+info.imdb_id}>IMDB</a>
                        </small>
                    </div>
                    <div className="star">
                        {info.vote_average}
                        <AiFillStar className="ai-star" />
                    </div>  
                </div>
                <div className="inner-nav-menu">

                </div>

                <div className="description">
                    <p>
                        {info.overview}
                    </p>
                </div>
                <br />
                <div className="video-container">
                    <h1 className="title">Seasons</h1>
                    <div style={{display:"flex",flexWrap:"wrap"}}>
                        {info.videos 
                        ?   info.seasons.map(season=>(
                            <>
                                <div>
                                    <h2>
                                        Season 1
                                    </h2>
                                    <div className="season-container">
                                        <img src={"https://image.tmdb.org/t/p/w200/"+season.poster_path} />
                                        <p>{season.overview}</p>
                                            <small>Total Episodes : {season.episode_count}</small>
                                    </div>
                                </div>
                            </>
                            ))
                        :   "No videos Provided"
                    }
                    </div>
                </div>
                <br />
                <div className="video-container">
                    <h1 className="title">Videos</h1>
                    <div style={{display:"flex",flexWrap:"wrap"}}>
                        {info.videos 
                        ?   info.videos.results.map(video=>(
                            <>
                                <iframe style={{margin:"5px"}} width="400" allowfullscreen="true" title={video.key} height="315" src={`https://www.youtube.com/embed/${video.key}`} 
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen" />
                            </>
                            ))
                        :   "No videos Provided"
                    }
                    </div>
                </div>
                <Recom recom={recommendation} type="movie" />
            </div>
        </div>
        
        </>
    );
}

export default DetailTv;