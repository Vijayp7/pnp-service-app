import React, { Component } from 'react'
import './AddNewServices.css'


export class AddServiceSuccess extends Component {
    constructor(props){
        super(props);
    }

    moveToHome = () =>{
        window.location.reload();
    }
  render() {
    return (
        // <div class="p-sucess-main">
      
        <div class="p-cnt-p">
            
            <img src="correct.png" />

            <h6>Successfully</h6>
            
            <p>Your service added succesfully</p>

            <button class="okay-btn" onClick={this.moveToHome}>Okay</button>

        </div>
    // </div>
    )
  }
}

export default AddServiceSuccess