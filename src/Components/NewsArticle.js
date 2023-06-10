import React, { Component } from 'react'

import './NewsArticle.css'

export default class NewsArticle extends Component {
  createTime(val){
    let dt=new Date(val)
    return dt.toUTCString()
  }
  defaultUrl(e){
    console.log("ommit")
    e.target.src="https://ichef.bbci.co.uk/news/1024/branded_news/3B54/production/_129788151_phillips.jpg"
  }
  openNewPage(event){
    let src=event.target.src;
    window.open(src,"_blank")
  }
  render() {
    let {title,img,author,time,mediaTag}=this.props
    return (
      <>
        <div id="area">
          <div className="tag">{mediaTag}</div>
          <div id="box">
              <img  src={img?img:"https://ichef.bbci.co.uk/news/1024/branded_news/3B54/production/_129788151_phillips.jpg"} onError={this.defaultUrl} onClick={this.openNewPage} alt="img" />
              <div className="section">
                  <h2> {title} </h2>
                  <p>{this.props.desc}</p>
                  <p>By {author!==null?author:"Unknown "}{time!==null?" on "+this.createTime(time):""}</p>
              </div>
          </div>
          <button id="readmore" ><a href={this.props.url} rel="noreferrer" target='_blank'>Read more</a> </button>

        </div>
      </>
    )
  }
}
