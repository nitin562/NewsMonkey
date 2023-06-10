import React, { Component } from "react";
import "./Navbar.css";
import newsMonk from "./Newsmonkey.jpg";
import menu from "./menu.png"
import { Link } from "react-router-dom";
export class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
    };
  }
  
  DropDown=()=>{
    
    let nav=document.querySelector("nav")
    let Mainnav=document.querySelector(".mainNav")
 
    if(Mainnav.className!=="mainNav"){
      nav.classList.remove("addHeight")
      Mainnav.className="mainNav"
      Mainnav.style.top="-40rem"

    }
    else{
      nav.classList.add("addHeight")
      Mainnav.classList.add("addHeight")
      Mainnav.style.top=0
    }
    

  }
  dropUpForLink=()=>{
    if(this.state.toggle){
      this.DropDown()
      this.setState({toggle:false})
    }
  }
  render() {
    let { setSearch } = this.props;

    // let onwrite=(e)=>{
    //   let val=e.target.value;
    //   setSearch(val)
    // }
    window.addEventListener("keypress", (e) => {
      if (e.code === "Enter") {
        
        let v = document.getElementById("searchbar");
   
        if (v.value === "") {
          console.log("changed to null")
          setSearch(null);
          return;
        }
        let value=v.value
        setSearch(value);
    
        
        if(this.state.toggle){
          this.DropDown()
          this.setState({toggle:false})
        }
      }
    });

    return (
      <>
        <nav >
          <img src={menu} id="toggle" onClick={()=>{
            this.setState({toggle:true})
            this.DropDown()}} alt="burgerToogle" />
          <div className="mainNav">
            <img src={newsMonk} alt="icon" onClick={this.toggleBar} />

            <ul>
              <li><Link to="/" onClick={this.dropUpForLink}>Home</Link></li>
              <li><Link to="/Business" onClick={this.dropUpForLink}>Business</Link></li>
              <li><Link to="/Entertainment" onClick={this.dropUpForLink}>Entertainment</Link></li>
              <li><Link to="/Health" onClick={this.dropUpForLink}>Health</Link></li>
              <li><Link to="/Science" onClick={this.dropUpForLink}>Science</Link></li>
              <li><Link to="/Sports" onClick={this.dropUpForLink}>Sports</Link></li>
              <li><Link to="/Technology" onClick={this.dropUpForLink}>Technology</Link></li>
            </ul>
            <input
              type="search"
              name="getNews"
              id="searchbar"
              placeholder="Search News here"
            />
          </div>
        </nav>
      </>
    );
  }
}

export default NavBar;
