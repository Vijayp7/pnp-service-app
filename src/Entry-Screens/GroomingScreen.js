import React, { Component } from 'react'

export class GroomingScreen extends Component {

    move =()=>{
        this.props.history.push({
            pathname:'/training-screen'
        })
    }
    componentDidMount = () =>{
      if(navigator.onLine){
      window.addEventListener('backbutton', this.onBackPressed);
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }

    componentWillUnmount() {
      window.removeEventListener('backbutton', this.onBackPressed);
    }

    onBackPressed = () => {
      this.props.history.push({
        pathname : "/walking-screen"
      })
    };
    
  render() {
    return (
        <div class="main1-pnp grooming-page">
        <div class="main1-head">
        <div>
          <a onClick={this.onBackPressed}><img src="left-arrow.png" alt="arrow" /></a>
        </div>
          {/* <header>
            <img src="menu-logo.png" />
          </header> */}
        </div> 
        <div class="main1-pnp-info">
          <img src="grooming-p.png" alt="img" />
          <span>Be a</span>
          <h3>Dog Grooming</h3>
          <h6>Master</h6>
          <p>Hire verified Pet lover to watch your furry friend when you are away</p>
        </div> 
        <div class="main1-pagenations">
          <div class="pagination-wrapper">
            <div class="pagination">
              <span ></span>
              <span></span>
              <span class="active"></span>
              <span></span>
            </div>
          </div>
          <a onClick={this.move}><img src="arrow1.png" alt="arrow" /></a>
        </div>
      </div>
    )
  }
}

export default GroomingScreen