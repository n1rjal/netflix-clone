import React,{useState,useEffect} from "react";
import Card from "../card/card";
import "./slider.css";
import Loader from "../loader/loader";

const Slider = (props)=>{
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(true);
    
    const trendingMovieDiv = React.createRef(null);

    const handleLeftClick = ()=>{
        trendingMovieDiv.current.scrollLeft -= 500;
    }
    
    const handleRightClick = ()=>{
        trendingMovieDiv.current.scrollLeft += 500;
    }


    useEffect(()=>{
        fetch(props.url)
            .then(res=>res.json())
            .then(data=>{
                setMovies(data.results);
                setLoading(false);
                
            })
            .catch((e)=>console.log("error occurred \n"+e));
    },[])
    if (loading){
        return (<Loader />)
    }
    document.title="Netflix Clone - n1"
    return (
    <>
        <div className="slider">
        <h1 className="slider__explore">{props.title}</h1>
        <div className="slider__sliderContainer">
        <div className="slider__leftArrow" onClick={()=>{handleLeftClick()}}> {"<"} </div>
        <div onClick={()=>{handleRightClick()}} className="slider__rightArrow">{">"}</div>
        <div className="slider__slider" ref={trendingMovieDiv}>
            {movies.map((movie,index,movies)=>(
                    <Card obj={movie} 
                        type={props.type}
                        key={movie.id} 
                    />
                ))}
            </div>
        </div>
    </div>
    </>);
}

export default Slider;