import React, { Component } from 'react';
import './poke.css'
import './script.js'
import $ from 'jquery'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import PokeDetail from '../PokeDetail/pokedetail.js'
class Poke extends Component {
    constructor(props) {
        super(props);

    }
    

    render() { 
        return ( 
            <div className="poke-container">
               <div className="poke-image">
                <img src={this.props.data.sprites["other"]["official-artwork"]["front_default"]} alt="Pokemon" className="poke-img" width="100%"/>
               </div>
               <div className="poke-info">
                   <div className="poke-id">#{this.props.data.id}</div>
                    <Link to={`${this.props.data.id}`} style={{ textDecoration: 'none' }}>
                        <div className="poke-name">
                            {this.props.data.forms[0].name.charAt(0).toUpperCase()+this.props.data.forms[0].name.slice(1)}
                        </div>
                    </Link>
                    <div className="poke-type">
                        {this.props.data.types.map((item)=>{
                            return (
                                <Type 
                                key ={item.slot-1}
                                typePika={item.type.name.charAt(0).toUpperCase()+item.type.name.slice(1)}></Type>
                            )
                        })}
                    </div>
               </div>
            </div>
         );
    }
}
 

class Type extends React.Component {
    colorByType = {  
        Bug: "#729F3F",
        Dragon: "#53A4CF",
        Fairy : "#FDB9E9",
        Fire : "#FD7D24",
        Ghost : "#7B62A3",
        Ground: "#F7DE3F",
        Normal: "#A4ACAF",
        Psychic : "#F366B9",
        Steel : "#9EB7B8",
        Dark : "#707070",
        Electric : "#EED535",
        Fighting : "#D56723",
        Flying : "#3DC7EF",
        Grass : "#9BCC50",
        Ice : "#51C4E7",
        Poison : "#B97FC9",
        Rock : "#A38C21",
        Water: "#4592C4",
    }
    render() {
        //console.log("Type: " + this.props.typePika);
      return(
        
        <div className="poke-type-container" style={{backgroundColor: this.colorByType[this.props.typePika]}}>
          <p>{this.props.typePika}</p>
        </div>
      )
    }
  }


export default Poke;