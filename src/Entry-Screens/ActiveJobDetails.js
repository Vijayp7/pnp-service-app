import React, { Component } from 'react'
import './ActiveJobDetails.css'
// import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Services from '../Services/Services';
import PaymentRequestSuccess from './PaymentRequestSuccess';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';




const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));
const activeJob = JSON.parse(localStorage.getItem("sp-active-job"));

export class ActiveJobDetails extends Component {
  constructor(props){
    super(props);
  }
  state = {
    activeJobData : this.props.location.activeJobData,
    active_job_details : {},
    sessions_error : "",
    amount_error : "",
    sessions: "",
    amount : "",
    remaining_amount : 0,
    success_popup : false,
    device_token : "",
    loading : false
  }


  handleChange = (e) =>{
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  componentDidMount = () =>{
    if(navigator.onLine){
    this.setState({
      loading : true
    })
    if(this.state.activeJobData != undefined){
        const obj = {
          clientId: this.state.activeJobData.clientId,
          bookingId: this.state.activeJobData.bookingId,
          serviceId: this.state.activeJobData.serviceId,
        }
        Services.getInstance().MyActiveJobsDetails(obj).then((result)=>{
          console.log(result);
          this.setState({
            active_job_details : result,
            remaining_amount : Number(result.cost),
            device_token : result.device_token,
            loading : false
          },()=>{
            {this.state.active_job_details.brackDown.forEach(element => {
              if(element.status == "1"){
                document.getElementById("s-1").style.display = "none";
                document.getElementById("s-2").style.display = "block";
              }
            })}
          })
        })
    }
    else{
      this.setState({
        activeJobData : activeJob
      },()=>{
        const obj = {
          clientId: this.state.activeJobData.clientId,
          bookingId: this.state.activeJobData.bookingId,
          serviceId: this.state.activeJobData.serviceId,
        }
        Services.getInstance().MyActiveJobsDetails(obj).then((result)=>{
          console.log(result);
          this.setState({
            active_job_details : result,
            remaining_amount : Number(result.remainAmount),
            device_token : result.device_token,
            loading : false
          },()=>{
            {this.state.active_job_details.brackDown.forEach(element => {
              if(element.status == "1"){
                document.getElementById("s-1").style.display = "none";
                document.getElementById("s-2").style.display = "block";
              }
            })}
          })
        })
      })
    }
  }
  else{
    this.props.history.push({
      pathname : "/internet"
    })
  }


  }


  openMapsRouting = (lat,long) =>{
    // this.props.history.push({
    //   pathname : "/client-location-routing",
    //   clientLat : lat,
    //   clientLong : long
    // })

    window.open("https://maps.google.com/?daddr="+lat+"," +long);
  }
  

  goBack = () =>{
    this.props.history.push({
      pathname : "/home"
    })
  }


  RequestPayment = (data) =>{
    this.setState({
      loading : true
    })
    if(data.serviceId == "3"){
      document.getElementById("sub-section").style.display = "block";
      this.setState({
        loading : false
      })
    }
    else{
      const obj = {
        clientId : data.clientId,
        serviceId : data.serviceId,
        spId : data.spId,
        bookingId : data.bookingId,
        quotId : data.quotId,
      }
      Services.getInstance().releaseRequest(obj).then((result)=>{
        if(result[0] == "Updated"){
          this.setState({
            loading : false
          })
          const obj1 = {
            notification: {
              title: "Petsfolio",
              body: user.first_name + user.last_name + " has requested you for payment release",
              sound: "default"
            },
            to: this.state.device_token
        }
        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
          console.log(result);
          this.setState({
            success_popup : true,
          })
          
        })

        }
        else{
          this.setState({
            loading : false
          })
        }
      })
    }

  }


  Submit = (data) =>{
    this.setState({
      loading : true
    })
    if(this.state.sessions == ""){
      this.setState({
        sessions_error : "Enter the completed sessions",
        loading : false
      })
    }
    else if(Number(this.state.sessions) > Number(data.remainSes)){
      this.setState({
        sessions_error : "Existing service has remaining" + data.remainSes +" sessions only",
        loading : false
      })
    }
    else if(this.state.amount == ""){
      this.setState({
        sessions_error : "Enter the amount",
        loading : false
      })
    }
    else if(Number(this.state.amount) > Number(data.remainAmount)){
      this.setState({
        sessions_error : "Existing service has remaining Rs." + data.remainAmount + " only",
        loading : false
      })
    }

    else if((Number(this.state.amount) == Number(data.remainAmount)) && (Number(this.state.sessions) < Number(data.remainSes))){
      this.setState({
        sessions_error : "Existing service has remaining Rs." + data.remainAmount + " and " + data.remainSes + " sessions",
        loading : false
      })
    }

    else if((Number(this.state.amount) < Number(data.remainAmount)) && (Number(this.state.sessions) == Number(data.remainSes))){
      this.setState({
        sessions_error : "Existing service has remaining Rs." + data.remainAmount + " and " + data.remainSes + " sessions",
        loading : false
      })
    }

    else{
      const obj = {
        clientId : data.clientId,
        serviceId : data.serviceId,
        spId : data.spId,
        bookingId : data.bookingId,
        quotId : data.quotId,
        sessions : this.state.sessions,
        cost : this.state.amount
      }
      Services.getInstance().releaseRequest(obj).then((result)=>{
        if(result[0] == "Updated"){
          this.setState({
            loading : false
          })
          const obj1 = {
            notification: {
              title: "Petsfolio",
              body: user.first_name + user.last_name + " has requested you for payment release",
              sound: "default"
            },
            to: this.state.device_token
        }
        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
          console.log(result);
          this.setState({
            success_popup : true,
          })
          
        })
        }
        else{
          this.setState({
            loading : false
          })
        }
      })
    }
  }




  render() {
    return (
        <div id="wrapper">
        <div class="srvc-dtls">
          <div class="srvc-dtls-hd">
            <h4>Service Details</h4>
            <div class="srvc-dtls-bck">
              <img src="srvc-dtls-bck-icon.png" onClick={this.goBack} />
            </div>
          </div>
          <div class="srvc-dtls-main sd-n">
              <div class="sd-pckg">
                <div class="sd-pckg-item">
                  <div class="sd-pckg-item-lft">
                    <div class="sd-pckg-pet-img">
                      <img src="star-icon.png" />
                    </div>
                    <h6>Package</h6>
                  </div>
                  <div class="sd-pckg-item-rht">
                    <div class="sd-pckg-item-img">
                      <img src="pckg-check-icon.png" />
                    </div>
                    <h5>{this.state.active_job_details.packName}</h5>
                  </div>
                </div> 
                <div class="sd-pckg-item cost">
                  <div class="sd-pckg-item-lft">
                    <div class="sd-pckg-pet-img">
                      <img src="sd-cash-icon.png" />
                    </div>
                    <h6>Cost</h6>
                  </div>
                  <div class="sd-pckg-item-rht">
                    <h5>{this.state.active_job_details.cost}/-</h5>
                  </div>
                </div> 
                <div class="rqst-pymnt" onClick={()=>this.RequestPayment(this.state.active_job_details)}>
                  <button>Request Payment</button>
                </div> 
              </div>
              <div class="sd-pckg" id='sub-section' style={{display : "none"}}>

                <div className='ad-pckg-list'>
                  <div className='ad-pckg-input'>
                      <p>No.of Sessions</p>
                      <input 
                        type='number'
                        name='sessions'
                        maxLength={2}
                        onChange={this.handleChange} 
                        placeholder='Ex:10'/>
                  </div>
                  <div className='ad-pckg-input'>
                      <p>Amount Request</p>
                      <input 
                        type='number'
                        maxLength={5}
                        name='amount'
                        onChange={this.handleChange} 
                        placeholder='Ex:1000'/>
                  </div>
                </div>
                <p style={{margin : "0 auto", textAlign:"center", color : "red"}}>{this.state.sessions_error}</p>
                <p style={{margin : "0 auto", textAlign:"center", color : "red"}}>{this.state.amount_error}</p>

                <div class="rqst-pymnt" onClick={()=>this.Submit(this.state.active_job_details)} id="s-1" style={{display : "block"}}>
                  <button>Submit</button>
                </div>
                <div class="rqst-pymnt" id="s-2" style={{display : "none"}}>
                  <button style={{backgroundColor : "#ada9a9"}}>Submit</button>
                </div>



                <div class="sd-pckg ar">
              <div class="ad-pckg-hd">
                  <div class="ad-pckg-lft">
                      <p>Sessions Completed</p>
                  </div>
                  <div class="ad-pckg-rht">
                      <p>Amount Request</p>
                  </div>
              </div>

              {this.state.active_job_details.brackDown && this.state.active_job_details.brackDown.length > 0 ? this.state.active_job_details.brackDown.map((data, index)=>{
                return(
                  <div class="ad-pckg-cnt">
                  <div class="ad-pckg-cnt-lft">
                    <p>{data.sessions}</p>
                  </div>
                  <div class="ad-pckg-cnt-rht">
                    <span>₹ {data.amount}/-
                    {data.status == "0" ? <b class="rjctd">(Rejected)</b> :
                      data.status == "1" ? <b class="pndng">(Pending)</b> : 
                      data.status == "2" ? <b class="aprvd">(Approved)</b> : 
                      data.status == "3" ? <b class="rlsd">(Released)</b> : ""
                    } 
                    </span>
                  </div>
                </div>
                )
              }) : ""}





              {/* <div class="ad-pckg-cnt">
                <div class="ad-pckg-cnt-lft">
                  <p>10</p>
                </div>
                <div class="ad-pckg-cnt-rht">
                  <span>₹ 1000/- <b class="pndng">(Pending)</b></span>
                </div>
              </div>
              <div class="ad-pckg-cnt">
                <div class="ad-pckg-cnt-lft">
                  <p>14</p>
                </div>
                <div class="ad-pckg-cnt-rht">
                  <span>₹ 2000/-<b class="aprvd">(Approved)</b></span>
                </div>
              </div>
              <div class="ad-pckg-cnt">
                <div class="ad-pckg-cnt-lft">
                  <p>08</p>
                </div>
                <div class="ad-pckg-cnt-rht">
                  <span>₹ 3000/-<b class="rlsd">(Released)</b></span>
                </div>
              </div>
              <div class="ad-pckg-cnt">
                <div class="ad-pckg-cnt-lft">
                  <p>11</p>
                </div>
                <div class="ad-pckg-cnt-rht">
                  <span>₹ 4000/-<b class="rjctd">(Rejected)</b></span>
                </div>
              </div>
               */}
            </div>










              </div>
               <h3>Pet Details</h3> 
             <div class="sd-pet-details"> 
                <div class="sd-pet-details-item">
                  <div class="sd-pet-details-lft">
                    <div class="sd-pet-details-img">
                      <img src="star-icon.png" />
                    </div>
                    <h6>Pet Name</h6>
                  </div>
                  <div class="sd-pet-details-rht">
                    <h5>{this.state.active_job_details.petName}</h5>
                  </div>
                </div>
                <div class="sd-pet-details-item">
                  <div class="sd-pet-details-lft">
                    <div class="sd-pet-details-img">
                      <img src="srvc-dlts-img3.png" />
                    </div>
                    <h6>Breed</h6>
                  </div>
                  <div class="sd-pet-details-rht">
                    <h5>{this.state.active_job_details.breed}</h5>
                  </div>
                </div>               
                <div class="sd-pet-details-item">
                  <div class="sd-pet-details-lft">
                    <div class="sd-pet-details-img">
                      <img src="srvc-dlts-img2.png" />
                    </div>
                    <h6>Age</h6>
                  </div>
                  <div class="sd-pet-details-rht">
                    <h5>{this.state.active_job_details.age}</h5>
                  </div>
                </div>

              {/* {this.state.active_job_details.addons && this.state.active_job_details.addons.length > 0 ? this.state.active_job_details.addons.map((addons, index)=>{
                return(
                  <div class="srvc-dtls-gm-list" key={index}>
                    <div class="srvc-dtls-gm-item">
                      <img src="tick-icon-r.png" />
                      <span>{addons.name}</span>
                    </div>
                  </div>
                )
              }) : " "} */}



                {/* <div class="sd-pet-details-item">
                  <div class="sd-pet-details-lft">
                    <div class="sd-pet-details-img clndr">
                      <img src="srvc-dlts-img5.png" />
                    </div>
                    <h6>Selected Preferable Date & Time</h6>
                  </div>
                  <div class="sd-pet-details-rht">
                    <h5>{this.state.active_job_details.bookingDate}</h5>
                  </div>
                </div>  */}


                <div class="sd-pet-details-item td">
                <div class="sd-pet-details-lft td">
                  <div class="sd-pet-details-img clndr">
                    <img src="srvc-dlts-img5.png" />
                  </div>
                  <h6>Selected Preferable Date & Time</h6>
                </div>
              </div>

                <div class="p-time prv">
                      <div class="p-item">
                        <p>From Date</p>
                        <div class="trng-adons dt">
                          <div class="ad-ons-cst">
                            <span>{this.state.active_job_details.bookingDate}</span>
                            <small></small>
                          </div>
                        </div>
                      </div>
                      {this.state.active_job_details.toDate !== "" ?
                      <div class="p-item">
                        <p>To Date</p>
                        <div class="trng-adons dt">
                          <div class="ad-ons-cst">
                            <span>{this.state.active_job_details.toDate}</span>
                            <small></small>
                          </div>
                        </div>
                      </div>
                      : "" }
                      {/* <div class="p-item">
                        <p>Morning</p>
                        <div class="trng-adons">
                          <div class="ad-ons-cst">
                            
                            <span>11:20</span>
                          </div>
                          <small>AM</small>
                        </div>
                      </div> */}

{this.state.active_job_details.bookingTime == ""  ? ""   : 

this.state.active_job_details.bookingTime < "12:00" ?  
                      <div class="p-item">
                        <p>Morning</p>
                        <div class="trng-adons">
                          <div class="ad-ons-cst">                            
                            <span>{new Date('1970-01-01T' + (this.state.active_job_details.bookingTime) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span>
                          </div>
                          {/* <small>AM</small> */}
                        </div>
                      </div>

:
this.state.active_job_details.bookingTime > "12:00" && this.state.active_job_details.bookingTime < "17:00" ?
                      <div class="p-item">
                      <p>Afternoon</p>
                      <div class="trng-adons">
                        <div class="ad-ons-cst">                            
                          <span>
                            {new Date('1970-01-01T' + (this.state.active_job_details.bookingTime) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}
                          </span>
                        </div>
                        {/* <small>PM</small> */}
                      </div>
                      </div>
:
this.state.active_job_details.bookingTime > "17:00" ?
                      <div class="p-item">
                      <p>Evening</p>
                      <div class="trng-adons">
                        <div class="ad-ons-cst">                            
                        <span>{new Date('1970-01-01T' + (this.state.active_job_details.bookingTime) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span>
                        </div>
                        {/* <small>PM</small> */}
                      </div>
                      </div>
 : ""}
 


 {this.state.active_job_details.spmorning == "" ? "" : 
        this.state.active_job_details.spmorning < "12:00" ?
        <div class="p-item">
        <p>Morning</p>
        <div class="trng-adons">
          <div class="ad-ons-cst">                            
          <span>{new Date('1970-01-01T' + (this.state.active_job_details.spmorning) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span>
          </div>
          {/* <small>PM</small> */}
        </div>
        </div>
        : ""
 }


{this.state.active_job_details.spafternoon== "" ? "" : 
    this.state.active_job_details.spafternoon > "12:00" ?
        <div class="p-item">
        <p>Afternoon</p>
        <div class="trng-adons">
          <div class="ad-ons-cst">                            
          <span>{new Date('1970-01-01T' + (this.state.active_job_details.spafternoon) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span>
          </div>
          {/* <small>PM</small> */}
        </div>
        </div>
        : ""
 }



 
{this.state.active_job_details.spevening== "" ? "" : 
    this.state.active_job_details.spevening    > "17:00" ?
        <div class="p-item">
        <p>Evening</p>
        <div class="trng-adons">
          <div class="ad-ons-cst">                            
          <span>{new Date('1970-01-01T' + (this.state.active_job_details.spevening) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span>
          </div>
          {/* <small>PM</small> */}
        </div>
        </div>
        : ""
 }
        </div>

        {this.state.active_job_details.addons && this.state.active_job_details.addons.length > 0 ?
                <div class="sd-pet-details-item hd">
                  <div class="sd-pet-details-lft">
                    <div class="sd-pet-details-img">
                      <img src="session-icon.png" />
                    </div>
                    <h6>Package Includes</h6>
                  </div>
                  <div class="sd-pet-details-rht drpdwn" >
                    <h5 id="view" style={{display : "block"}} 
                        onClick={()=>{
                            document.getElementById("f-add-ons").style.display = "block";
                            document.getElementById("f-genadd-ons").style.display = "block";
                            document.getElementById("view").style.display = "none";
                            document.getElementById("hide").style.display = "block"
                        }}>View</h5>
                    <h5 id="hide" style={{display : "none"}} 
                        onClick={()=>{
                            document.getElementById("f-add-ons").style.display = "none";
                            document.getElementById("f-genadd-ons").style.display = "none";
                            document.getElementById("view").style.display = "block";
                            document.getElementById("hide").style.display = "none"
                        }}>Hide</h5>
                  </div>
                </div>
              : "" }




            {this.state.active_job_details.genAddon && this.state.active_job_details.genAddon.length > 0 ?
              <div class="srvc-dtls-gm-list" id='f-genadd-ons' style={{display : "none", marginBottom: "5px"}}>
                {this.state.active_job_details.genAddon && this.state.active_job_details.genAddon.length > 0 ?
                  this.state.active_job_details.genAddon.map(str => {
                    return(
                      <div class="srvc-dtls-gm-item">
                        <img src="tick-icon-r.png" />
                        <span>{str}</span>
                      </div>                   
                    )
                  }) 
                : 
                ""
                }
              </div>
              : "" }


              <div class="srvc-dtls-gm-list" id='f-add-ons' style={{display : "none"}}>
                  {this.state.active_job_details.haircut == "" ? "" :
                  <div class="srvc-dtls-gm-item">
                    <img src="tick-icon-r.png" />
                    <span>{this.state.active_job_details.haircut}</span>
                  </div>}
                  {this.state.active_job_details.addons && this.state.active_job_details.addons.length > 0 ?
                    this.state.active_job_details.addons.map(str => {
                      return(
                        <div class="srvc-dtls-gm-item">
                          <img src="tick-icon-r.png" />
                          <span>{str}</span>
                        </div>                   
                      )
                    }) 
                  : 
                  this.state.active_job_details.haircut == "" ? "" :
                  <div class="srvc-dtls-gm-item">
                    <img src="tick-icon-r.png" />
                    <span>{this.state.active_job_details.haircut}</span>
                  </div>
                }
                </div> 




                </div>

             

              


              <h3>Client Details</h3>
             <div class="sd-pet-details"> 
                <div class="sd-pet-details-item">
                  <div class="sd-pet-details-lft">
                    <div class="sd-pet-details-img">
                      <img src="srvc-dlts-img2.png" />
                    </div>
                    <h6>Name</h6>
                  </div>
                  <div class="sd-pet-details-rht">
                    <h5>{this.state.active_job_details.ciDetails}</h5>
                  </div>
                </div>
                <div class="sd-pet-details-item">
                  <div class="sd-pet-details-lft">
                    <div class="sd-pet-details-img">
                      <img src="call-icon.png" />
                    </div>
                    <h6>Phone</h6>
                  </div>
                  <div class="sd-pet-details-rht">
                    <h5>{this.state.active_job_details.cinumber}</h5>
                  </div>
                </div>
                <div class="sd-pet-details-item" style={{display : "block"}}>
                  <div class="sd-pet-details-lft">
                    <div class="sd-pet-details-img">
                      <img src="cl-loc-icon.png" />
                    </div>
                    <h6>Location</h6>
                  </div>

                  
                  <div class="sd-pet-details-rht cl-loc" onClick={()=>this.openMapsRouting(this.state.active_job_details.lat,this.state.active_job_details.long)}>
                    <div class="cl-loc-div" >
                    <Map
                      google={this.props.google}
                      style={{width:"260px", height:"200px",margin:"10px 0 0 0"}}
                      zoom = {8}
                      center = {{
                          lat: 17.515798,
                          lng: 78.558024
                      }}
                    >
                    <Marker
                            onClick={()=>this.openMapsRouting(this.state.active_job_details.lat,this.state.active_job_details.long)}
                            position ={{
                                lat: this.state.active_job_details.lat,
                                lng: this.state.active_job_details.long
                            }}   
                    ></Marker> 
                    </Map>
                    </div>
                  </div>


                </div> 
              </div>  
          </div>  
        </div>
        {this.state.success_popup ? 
        <PaymentRequestSuccess />
        : ""}


        <DarkBackground disappear={this.state.loading}>
          <LoadingOverlay
          active={true}
          spinner={true}
          text="Please Wait..."
          >
          </LoadingOverlay>
        </DarkBackground>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDdXjkRFWa4oV-WVPrlKvPLlbwix_hWwr0"
})(ActiveJobDetails)