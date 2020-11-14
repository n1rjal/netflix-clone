import React,{useState} from "react";
import {NavLink,useHistory} from "react-router-dom";
import netflixlogo from "../../assets/netflix.png";
import "./navbar.css";
import {FaSearch} from "react-icons/fa";
import { HashLink as Link } from 'react-router-hash-link';
import {GiHamburgerMenu} from "react-icons/gi";

const NavBar = ()=>{
    const [ searchinput, setSerchInput] = useState("");
    const [ searchtype, setSearchType] = useState("multi");
    const [showForm, setShowForm] =useState(false);
    const [show,setShow] = useState(false);
    let history = useHistory();
        
    const onSubmission = (e)=>{
        e.preventDefault();
        history.push( encodeURI(`/search?name=${encodeURI(searchinput)}&type=${encodeURI(searchtype)}`));
    }

    const getclass = ()=>{
        if (show){
            return "navLink show"
        }
        return "navLink"
    }

    return (
        <>
            <nav>
                <GiHamburgerMenu className="nav__toggler" onClick={()=>{
                    setShow(!show);
                    setShowForm(false)}
                } /> 
                <ul className="left">
                    <img className="netflix-logo" alt="netflix-logo" src={netflixlogo} />
                    <li><NavLink to="/" className={getclass()}>Home</NavLink></li>
                    <li><Link smooth to="/#tvshows" className={getclass()}>TV Shows</Link></li>
                    <li><Link smooth to="/#movies" className={getclass()}>Movies</Link></li>
                </ul>

                <ul className="right">
                    <li>
                        <FaSearch onClick={(e)=>{
                            setShowForm(!showForm);
                            setShow(false)}} className={showForm===true?"search-icon":"search-icon show"}
                        ></FaSearch> 
                    </li>
                    <li>
                        <form className={showForm===false?"search-form":"search form show"} onSubmit={onSubmission}>
                            <input type="text" onChange={e=>{
                                setSerchInput(e.target.value);
                            }} placeholder="Search" value={searchinput} />
                            <select onChange={(e)=>{
                                setSearchType(e.target.value);
                            }} value={searchtype}>
                                <option value="multi" defaultValue>All</option>
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