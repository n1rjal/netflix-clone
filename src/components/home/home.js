import React,{useState,useEffect,useCallback} from "react";
import Card from "../card/card";
import "./home.css"

const Home  = ()=>{
    const [movies,setMovies] = useState([]);
    const [page,setPage] = useState(1);

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
            .then(res=>res.json())
            .then(
                data=>setMovies(
                    (value)=>[...value,...data.results])
                )
            .catch((e)=>console.log("error occurred \n"+e));
    },[page])
    return (
        <>
            <div className="movie-horizontal-container">
                <h1 className="explore">Explore New Movies</h1>
                <div className="left-point point"> {"<"} </div>
                {movies.map((movie,index,movies)=>(
                    index===movies.length-1 
                        ? <Card obj={movie} type="movie" key={movie.id} setPage={setPage}/>
                        : <Card obj={movie} type="movie" key={movie.id} />
                    
                ))}
                <div className="right-point point">{">"}</div>
            </div>
        </>
    )
}

export default Home;