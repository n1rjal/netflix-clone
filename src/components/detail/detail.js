import React,{useState, useEffect} from "react";
import "./detail.css";
import {AiFillStar} from "react-icons/ai";
import Recom from "../recommendations/recommendation";
import Loader from "../loader/loader";

const Detail = (props) =>{
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
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&append_to_response=videos`)
                .then((res)=>res.json())
                .then((data=>setInfo(data)))
                .catch(e=>console.log("error occured "+e));
            fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&page=1`)
                .then((res)=>res.json())
                .then((data=>setRecommendations(data.results)))
                .catch(e=>console.log("error occured "+e));
            setLoading(false);
            window.scrollTo(0, 0);
        },
    [id]);

    if (loading) return (<Loader />)

    document.title = info.original_title || info.original_name;


    return (
        <div className="detail">
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
            <Recom recom={recommendation} type={"movie"}/>
        </div>
    )
}

export default Detail;