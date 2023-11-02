import React, { Component } from 'react'
import HandlingImage from '../Entry-Screens/HandlingImage';
import Services from '../Services/Services';
import '../VetModule/VetServiceDetails.css'



const user = JSON.parse(localStorage.getItem(`PNP-Service-userData`));
const timings = [
  {"time" : "7 AM - 10 AM", "id" :"t1", "clicks" : 0},
  {"time" : "10 AM - 1 PM", "id" :"t2", "clicks" : 0},
  {"time" : "1 PM - 4 PM",  "id" :"t3", "clicks" : 0},
  {"time" : "4 PM - 9 AM",  "id" :"t4", "clicks" : 0},
  {"time" : "9 PM - 1 AM",  "id" :"t5", "clicks" : 0}
]
export class VetServicesDetails extends Component {

  constructor(props){
    super(props);
  }
  state = {
    service_id : this.props.location.service_type,
    service_type : "",
    available_days : "",
    selected_times : [],
    certificate_proof : "",
    imagename : "Select a file",
    err_msg : "",
  }

  componentDidMount=()=> {
  }

  selectServiceType=(service_type)=>{
    this.setState({
      service_type : service_type
    })
    if(service_type == "online"){
      document.getElementById("online").classList.add("active");
      document.getElementById("offline").classList.remove("active");
      document.getElementById("both").classList.remove("active");
    }
    else if(service_type == "offline"){
      document.getElementById("offline").classList.add("active");
      document.getElementById("online").classList.remove("active");
      document.getElementById("both").classList.remove("active");
    }
    else if(service_type == "both"){
      document.getElementById("both").classList.add("active");
      document.getElementById("online").classList.remove("active");
      document.getElementById("offline").classList.remove("active");
    }
  }

  availableDays=(availableDays)=>{
    this.setState({
      available_days : availableDays
    })
    if(availableDays == "Mon-Sat"){
      document.getElementById("Mon-Sat").classList.add("active");
      document.getElementById("Mon-Sun").classList.remove("active");
    }
    else if(availableDays == "Mon-Sun"){
      document.getElementById("Mon-Sun").classList.add("active");
      document.getElementById("Mon-Sat").classList.remove("active");
    }
  }


  availableTime=(selected_time, total_timings)=>{

    let adv_ext_time=total_timings;
    adv_ext_time=adv_ext_time.map((s,index)=>{
      if(selected_time.time==s.time){
        s.clicks=Number(s.clicks)+Number("1");
        if(s.clicks%2==0){
          document.getElementById(index).classList.remove("active");
          for(let i=0; i<this.state.selected_times.length;i++){
            if(selected_time.time==this.state.selected_times[i].time){
              this.state.selected_times.splice(i,1);
              console.log(this.state.selected_times);
            }
          }
        }else {
          document.getElementById(index).classList.add("active");
          const obj = {
            time : selected_time.time,
          }
          this.state.selected_times.push(obj);
          console.log(this.state.selected_times);
        }
        return s;
      }
     })
  }



  handle_Certificate_Proof = (event) =>{
    HandlingImage.getInstance().handleImagesMethod(event).then((result)=>{
      if(event.target.files[0].type == 'image/png'){
        let base64ImageURL = result.replace('data:image/png;base64,','');
        console.log(base64ImageURL);
        this.setState({
          certificate_proof: base64ImageURL,
          imagename : event.target.files[0].name,
        })
      }
      else if(event.target.files[0].type == 'image/jpeg'){
        let base64ImageURL = result.replace('data:image/jpeg;base64,','');
        this.setState({
          certificate_proof: base64ImageURL,
          imagename : event.target.files[0].name,
        })
        console.log(base64ImageURL);
  
      }
      else{
        // toast.error("Please upload PNG or JPEG files..");
      }
    })
  }


  goBack = () =>{
    this.props.history.push({
      pathname: "/primary-profile-data"
    })
}
  






