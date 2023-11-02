import React, { Component } from 'react'

export class BoardingScreen extends Component {

  move =()=>{
    this.props.history.push({
        pathname:'/walking-screen'
    })
}


componentDidMount = () =>{
  if(navigator.onLine){
  for(let i=0; i<50; i++){
    window.history.pushState('forward', null, window.location);
    }
  }
  else{
    this.props.history.push({
      pathname : "/internet"
    })
  }
}

  render() {
    return (
        <div class="main1-pnp boarding-page">
        <div class="main1-head">
          {/* <header>
            <img src="menu-logo.png" />
          </header> */}
        </div> 
        <div class="main1-pnp-info">
          <img src="boarding-p.png" alt="img" />
          <span>Be a</span>
          <h3>Dog Boarding</h3>
          <h6>Master</h6>
          <p>Hire verified Pet lover to watch your furry friend when you are away</p>
        </div> 
        <div class="main1-pagenations">
          <div class="pagination-wrapper">
            <div class="pagination">
              <span class="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <a onClick={this.move}><img src="arrow1.png" alt="arrow" /></a>
        </div>
      </div>
    )
  }
}

export default BoardingScreen