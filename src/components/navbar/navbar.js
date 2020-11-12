import React,{useState} from "react";
import {NavLink} from "react-router-dom";
import netflixlogo from "../../assets/netflix.png";
import "./navbar.css";
import {FaSearch} from "react-icons/fa";


const NavBar = ()=>{

    const [ searchinput, setSerchInput] = useState("");
    const [ searchtype, setSearchType] = useState("");
    const [showForm, setShowForm] =useState(false);

    const onSubmission = ()=>{

    }

    return (
        <>
            <nav>
                <ul className="left">
                    <img className="netflix-logo" alt="netflix-logo" src={netflixlogo} />
                    <li><NavLink to="/" className="">Home</NavLink></li>
                    <li><NavLink to="/tvshow" className="">TV Shows</NavLink></li>
                    <li><NavLink to="/movies" className="">Movies</NavLink></li>
                    <li><NavLink to="/explore" className="">Explore</NavLink></li>
                </ul>

                <ul className="right">
                    <li>
                        <FaSearch onClick={(e)=>setShowForm(!showForm)} className={showForm===true?"search-icon":"search-icon show"}></FaSearch> 
                    </li>
                    <li>
                        <form className={showForm===false?"search-form":"search form show"} onSubmit={onSubmission}>
                            <input type="text" onChange={e=>{
                                setSerchInput(e.value);
                            }} placeholder="Search" value={searchinput} />
                            <select onChange={(e)=>{
                                setSearchType(e.value);
                            }} value={searchtype}>
                                <option value="all" defaultValue="true">All</option>
                                <option value="movie">Movie</option>
                                <option value="tv">TV</option>
                            </select>
                        </form>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;