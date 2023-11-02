import React, { Component } from 'react'
import Services from '../Services/Services';
import './WalkingServiceDetails.css'


const user = JSON.parse(localStorage.getItem(`PNP-Service-userData`));

export class WalkingServiceDetails extends Component {
    constructor(props){
        super(props);
    }

    state={
        service_days:"",
        walk_per_day:"",
        service_type : this.props.location.service_type,
    }

    GoBack=()=>{
        this.props.history.push({
            pathname : "/primary-profile-data"
        })
    }

    ServiceDays=(ser_days_type)=>{
    if(ser_days_type=="Mon-Sat"){
        document.getElementById(ser_days_type).classList.add("active");
        document.getElementById("Sat-Mon").classList.remove("active");
        this.setState({
            service_days : ser_days_type
        })
        }
    else if(ser_days_type=="Sat-Mon") {
        document.getElementById(ser_days_type).classList.add("active");
        document.getElementById("Mon-Sat").classList.remove("active");
        this.setState({
            service_days : ser_days_type
        })
        }
    else{
        document.getElementById("Sat-Mon").classList.remove("active");
        document.getElementById("Mon-Sat").classList.remove("active");
        this.setState({
            service_days : ""
        })
    }           
 }

    WalkPerDay=(walk)=>{
        if(walk=="one-walk"){
            document.getElementById(walk).classList.add("active");
            document.getElementById("two-walk").classList.remove("active");
            document.getElementById("three-walk").classList.remove("active");
            this.setState({
                walk_per_day : "1"
            })
        }
        else if(walk=="two-walk"){
            document.getElementById(walk).classList.add("active");
            document.getElementById("one-walk").classList.remove("active");
            document.getElementById("three-walk").classList.remove("active");
            this.setState({
                walk_per_day : "2"
            })
        }
        else if(walk=="three-walk"){
            document.getElementById(walk).classList.add("active");
            document.getElementById("two-walk").classList.remove("active");
            document.getElementById("one-walk").classList.remove("active");
            this.setState({
                walk_per_day : "3"
            })
        }
        else{
            document.getElementById("one-walk").classList.remove("active");
            document.getElementById("two-walk").classList.remove("active");
            document.getElementById("three-walk").classList.remove("active");
            this.setState({
                walk_per_day : " "
            })
        }
    }



    submitWalking = () =>{
        if(this.state.service_days == ""){
            this.setState({
                err_msg : "Please select service days"
            })
        }
        else if(this.state.walk_per_day == ""){
            this.setState({
                err_msg : "Please select walks per day"
            })    
        }
        else{
        console.log("ttt")
        const obj = {
            service_id : this.state.service_type,
            service_provider : user.id,
            days_type : this.state.service_days,
            day_walks : this.state.walk_per_day,
        }

        Services.getInstance().WalkingServiceDataInsert(obj).then((result)=>{
            console.log(result);
            if(result.status === true){
                this.props.history.push({
                    pathname : "/home"
                })
            }
            else{
                alert(result.msg);
            }
        })
     }
    }

  render() {


    return (
        <div class="pten-main">
        <div class="petn-walk-main">
            <div class="petn-bg">
                <header class="petn-sd">
                    <div class="petn-sd-img" onClick={this.GoBack}><img src="left-arrow.png"/></div>
                    <h5>Service Details</h5>
                    <p style={{margin:"0 auto",textAlign:"center",color:"#fff",fontSize:"14px"}}>Select the Services You Offer</p>
                </header>
            </div>
            <div class="pt-ws-list">
                <div class="pt-ws-list-type">
                    <h5>Service Type</h5>
                    <p>Walking Service</p>
                    {/* <select>
                        <option>Dog Walking</option>
                        <option>Dog sitting</option>
                        <option>Dog Walking</option>
                        <option>Dog sitting</option>
                    </select> */}
                </div>
                <div class="pws-days">
                    <h5>Service Days</h5>
                    <div class="pws-day-list">
                        <div class="pws-dlt-item" id='Mon-Sat' onClick={()=>this.ServiceDays("Mon-Sat")}>Mon-Sat</div>
                        <div class="pws-dlt-item" id='Sat-Mon' onClick={()=>this.ServiceDays("Sat-Mon")}>Mon-Sun</div>
                    </div>
                </div>
                <div class="pws-wp-days">
                    <h5>Walk Per Days</h5>
                    <div class="pwsp-wpd-list">
                        <div class="pws-wpdlt-item" id='one-walk' onClick={()=>this.WalkPerDay("one-walk")}>One Walk</div>
                        <div class="pws-wpdlt-item" id='two-walk' onClick={()=>this.WalkPerDay("two-walk")}>Two Walk</div>
                        <div class="pws-wpdlt-item" id='three-walk' onClick={()=>this.WalkPerDay("three-walk")}>Three Walk</div>
                    </div>
                </div>
                <div class="pws-include">
                    <h5>Service Include</h5>
                    <div class="pws-incd-list">
                        <div class="pws-inlt-item">
                            <div class="pws-img-lst"><img src="time2.png"/></div>
                            <span>30 Min Walk</span>
                        </div>
                        <div class="pws-inlt-item">
                            <div class="pws-img-lst"><img src="note-book.png"/></div>
                            <span>Daily Walk Report</span>
                        </div>
                        <div class="pws-inlt-item">
                            <div class="pws-img-lst"><img src="srvc-location.png"/></div>
                            <span>Walk Distance Track</span>
                        </div>
                    </div>
                </div>
                <p style={{margin: '10px', color: 'red', bottom: '3px'}}>{this.state.err_msg}</p>
                <div class="pws-button" onClick={this.submitWalking}>
                    <button>Submit</button>
                </div>
            </div>
        </div>
     </div>
    )
  }
}

export default WalkingServiceDetails