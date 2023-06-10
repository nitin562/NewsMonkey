
import './App.css';
import { BrowserRouter as Router,
Route,
Routes } from 'react-router-dom';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import NewsArea from './Components/NewsArea';

export class App extends Component {
  constructor(props){
    super(props)
    this.state={searchParameter: null}
  }
  changePara=(val)=>{
    this.setState({searchParameter : val})
  }
  render() {
     
    return (
      <>
        <Router>
          <NavBar setSearch={this.changePara}/>
        
         <Routes>
            
            <Route exact path='/'   element={<NewsArea key="general"  setSearch={this.changePara} topic="General" q={this.state.searchParameter}/>}/>
            <Route exact path='/Business'  element={<NewsArea key="Buisness"  setSearch={this.changePara} topic="Business" q={this.state.searchParameter}/>}/>
            <Route exact path='/Sports'  element={<NewsArea key="sports"  setSearch={this.changePara} topic="Sports" q={this.state.searchParameter}/>}/>
            <Route exact path='/Entertainment'  element={<NewsArea key="Entertainment"  setSearch={this.changePara} topic="Entertainment" q={this.state.searchParameter} />}/>
            <Route exact path='/Health'  element={<NewsArea key="Health"  setSearch={this.changePara} topic="Health" q={this.state.searchParameter} />}/>
            <Route exact path='/Science' element={<NewsArea key="Science"  setSearch={this.changePara} topic="Science" q={this.state.searchParameter}/>}/>
            <Route exact path='/Technology' element={<NewsArea key="Technology"  setSearch={this.changePara} topic="Technology" q={this.state.searchParameter}/>}/>
          </Routes>
         
        </Router>
      </>
    )
  }
}

export default App
