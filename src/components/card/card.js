import React,{useCallback} from "react";
import "./card.css";
import {Link} from "react-router-dom";

const Card = (props)=>{
    var imgsrc="";
    if (props.obj.backdrop_path){
        imgsrc = "https://image.tmdb.org/t/p/w300"+props.obj.backdrop_path ;
    }
    else{
        if (props.obj.original_title){
            imgsrc = "https://www.litespeedtech.com/support/wiki/lib/exe/fetch.php/litespeed_wiki:config:404.png?w=400&tok=a0557c";
        }
    }
    
    var id = props.obj.id;
    return (
        <div className="card">
            <Link to={`/${props.type}/${props.obj.id}`}>
                <img src={imgsrc} width="300" height="169" className="poster" alt="poster" />
            </Link>
        </div>
    );
}

export default Card;