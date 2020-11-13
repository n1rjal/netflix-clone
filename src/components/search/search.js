import React,{useState,useEffect} from "react";
import {useLocation} from "react-router-dom"
import Loader from "../loader/loader";
import Card from "../card/card";

const Search = ()=>{
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    const name = params.get("name");
    const type = params.get("type");
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);

    useEffect(()=>{
        fetch( `https://api.themoviedb.org/3/search/${type}?api_key=bab9fceb21a5537965a06763798905f9&language=en-US&query=${name}&page=1&include_adult=true`)
            .then(res=>res.json())
            .then(data=>{
                console.log("DATA "+data);
                setResults(data.results);
                setLoading(false);
            })
            .catch((e)=>console.log("Error occured while fetching "+e));
    },[name,type]);
    
    if (loading) return <Loader />

    console.log(results);

    return (
        <>
            <div className="searchResults">
                {results.map((item)=>
                    <Card obj = {item} type={item.media_type || type} />
                )}
            </div>
        </>
    )
}

export default Search;