import React,{useState,useEffect} from "react";
import {AiFillStar} from "react-icons/ai";
import "../detail/detail.css";
import Recom from "../recommendations/recommendation";
import Loader from "../loader/loader";

const DetailTv = (props)=>{
    
    let id="";
    try {
        id = props.match.params.id;
    } catch(e){
        id = props.id;
    };
    const [loading,setLoading] = useState(true);
    
    const [info,setInfo] = useState({});
    const [recommendation,setRecommendations] = useState([]);
    
    useEffect(
        ()=>{
            setLoading(true);
            
            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&append_to_response=videos`)
                .then(res=>res.json())
                .then(data=>{
                    setInfo(data)
                })
                .catch(e=>console.log("error occured "+e));
            fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&page=1`)
                .then(res=>res.json())
                .then(data=>{
                    setRecommendations(data.results);
                    
                    setLoading(false);
                    window.scrollTo(0, 0);
                })
                .catch(e=>console.log("error occured "+e));
                
        },
    [id]);

    if (loading){
        return (<Loader />)
    }

    document.title = info.original_title || info.original_name;
    
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
                            {info.original_title||info.original_name}
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
            </div>
            
        </div>
        <div className="video-container">
                <br />
                <div style={{display:"flex",flexWrap:"wrap",margin:"auto",maxWidth:"95%" }}>
                    {info.videos 
                    ?   info.seasons.map(season=>(
                        <div key={season.name} style={{margin:"0 10px"}}>
                            <div>
                                <h2>
                                    {season.name}
                                </h2>
                                <small>Total Episodes : {season.episode_count}</small>
                                <br />
                                <div className="season-container">
                                    <img alt="Not provided" height="200" src={"https://image.tmdb.org/t/p/w200/"+season.poster_path} />
                                </div>
                            </div>
                            <br />
                            <br />
                        </div>
                        
                        ))
                    :   "No videos Provided"
                }
                </div>
        </div>
        <br />

        <Recom recom={recommendation} type="tv" />
            
        </>
    );
}

export default DetailTv;