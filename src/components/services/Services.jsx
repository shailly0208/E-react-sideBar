import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";


export const Services=(props) => {
    return( 

        <div className="services">
      <div className="services__body">
        <img src={props.img} class="services__image" />
        <h2 className="services__title">{props.title}</h2>
        <p className="services__description">{props.description}</p>
      </div>
       
      <Link to={`/servicepage/${props.title}`}><button className="services__btn">
      Learn More
    </button></Link>
      
    </div>   

    );
}