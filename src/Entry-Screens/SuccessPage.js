import React, { Component } from 'react'
import './Success.css'

export class SuccessPage extends Component {

    home=()=>{
        // this.props.history.push({
        //     pathname : "/home"
        // })
        window.open("#/home", "_self");
    }



  render() {
    return (
        <div id="wrapper">
          <div class="p-cnt-p sucss">                                
            <img src="correct.png" />
            <h6>Successfully</h6>
            <p>Your Quotation is Successfully Sent</p>
           <button class="okay-btn" onClick={this.home}>Okay</button>
          </div>
      </div>
    )
  }
}

export default SuccessPage