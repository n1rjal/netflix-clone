import React from "react";
import Card from "../card/card";

const Recom = (props)=>{
    if (props.recom){
        return (
            <div className="similar">
                <h1 className="title" style={{marginLeft:"1cm"}}>
                    Recommendations</h1>
                    <br></br>
                    <div className="recommendations">
                        {props.recom.map((tv)=>{
                            return (<Card obj={tv} key={tv.id} type={props.type} />);
                        })}
                    </div>  
            </div>
        
        )
    }else{
        return (
            <>
                <h1 className="title">
                    No recommendations
                </h1>
            </>
        )
    }
}

export default Recom;