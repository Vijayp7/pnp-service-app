import React, { Component } from 'react'
import '../All.css'

export class Internet extends Component {
  render() {
    return (
        <div class="no-intmain">
            <div class="no-int">
            <div class="noint-img">
                {/* <img src="no-intimg2.png" /> */}
            </div>
            <p>Could not connect to the internet.Please check your network</p>
            <span onClick={()=>{
              if(navigator.onLine){
                this.props.history.push({
                  pathname : "/"
                })
              }
              else{

              }
            }}>Try again</span>
            </div>
        </div>
    )
  }
}

export default Internet