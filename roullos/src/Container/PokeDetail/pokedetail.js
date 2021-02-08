import React, { Component, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
  } from "react-router-dom";
  import axios from "axios";
  import { withRouter } from "react-router";
import './pokedetail.css'

class PokeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] , 
            linkImage: "", 
            name: "",
            abilities: [],
            stats: [],
            types: [],
        };
        let id = 1;
    }
    async componentDidMount() {
        let toArray = [];
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${window.location.href.slice(22)}`;
            console.log(url)
            const res = await axios.get(url);
            toArray.push(res.data);
            this.setState({ data: toArray[0] });
            this.setState({linkImage: toArray[0].sprites["other"]["official-artwork"]["front_default"]})
            this.setState({name: toArray[0].name})
            this.getAbility();
        } catch (e) {
            console.log(e);
        }
        this.getStats();
        this.getType();
        console.log(this.state)
    }

    getType = () => {
        let typeArray = [];
        for(let i = 0; i < this.state.data.types.length;i++){
            typeArray.push(this.state.data.types[i].type.name.charAt(0).toUpperCase()+this.state.data.types[i].type.name.slice(1))
        }
        this.setState({types: typeArray})
    }

    getStats = () => {
        let statsArray = [];
        for(let i = 0; i < 6; i++){
            statsArray.push(Math.round(this.state.data.stats[i].base_stat/15));
        }
        this.setState({stats: statsArray})
    }

    getAbility = () => {
        let abilitiesArray = []
        for(let i = 0; i < this.state.data.abilities.length; i++){
            if(this.state.data.abilities[i].is_hidden == false){
                abilitiesArray.push(this.state.data.abilities[i].ability.name)
            }
        }
        this.setState({abilities: abilitiesArray})
    }

    render(){
        return ( 
            <div className="pokedetail">
                 <div className="pokedetail-header">
                    <div className="pokedetail-header-name">
                        <h2>{this.state.name.charAt(0).toUpperCase()+this.state.name.slice(1)}</h2>
                    </div>
                    <div className="pokedetail-header-id">
                        <h2> #{this.state.data.id}</h2>
                    </div>
                 </div>
                 <div className="pokedetail-info">
                    <div className="pokedetail-info-image">
                        <img src={this.state.linkImage} alt="Pokemon" width="80%"/>
                    </div>
                    <div className="pokedetail-info-parameter">
                        <div className="pokedetail-info-parameter__version">
                            <div className="pokedetail-info-parameter__version_desc">
                                Version 1
                            </div>
                            <div>
                                Version 2
                            </div>
                        </div>
                        <Info abilities={this.state.abilities} data={this.state.data}></Info>
                    </div>
                 </div>
                 <div className="pokedetail-stattype">
                    <Stat stats={this.state.stats}></Stat>
                    <div className="pokedetail-stattype-type">
                        <p>Type:</p>
                        <div className="pokedetail-stattype-type__type">
                            <Type typePika={this.state.types[0]}></Type>
                            <Type typePika={this.state.types[1]}></Type>
                        </div>
                        <p>Weakness:</p>
                        <div  className="pokedetail-stattype-type__weakness">
                            
                        </div>
                    </div>
                 </div>
                 <div className="pokedetail-evolution">
                    Evolution
                 </div>
            </div>
        );
    }
}
 
const Info = (props) => {
    return(
        <div className="pokedetail-info-parameter__info">
            <div style={{display: "flex", flexDirection: "column", width: "14rem", paddingLeft: "1rem"}}>
                <div>
                    <p>Height: </p>{props.data.height}'
                </div>
                <div>
                    <p>Weight: </p>{props.data.weight} lbs
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", width: "14rem", paddingLeft: "1rem"}}>
                <div>
                    <p>Base Experience: </p>{props.data.base_experience} exp    
                </div>            
                <Ability abilities={props.abilities}></Ability>
            </div>
        </div>
    )
}
const Ability = (props) =>{
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    return (
        <div>
            <p  style={{color: "white"}}>Abilities: </p>{capitalize(props.abilities[0])} {capitalize(props.abilities[1])} {capitalize(props.abilities[2])}
        </div>
    )
}
const Stat = (props) => {
    return  (
        <div className="pokedetail-stattype-stat">
            <StatColumn name={"HP"} num={props.stats[0]}></StatColumn>
            <StatColumn name={"Attack"} num={props.stats[1]}></StatColumn>
            <StatColumn name={"Defense"} num={props.stats[2]}></StatColumn>
            <StatColumn name={"Special Attack"} num={props.stats[3]}></StatColumn>
            <StatColumn name={"Special Defense"} num={props.stats[4]}></StatColumn>
            <StatColumn name={"Speed"} num={props.stats[5]}></StatColumn>
        </div>
    )
}
const StatColumn = (props) => {
    let items = [];
    for (let i = 0; i < 15 - props.num; i++) {
        items.push(<div className="items-stat__white"></div>);
      }
    for (let i = 0; i < props.num; i++) {
      items.push(<div className="items-stat__blue"></div>);
    }
    
    return (
        <div className="pokedetail-stattype-stat__column">
            {items}
            {props.name}
        </div>
    )
}
const Type = (props) => {
    const colorByType = {  
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
      return(
        <div className="pokedetail-stattype-type__type__custom" style={{backgroundColor: colorByType[props.typePika]}}>
          {props.typePika}
        </div>
      )
}

export default PokeDetail;