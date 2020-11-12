import React,{useState,useEffect,useCallback, useRef} from "react";
import Card from "../card/card";
import "./home.css"
// import "./newHome.css"

const Home  = ()=>{
    const [movies,setMovies] = useState([]);
    const [page, setPage] = useState([]);
    const ref = useRef(null)

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
            .then(res=>res.json())
            .then(
                data=>setMovies(
                    (value)=>[...value,...data.results])
                )
            .catch((e)=>console.log("error occurred \n"+e));
    }, [])
    
    const handleLeftArrowClick = () => {
        ref.current.scrollLeft -= 500;
    }
    const handleRightArrowClick = () => {
        ref.current.scrollLeft += 500;
    }

    return (
      <>
        <div className="home">
          <h1 className="home__explore">Explore New Movies</h1>
          <div className="home__swiperContainer">
            <div className="home__leftArrow" onClick={()=>handleLeftArrowClick()}> {"<"} </div>
            <div className="home__mainContent" ref={ref}>
              {movies.map((movie, index, movies) =>
                index === movies.length - 1 ? (
                  <Card
                    obj={movie}
                    type="movie"
                    key={movie.id}
                    setPage={setPage}
                  />
                ) : (
                  <Card obj={movie} type="movie" key={movie.id} />
                )
              )}
            </div>

            <div className="home__rightArrow" onClick={()=>handleRightArrowClick()}>{">"}</div>
          </div>
        </div>
      </>
    );
}

export default Home;