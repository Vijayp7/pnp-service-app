import React, { Component } from 'react'
import './AddNewServices.css'


export class PaymentRequestSuccess extends Component {
    constructor(props){
        super(props);
    }

    moveToHome = () =>{
        window.open("#/home","_self");
    }
  render() {
    return (
        // <div class="p-sucess-main">
      
        <div class="p-cnt-p pymnt" id="popup">
            
            <img src="correct.png" />

            <h6>Successfully</h6>
            
            <p>Your Payment Request Submitted Succesfully</p>

            <button class="okay-btn" onClick={this.moveToHome}>Okay</button>

        </div>
    // </div>
    )
  }
}

export default PaymentRequestSuccess