  submit_Vet_Details = () =>{
    if(this.state.service_type == ""){
      this.setState({
        err_msg : "Please select service type"
      })
    }
    else if(this.state.available_days == ""){
      this.setState({
        err_msg : "Please select available days"
      })
    }
    else if(this.state.selected_times.length <= 0){
      this.setState({
        err_msg : "Please select available time"
      })
    }
    else if(this.state.certificate_proof == ""){
      this.setState({
        err_msg : "Please upload a file"
      })
    }
    else{
      this.setState({
        err_msg : ""
      })
    const obj = {
        service_id : this.state.service_id,
        service_provider : user.id,
        service_type : this.state.service_type,
        available_days : this.state.available_days,
        timings : this.state.selected_times,
        certificate : this.state.certificate_proof,
    }
    console.log(obj);
    Services.getInstance().VetServiceDataInsert(obj).then((result)=>{
      if(result.status === true){
        this.props.history.push({
          pathname : "/home"
        })
      }
      else{
        alert("Facing an issue while sending the data")
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
            <div class="srvc-dtls-bck" onClick={this.goBack}>
                <img src="srvc-dtls-bck-icon.png" />
              </div>
              <h4>Service Details</h4>
              <p style={{margin:"0 auto",textAlign:"center",color:"#fff",fontSize:"14px"}}>Select the Services You Offer</p>
              
            </div>
          </div>
          <div class="vh-bkng-main">
            <div class="vh-bkng-cnt">
              <h5>Service Type</h5>
  
              <div class="srvc-on-off">
                <div class="srvc-on" id="online">
                  <div class="srvc-on-img">
                    <img src="online-icon.png" />
                  </div>
                  <p>Online</p>
                  <div class="chk-item" onClick={()=> this.selectServiceType("online")}>
                    <input type="radio" id="chk1" name="chkn" />
                    <label for="chk1"></label>
                  </div>
                </div>

                <div class="srvc-on" id="offline">
                  <div class="srvc-on-img">
                    <img src="offline-icon.png" />
                  </div>
                  <p>Offline</p>
                  <div class="chk-item" onClick={()=> this.selectServiceType("offline")}>
                    <input type="radio" id="chk2" name="chkn" />
                    <label for="chk2"></label>
                  </div>
                </div>

                <div class="srvc-on" id="both">
                  <div class="srvc-on-img">
                    <img src="offline-icon.png" />
                  </div>
                  <p>Both</p>
                  <div class="chk-item" onClick={()=> this.selectServiceType("both")}>
                    <input type="radio" id="chk3" name="chkn" />
                    <label for="chk3"></label>
                  </div>
                </div>

              </div>
  
              <h5>Avaliable Days</h5>
  
              <div class="avl-dys-list">
                <div class="avl-dys-item" id="Mon-Sat" onClick={()=>this.availableDays("Mon-Sat")}>
                  <div class="avl-dys-cldr">
                    <img src="v-clndr-icon.png" />
                  </div>
                  <p>Mon - Sat</p>
                </div>
  
                <div class="avl-dys-item" id="Mon-Sun" onClick={()=>this.availableDays("Mon-Sun")}>
                  <div class="avl-dys-cldr">
                    <img src="v-clndr-icon.png" />
                  </div>
                  <p>Mon - Sun</p>
                </div>
  
              </div>
  
  
              <h5>Avaliable Time</h5>
  
              <div class="avl-tm-list">
                {timings && timings.length > 0 ? timings.map((s,index)=>{
                  return(
                    <div class="avl-tm-item" key={index} id={index} onClick={()=>this.availableTime(s,timings)}>
                      <p>{s.time}</p>
                      {/* <div class="chk-item" >
                        <input type="checkbox" id={index}/>
                        <label for={index}></label>
                      </div> */}
                    </div>
                  )

                }) : ""}
              </div>
  
              <h5>Upload Your Certificate</h5>
  
              <div class="v-upld-c" >
                <input type="text" class="btn2" placeholder={this.state.imagename} />
                <input 
                  type="file" 
                  class="v-upld" 
                  placeholder={this.state.imagename}
                  accept="image/*"
                  onChange={this.handle_Certificate_Proof} 
                  />
              </div>
              
              <p style={{margin: '10px', color: 'red'}}>{this.state.err_msg}</p>

              <div class="srvc-btn" onClick={this.submit_Vet_Details}>
                <button>Submit</button>
              </div>
  
            </div>
          </div>
  
  
        </div>
  
  
  
  
  
  
  
  
  
  
  
  
      </div>
    )
  }
}

export default VetServicesDetails