import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './navbar.css'
class NavBar extends Component {
    constructor(props) {
        super(props);
        
    }
    
    

    render() { 
        return ( 
            <div className="navbar">
                <Header/>
                <div>
                <SearchBar></SearchBar>
                
                </div>

            </div>
         );
    }
}
class Header extends React.Component {
    render() {
      return(
        <div id="header-name">
          <h1>{this.props.name}</h1>
        </div>
      )
    }
  }
  
  class SearchBar extends React.Component {
    render() {
      return(
        <div>
          <input  id="searchbar-input" onChange={this.props.search} placeholder="Search Pokemon"/>
        </div>
      )
    }
  }
  
  
export default NavBar;