import React, { Component } from 'react'
import NewsArticle from './NewsArticle'
import "./NewsArea.css"
import Spinner from './Spinner'
import debounce from 'lodash.debounce';
export default class NewsArea extends Component {
  constructor(props){
    super(props)
    this.state={article:[],
      loading:false,
      articleCount:0,
      page: 1
    }
    
  }
  url="https://newsapi.org/v2/top-headlines?country=us&apiKey=e1a3b4b457794b209286c37c00d9896e&pageSize=20&category="+this.props.topic
  async componentDidMount(){
  
    this.props.setSearch(null)
    
    await this.ChangePage(1,this.url,null,true)
       
    
  }
  
  componentDidUpdate(prevProps){
    
    if(this.props.q!==null && prevProps.q!==this.props.q){
      this.setState({article:[],articleCount:0})
      this.ChangePage(1,this.url,this.props.q,true)
    }
    
  }
  handlePrev=()=>{
    let pageval=this.state.page
    this.setState({page:pageval-1});
    this.ChangePage(pageval-1,this.url,this.props.q,false);
  }
  handleNext=()=>{
    let pageval=this.state.page

    this.setState({page:pageval+1})
    
    this.ChangePage(pageval+1,this.url,this.props.q,false);

  }
 
  ChangePage=async(page,url,query,ChangeCountOfResult)=>{
        this.setState({loading:true})
        
        url+="&page="+page
        
        if(query!==null){
          
          url=`https://newsapi.org/v2/everything?q=${query}&apiKey=e1a3b4b457794b209286c37c00d9896e&pageSize=20&page=${page}`
        }
       
        let data=await fetch(url);
        if(data.ok===false){
          this.props.setSearch(null)
          this.setState({loading:false})

          console.log("Not fetched")
          return;
        }
        let jsonFile=await data.json()
        this.setState({loading:false})
       
        
        
        this.setState({article:this.state.article.concat(jsonFile.articles)})
        if(ChangeCountOfResult){
          this.setState({articleCount: jsonFile.totalResults})
        }
        

      }
      
  render() {
    window.addEventListener("scroll",debounce(()=>{
      const {scrollTop,scrollHeight,clientHeight}=document.documentElement
      if(scrollTop+clientHeight>=scrollHeight){
        if(this.state.page===5||this.state.article.length>=this.state.articleCount){
          console.log("Limit reached")
          return;
        }
        
        this.ChangePage(this.state.page+1,this.url,this.props.q,false)
      
        this.setState({page:this.state.page+1})
      }
    },100))
    return (
      <>
      
        {this.state.article.length!==0&&<p id='head'>Top News headlines for you related to {this.props.q===null?this.props.topic:this.props.q}</p>}
        {this.state.article.length!==0&&<div id="flexed">
          {this.state.article.map((element,index)=>{
            return <NewsArticle key={index} title={element.title} desc={element.description} url={element.url} img={element.urlToImage} author={element.author} time={element.publishedAt} mediaTag={element.source.name}/>
          })}
          
        </div>}
        
        {!this.state.loading&&this.state.article.length===0&&<div className="error">Any Error Occurred, May be there is no data in Server about {this.props.q===null?this.props.topic:this.props.q}</div>}
        {/* {!this.state.loading&&<div className="btn-flex">
          <button disabled={(this.state.page===1)?true:false} onClick={this.handlePrev} className="btn">Prev</button>
          <button className="btn" disabled={!(20*this.state.page<this.state.articleCount)||(this.state.page===5)} onClick={this.handleNext}>Next</button>
        </div>} */}
        {this.state.loading&&<Spinner/>}

        
      </>
    )
  }
}
//Max Results are 100 so page=5 and pagesize=20 then 20*5=100 then page=6 cant be fetched in developer mode