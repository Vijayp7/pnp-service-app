import React, { Component } from 'react'
import Services from '../Services/Services';
import "./SittingServiceDetails.css"



const user = JSON.parse(localStorage.getItem(`PNP-Service-userData`));

export class SittingServiceDetails extends Component {
  constructor(props){
    super(props);
  }

  state = {
    service_type : this.props.location.service_type,
    selected_service_time : "",
    err_msg : "",
  }

  
  GoBack=()=>{
    this.props.history.push({
        pathname : "/primary-profile-data"
    })

  }
  Service_Time=(value)=>{
   if(value == "Day"){
      this.setState({
        selected_service_time : value,
        err_msg : ""
      })
      document.getElementById(value).classList.add("active");
      document.getElementById("Night").classList.remove("active");
      document.getElementById("Both").classList.remove("active");
    } 
    else if(value == "Night"){
      this.setState({
        selected_service_time : value,
        err_msg : ""
      })
      document.getElementById(value).classList.add("active");
      document.getElementById("Day").classList.remove("active");
      document.getElementById("Both").classList.remove("active");
    }
    else if(value == "Both"){
      this.setState({
        selected_service_time : value,
        err_msg : ""
      })
      document.getElementById(value).classList.add("active");
      document.getElementById("Day").classList.remove("active");
      document.getElementById("Night").classList.remove("active");
    }
  }


  Submit_Sitting = () =>{
    if(this.state.selected_service_time == ""){
      this.setState({
        err_msg : "Please select service"
      })
    }
    else{
      this.setState({
        err_msg : ""
      })
    const obj = {
        service_id : this.state.service_type,
        service_provider : user.id,
        service_type : this.state.selected_service_time,
    }
    console.log(obj);
    Services.getInstance().SittingServiceDataInsert(obj).then((result)=>{
      if(result.status === true){
        this.props.history.push({
          pathname :"/home",
        })
      }
      else{
        alert("something went wrong");
      }
    })
  }
}



  render() {
    return (
        <div id="wrapper">
        <div class="srvc-dtls">
          
          <div class="srvc-dtls_lgn_stng">
            <div class="srvc-dtls-hd">
            <div class="srvc-dtls-bck" onClick={this.GoBack}>
                <img src="srvc-dtls-bck-icon.png" />
              </div>
              <h4>Service Details</h4>
              <p style={{margin:"0 auto",textAlign:"center",color:"#fff",fontSize:"14px"}}>Select the Services You Offer</p>
              
            </div>
          </div>

          <div class="srvc-dtls-main">
            
            <div class="srvc-dtls-lgn_dlts">
              
              <div class="srvc-type">
                <h4>Service Type</h4>
                <div class="srvc-type_cnt">
                  <img src="pet_stng-img.png" />
                  <p>Pet Sitting</p>
                </div>
              </div>
  
              <div class="srvc-time">
                <h4>Service Time</h4>
                <div class="srvc-time-slots">
                  <div class="srvc-tmngs" id='Day' onClick={()=> this.Service_Time("Day")}>
                    <span>Day</span>
                    <p>6 AM - 6 PM</p>
                  </div>
                  <div class="srvc-tmngs" id='Night' onClick={()=> this.Service_Time("Night")}>
                    <span>Night</span>
                    <p>6 PM - 6 AM</p>
                  </div>
                  <div class="srvc-tmngs" id='Both' onClick={()=> this.Service_Time("Both")} >
                    <span>Both</span>
                    <p>Day&Night</p>
                  </div>
                </div>
              </div>
              <p style={{margin: '1px', color: 'red', marginBottom: '10px'}}>{this.state.err_msg}</p>
              <div class="pt-srvc-incld">
                <h4>Service Include</h4>  
                <div class="srvc-incld-slct">
                  <div class="chk-item">
                    <input type="checkbox" id="chk4"/>
                    <label for="chk4"></label>
                  </div>
                  <div class="srvc-incld-item">
                    <div class="srvc-incld-item-lft">
                      <img src="fedng-img.png" />
                    </div>
                    <p>Feeding</p>
                  </div>
                  <div class="srvc-incld-item">
                    <div class="srvc-incld-item-lft">
                      <img src="wlkng-img.png" />
                    </div>
                    <p>Walking</p>
                  </div>
                  <div class="srvc-incld-item">
                    <div class="srvc-incld-item-lft">
                      <img src="plyng-img.png" />
                    </div>
                    <p>Playing with the Dog</p>
                  </div>
                </div>
  
              </div>
  
            </div>
  
            <div class="srvc-btn" onClick={this.Submit_Sitting}>
              <button>Submit</button>
            </div>
  
          </div>
  
  
        </div>
  
      </div>
    )
  }
}

export default SittingServiceDetails