import React, { Component } from 'react'
import './TrainingQuote.css'
import Services from '../Services/Services';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SuccessPage from '../Entry-Screens/SuccessPage';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from '../Entry-Screens/DarkBackground';

const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));


export class TrainingQuoteEdit extends Component {
    constructor (props){
        super(props);
    }

    state={
        quoteObj : this.props.location.proposalData,
        petData : {},
        general_addons : [],
        extra_addons : [],
        add_cost : "",
        Sessions : "",
        err_msg : "",
        tabIndex : 0,
        platform_fee : 0,
        Total : 0,
        sp_time0: "",
        sp_time1: "",
        sp_time2: "",
        rad_sp : "",
        discount : 0,
        device_token:"",
        loading : false
    }

    componentDidMount=()=>{
    if(navigator.onLine){
        this.setState({
            loading : true
        })
        const obj ={
            spId : user.id,
            service_id : this.state.quoteObj.service_id,
            booking_id : this.state.quoteObj.booking_id,
          }
          console.log(obj);
          Services.getInstance().EditProposal(obj).then((result)=>{
            if(result.status === true){
                this.setState({
                    petData : result.results,
                    add_cost : result.results.extra_price,
                    Sessions : Number(result.results.extra_sessions),
                    discount : result.results.discount,
                    sp_time0: result.results.spmorning,
                    sp_time1: result.results.spafternoon,
                    sp_time2: result.results.spevening,
                    // rad_sp : result.results.spmorning || result.results.spafternoon || result.results.spevening,
                    device_token: result.results.device_token,
                    loading : false,                    
                },()=>{
                    this.setState({
                        loading : false,
                        Total : Number((((Number(this.state.petData.package_price))+(Number(this.state.add_cost)) - ((((Number(this.state.petData.package_price))+(Number(this.state.add_cost)))*(this.state.discount))/100))).toFixed(2))
                      },()=>{
                            this.setState({
                                platform_fee : (((this.state.Total)*10)/100)
                              })                    
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
    else{
        this.props.history.push({
            pathname : "/internet"
          })
    }
    }

    handleChange=e=>{
        const{name,value}=e.target;
        this.setState({
            [name]:value
        },()=>{
            this.setState({
                Total : (((Number(this.state.petData.package_price))+(Number(this.state.add_cost)) - ((((Number(this.state.petData.package_price))+(Number(this.state.add_cost)))*(this.state.discount))/100))).toFixed(2)
            },()=>{
                this.setState({
                  platform_fee : (((this.state.Total)*10)/100)
                }, ()=>{
                    if(this.state.rad_sp == "morning"){
                        document.getElementById("rad-mrng").style.display = "block";
                        document.getElementById("rad-aftn").style.display = "none";
                        document.getElementById("rad-evng").style.display = "none";
                    }
                    else if(this.state.rad_sp == "afternoon"){
                        document.getElementById("rad-aftn").style.display = "block";
                        document.getElementById("rad-mrng").style.display = "none";
                        document.getElementById("rad-evng").style.display = "none";
                    }
                    else if(this.state.rad_sp == "evening"){
                        document.getElementById("rad-evng").style.display = "block";
                        document.getElementById("rad-aftn").style.display = "none";
                        document.getElementById("rad-mrng").style.display = "none";
                    }
                })
              })
        });       
    };

    showJobDetails = () =>{
        this.setState({
          tabIndex : 1
        })
      }

    getDates(sp_date){
        const date1 = new Date(sp_date);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if(diffDays == 1){
            return "Today";
        }
        else if(diffDays > 1 && diffDays <= 2){
        return "Yesterday"
        }
        else if(diffDays < 30){
        return diffDays + " days ago";
        }
        else if(diffDays > 30){
          return "1 month ago"
        }
        else if(diffDays > 60){
          return "2 months ago"
        }
        else if(diffDays > 180){
          return "6 months ago"
        }
        else if(diffDays > 365){
          return "1 year ago"
        }
      }




      convertToYears (d_dob){
        var today = new Date();
        var birthDate = new Date(d_dob);
        var age = (today.getFullYear() - birthDate.getFullYear());
        if(age <= 0){
            if((today.getMonth() - birthDate.getMonth()) <= 0){
                return "Below 1 Month"
              }
              else{
                return (today.getMonth() - birthDate.getMonth()) + " Months"
              }
        }
        else{
            return age + " years"
        }
        
      }









    SubmitQuote=()=>{
        this.setState({
            loading : true,
        })
        if(this.state.add_cost == "" && this.state.petData.extra_addons.length > 0){
            this.setState({
                err_msg : "Please enter the Add-on service cost",
                loading : false,
            })
        }
        if(this.state.Sessions == ""){
            this.setState({
                err_msg : "Total sessions are required",
                loading : false,
            })
        }
        else{
            if(this.state.petData.extra_addons.length > 0){
                if(this.state.rad_sp == "morning"){
                    const obj={
                        service_id : this.state.quoteObj.service_id,
                        service_provider : user.id,
                        booking_id : this.state.quoteObj.booking_id,
                        sessions : Number(this.state.petData.sessions)+Number(this.state.Sessions),
                        actual_price : this.state.petData.package_price,
                        extra_price : this.state.add_cost,
                        discount : this.state.discount,
                        total_price : this.state.Total,
                        petId : this.state.petData.petId,
                        action : "update",
                        spmorning : this.state.sp_time0,
                        spafternoon : "",
                        spevening : "",
                    }
                    console.log(obj);
                    Services.getInstance().submitQuote(obj).then((result)=>{
                        if(result.status === true){
                            document.getElementById("success-pop").style.display = "block";
                            this.setState({
                                loading : false
                            })
            
                        const obj1 = {
                            notification: {
                              title: "Petsfolio",
                              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Training",
                              sound: "default"
                            },
                            to: this.state.device_token
                        }
                        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
                          console.log(result);
                          
                        })
                        }
                        else{
                            this.setState({
                                loading : false
                            })
                        }
                        
                      })
                }
    
                if(this.state.rad_sp == "afternoon"){
                    const obj={
                        service_id : this.state.quoteObj.service_id,
                        service_provider : user.id,
                        booking_id : this.state.quoteObj.booking_id,
                        sessions : Number(this.state.petData.sessions)+Number(this.state.Sessions),
                        actual_price : this.state.petData.package_price,
                        extra_price : this.state.add_cost,
                        discount : this.state.discount,
                        total_price : this.state.Total,
                        petId : this.state.petData.petId,
                        action : "update",
                        spmorning : "",
                        spafternoon : this.state.sp_time1,
                        spevening : "",
                    }
                    console.log(obj);
                    Services.getInstance().submitQuote(obj).then((result)=>{
                        if(result.status === true){
                            document.getElementById("success-pop").style.display = "block";
                            this.setState({
                                loading : false
                            })
            
                        const obj1 = {
                            notification: {
                              title: "Petsfolio",
                              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Training",
                              sound: "default"
                            },
                            to: this.state.device_token
                        }
                        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
                          console.log(result);
                          
                        })
                        }
                        else{
                            this.setState({
                                loading : false
                            })
                        }
                        
                      })
                }
                if(this.state.rad_sp == "evening"){
                    const obj={
                        service_id : this.state.quoteObj.service_id,
                        service_provider : user.id,
                        booking_id : this.state.quoteObj.booking_id,
                        sessions : Number(this.state.petData.sessions)+Number(this.state.Sessions),
                        actual_price : this.state.petData.package_price,
                        extra_price : this.state.add_cost,
                        discount : this.state.discount,
                        total_price : this.state.Total,
                        petId : this.state.petData.petId,
                        action : "update",
                        spmorning : "",
                        spafternoon : "",
                        spevening : this.state.sp_time2,
                    }
                    console.log(obj);
                    Services.getInstance().submitQuote(obj).then((result)=>{
                        if(result.status === true){
                            document.getElementById("success-pop").style.display = "block";
                            this.setState({
                                loading : false
                            })
            
                        const obj1 = {
                            notification: {
                              title: "Petsfolio",
                              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Training",
                              sound: "default"
                            },
                            to: this.state.device_token
                        }
                        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
                          console.log(result);
                          
                        })
                        }
                        else{
                            this.setState({
                                loading : false
                            })
                        }
                        
                      })
                }
                if(this.state.rad_sp == ""){
                    const obj={
                        service_id : this.state.quoteObj.service_id,
                        service_provider : user.id,
                        booking_id : this.state.quoteObj.booking_id,
                        sessions : Number(this.state.petData.sessions)+Number(this.state.Sessions),
                        actual_price : this.state.petData.package_price,
                        extra_price : this.state.add_cost,
                        discount : this.state.discount,
                        total_price : this.state.Total,
                        petId : this.state.petData.petId,
                        action : "update",
                        spmorning : this.state.sp_time0,
                        spafternoon : this.state.sp_time1,
                        spevening : this.state.sp_time2,
                    }
                    console.log(obj);
                    Services.getInstance().submitQuote(obj).then((result)=>{
                        if(result.status === true){
                            document.getElementById("success-pop").style.display = "block";
                            this.setState({
                                loading : false
                            })
            
                        const obj1 = {
                            notification: {
                              title: "Petsfolio",
                              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Training",
                              sound: "default"
                            },
                            to: this.state.device_token
                        }
                        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
                          console.log(result);
                          
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
            else{
                if(this.state.rad_sp == "morning"){
                    const obj={
                        service_id : this.state.quoteObj.service_id,
                        service_provider : user.id,
                        booking_id : this.state.quoteObj.booking_id,
                        sessions : Number(this.state.petData.sessions),
                        actual_price : this.state.petData.package_price,
                        extra_price : this.state.add_cost,
                        discount : this.state.discount,
                        total_price : this.state.Total,
                        petId : this.state.petData.petId,
                        action : "update",
                        spmorning : this.state.sp_time0,
                        spafternoon : "",
                        spevening : "",
                    }
                    console.log(obj);
                    Services.getInstance().submitQuote(obj).then((result)=>{
                        if(result.status === true){
                            document.getElementById("success-pop").style.display = "block";
                            this.setState({
                                loading : false
                            })
            
                        const obj1 = {
                            notification: {
                              title: "Petsfolio",
                              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Training",
                              sound: "default"
                            },
                            to: this.state.device_token
                        }
                        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
                          console.log(result);
                          
                        })
                        }
                        else{
                            this.setState({
                                loading : false
                            })
                        }
                        
                      })
                }
    
                if(this.state.rad_sp == "afternoon"){
                    const obj={
                        service_id : this.state.quoteObj.service_id,
                        service_provider : user.id,
                        booking_id : this.state.quoteObj.booking_id,
                        sessions : Number(this.state.petData.sessions),
                        actual_price : this.state.petData.package_price,
                        extra_price : this.state.add_cost,
                        discount : this.state.discount,
                        total_price : this.state.Total,
                        petId : this.state.petData.petId,
                        action : "update",
                        spmorning : "",
                        spafternoon : this.state.sp_time1,
                        spevening : "",
                    }
                    console.log(obj);
                    Services.getInstance().submitQuote(obj).then((result)=>{
                        if(result.status === true){
                            document.getElementById("success-pop").style.display = "block";
                            this.setState({
                                loading : false
                            })
            
                        const obj1 = {
                            notification: {
                              title: "Petsfolio",
                              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Training",
                              sound: "default"
                            },
                            to: this.state.device_token
                        }
                        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
                          console.log(result);
                          
                        })
                        }
                        else{
                            this.setState({
                                loading : false
                            })
                        }
                        
                      })
                }
                if(this.state.rad_sp == "evening"){
                    const obj={
                        service_id : this.state.quoteObj.service_id,
                        service_provider : user.id,
                        booking_id : this.state.quoteObj.booking_id,
                        sessions : Number(this.state.petData.sessions),
                        actual_price : this.state.petData.package_price,
                        extra_price : this.state.add_cost,
                        discount : this.state.discount,
                        total_price : this.state.Total,
                        petId : this.state.petData.petId,
                        action : "update",
                        spmorning : "",
                        spafternoon : "",
                        spevening : this.state.sp_time2,
                    }
                    console.log(obj);
                    Services.getInstance().submitQuote(obj).then((result)=>{
                        if(result.status === true){
                            document.getElementById("success-pop").style.display = "block";
                            this.setState({
                                loading : false
                            })
            
                        const obj1 = {
                            notification: {
                              title: "Petsfolio",
                              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Training",
                              sound: "default"
                            },
                            to: this.state.device_token
                        }
                        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
                          console.log(result);
                          
                        })
                        }
                        else{
                            this.setState({
                                loading : false
                            })
                        }
                        
                      })
                }
                if(this.state.rad_sp == ""){
                    const obj={
                        service_id : this.state.quoteObj.service_id,
                        service_provider : user.id,
                        booking_id : this.state.quoteObj.booking_id,
                        sessions : Number(this.state.petData.sessions),
                        actual_price : this.state.petData.package_price,
                        extra_price : this.state.add_cost,
                        discount : this.state.discount,
                        total_price : this.state.Total,
                        petId : this.state.petData.petId,
                        action : "update",
                        spmorning : this.state.sp_time0,
                        spafternoon : this.state.sp_time1,
                        spevening : this.state.sp_time2,
                    }
                    console.log(obj);
                    Services.getInstance().submitQuote(obj).then((result)=>{
                        if(result.status === true){
                            document.getElementById("success-pop").style.display = "block";
                            this.setState({
                                loading : false
                            })
            
                        const obj1 = {
                            notification: {
                              title: "Petsfolio",
                              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Training",
                              sound: "default"
                            },
                            to: this.state.device_token
                        }
                        Services.getInstance().SendBookingNotificationToClient(obj1).then((result)=>{
                          console.log(result);
                          
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

        
        }
    }

    goBack=()=>{
        this.props.history.push({
            pathname :"/home"
        })
    }
    
  render() {
    return (
        <div class="pnp-ts-main">
        <header class="pnp-ts-details">
            <div class="pnp-ts-img" onClick={this.goBack}>
                <img src="right.png"/>
            </div>
            <h5>Edit Quotation</h5>
        </header>
        <section class="pnp-ts-ctnt">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                <Tab onClick={this.showAllBids}>All Bids ({this.state.quoteObj.others.length})</Tab>
                <Tab onClick={this.showJobDetails}>Job Details</Tab>
                </TabList>
                <TabPanel id="jb-tab1" >
                  <div  class="jb-tab-content" >                
                          <div class="ab-cnt">                      
                            <div class="add-on-list">
                                <div class="n-ad-lft">
                                  <div class="add-on-lft">
                                    <img src={this.state.quoteObj.client_photo} />
                                  </div>
                                  <div class="add-on-rht">
                                    <h4>{this.state.quoteObj.client_name}</h4>
                                    <h5>{this.state.quoteObj.title}</h5>
                                    {/* <small>{this.state.quoteObj.petName}</small>                               */}
                                    <p>₹{this.state.quoteObj.price}/-</p>
                                  </div>
                                </div>
                                <div class="n-ad-rht">
                                    <span>{this.state.quoteObj.petName}</span> 
                                  <small><img src="loc-icon2.png" /> {this.state.quoteObj.distance} Away</small>
                                  <div class="snd-prsl go-s-grmng" onClick={this.showJobDetails}>
                                    <p id="edit-bid">Edit bid</p>
                                  </div>
                                </div>
                            </div>
                          </div>
                          <div class="ot-prsl">
                            <h4>Others Proposal</h4>
                            {this.state.quoteObj.others && this.state.quoteObj.others.length > 0 ? this.state.quoteObj.others.map((others,index)=>{
                              return(
                                <div class="ot-prsl-list" key={index}>
                                <div class="ot-prsl-lft">
                                  <div class="ot-prsl-img">
                                    <img src={others.photo} />
                                  </div>
                                  <div class="ot-prsl-cnt">
                                    <h6>{others.name}</h6>
                                    <p>₹{others.price}/-</p>
                                  </div>
                                </div> 
                                <div class="ot-prsl-rht">
                                  
                                  <div class="tmr-div">
                                    <img src="timer-icon.png" />
                                    <span>{this.getDates(others.updated_at)}</span>
                                  </div>
                                </div>
                                </div>
                              )
                            }) 
                            
                            : 
                            
                            <div class="srvc-tab-cnt">
                              <img class="no-job" src="no-propsl.png" />
                              <h2 class="no-job-txt">No proposals from others yet</h2>
                            </div> 
                            }
                          </div>
                  </div>
                </TabPanel>
                <TabPanel>
                <div>
                <div class="pts-pet-info">
                    <div class="petinfo-list">
                        <div class="pinfo-lst-item">
                            <div class="pinfo-lst-img">
                                <img src="dog.png"/>
                            </div>
                            <h3>Pet Name</h3>
                        </div>
                        <div class="pinfo-lst-btn">
                            <h4>{this.state.petData.pet_name}</h4>
                        </div>
                    </div>
                    <div class="petinfo-list">
                        <div class="pinfo-lst-item">
                            <div class="pinfo-lst-img">
                                <img src="dog.png"/>
                            </div>
                            <h3>Pet Age</h3>
                        </div>
                        <div class="pinfo-lst-btn">
                            <div class="pinf-btn-item">
                            <span>{this.convertToYears(this.state.petData.pet_age)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="srvc-dtls-item">
                        <div class="srvc-dtls-item-lft">
                        <div class="srvc-dtls-pet-img">
                            <img src="srvc-dlts-img3.png" />
                        </div>
                        <h6>Dog Breed</h6>
                        </div>
                        <div class="srvc-dtls-item-rht">
                        <span>{this.state.petData.pet_breed}</span>
                        </div>
                    </div>
                    <div class="petinfo-list">
                        <div class="pinfo-lst-item">
                            <div class="pinfo-lst-img">
                                <img src="redbelt-dog.png"/>
                            </div>
                            <h3>Temperament</h3>
                        </div>
                        <div class="pinfo-lst-btn">
                            <div class="pinf-btn-item">
                                <h6>{this.state.petData.pet_temperament}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="petinfo-list">
                        <div class="pinfo-lst-item">
                            <div class="pinfo-lst-img">
                                <img src="calender.png"/>
                            </div>
                            <h3>Start Date</h3>
                        </div>
                        <div class="pinfo-lst-btn">
                            <div class="pinf-btn-item">
                                <h6>{this.state.petData.booking_date}</h6>
                            </div>
                        </div>
                    </div>
                    {/* <div class="petinfo-list">
                        <div class="pinfo-lst-item">
                            <div class="pinfo-lst-img">
                                <img src="time2.png"/>
                            </div>
                            <h3>Time</h3>
                        </div>
                        <div class="pinfo-lst-btn">
                            <div class="pinf-btn-item">
                                <h6>{this.state.petData.booking_time}</h6>
                            </div>
                        </div>
                    </div> */}

<div class="srvc-dtls-item tm">
                    <div class="srvc-dtls-item-lft">
                        <div class="srvc-dtls-pet-img">
                        <img src="srvc-dlts-img6.png" />
                        </div>
                        <h6>Select Preferable Time</h6>
                    </div>
                </div>
                <div class="p-time edt">
                    
                    <div class="p-time-hd hd">
                        <p>Client Preffered Time</p>
                    </div>


                    {this.state.petData.booking_time < "12:00" ? 
                    <div class="p-time-hd">
                        <p>Morning</p>
                        <p class="c-p">{this.state.petData.booking_time}</p> 
                    </div>
                    :
                    this.state.petData.booking_time > "12:00" && this.state.petData.booking_time < "17:00" ? 
                        <div class="p-time-hd">
                            <p>Afternoon</p>
                            <p class="c-p">{this.state.petData.booking_time}</p> 
                        </div>
                    :
                    <div class="p-time-hd">
                    <p>Evening</p>
                    <p class="c-p">{this.state.petData.booking_time}</p> 
                </div>    
                    }
                </div>

                <div class="p-time edtble">
                    {this.state.petData.spmorning == "" ? 
                    <div class="p-item" style={{display : "flex"}}>
                    <div class="clk_d">
                    <input
                        id='rad_sp'
                        type='radio'
                        name='rad_sp'
                        value="morning"
                        onChange={this.handleChange}
                        />
 
                    <lable for="rad_sp" onChange={this.handleChange}>Morning</lable>
                    </div>
                    <div id='rad-mrng'  style={{display : "none"}}>
                    <select name="sp_time0" onChange={this.handleChange}>
                        {this.state.petData.spmorning == "05:00" ? <option value='5:00' selected>5:00 AM</option> : <option value='5:00'>5:00 AM</option>}
                        {this.state.petData.spmorning == "05:30" ? <option value='5:30' selected>5:30 AM</option> : <option value='5:30'>5:30 AM</option>}
                        {this.state.petData.spmorning == "06:00" ? <option value='6:00' selected>6:00 AM</option> : <option value='6:00'>6:00 AM</option>}
                        {this.state.petData.spmorning == "06:30" ? <option value='6:30' selected>6:30 AM</option> : <option value='6:30'>6:30 AM</option>}
                        {this.state.petData.spmorning == "07:00" ? <option value='7:00' selected>7:00 AM</option> : <option value='7:00'>7:00 AM</option>}
                        {this.state.petData.spmorning == "07:30" ? <option value='7:30' selected>7:30 AM</option> : <option value='7:30'>7:30 AM</option>}
                        {this.state.petData.spmorning == "08:00" ? <option value='8:00' selected>8:00 AM</option> : <option value='8:00'>8:00 AM</option>}
                        {this.state.petData.spmorning == "08:30" ? <option value='8:30' selected>8:30 AM</option> : <option value='8:30'>8:30 AM</option>}
                        {this.state.petData.spmorning == "09:00" ? <option value='9:00' selected>9:00 AM</option> : <option value='9:00'>9:00 AM</option>}
                        {this.state.petData.spmorning == "09:30" ? <option value='9:30' selected>9:30 AM</option> : <option value='9:30'>9:30 AM</option>}
                        {this.state.petData.spmorning == "10:00" ? <option value='10:00' selected>10:00 AM</option> : <option value='10:00'>10:00 AM</option>}
                        {this.state.petData.spmorning == "10:30" ? <option value='10:30' selected>10:30 AM</option> : <option value='10:30'>10:30 AM</option>}
                        {this.state.petData.spmorning == "11:00" ? <option value='11:00' selected>11:00 AM</option> : <option value='11:00'>11:00 AM</option>}
                        {this.state.petData.spmorning == "11:30" ? <option value='11:30' selected>11:30 AM</option> : <option value='11:30'>11:30 AM</option>}
                    </select>
                    </div>
                    </div>


                    :



                    <div class="p-item" style={{display : "flex"}}>
                    <div class="clk_d">
                    <input
                        id='rad_sp'
                        type='radio'
                        name='rad_sp'
                        checked='rad_sp'
                        value="morning"
                        onChange={this.handleChange}
                        />
                    <lable for="rad_sp" onChange={this.handleChange}>Morning</lable>
                    </div>
                    <div id='rad-mrng'  style={{display : "flex"}}>
                    <select name="sp_time0" onChange={this.handleChange}>
                        {this.state.petData.spmorning == "06:00" ? <option value='6:00' selected>6:00 AM</option> : <option value='6:00'>6:00 AM</option>}
                        {this.state.petData.spmorning == "06:30" ? <option value='6:30' selected>6:30 AM</option> : <option value='6:30'>6:30 AM</option>}
                        {this.state.petData.spmorning == "07:00" ? <option value='7:00' selected>7:00 AM</option> : <option value='7:00'>7:00 AM</option>}
                        {this.state.petData.spmorning == "07:30" ? <option value='7:30' selected>7:30 AM</option> : <option value='7:30'>7:30 AM</option>}
                        {this.state.petData.spmorning == "08:00" ? <option value='8:00' selected>8:00 AM</option> : <option value='8:00'>8:00 AM</option>}
                        {this.state.petData.spmorning == "08:30" ? <option value='8:30' selected>8:30 AM</option> : <option value='8:30'>8:30 AM</option>}
                        {this.state.petData.spmorning == "09:00" ? <option value='9:00' selected>9:00 AM</option> : <option value='9:00'>9:00 AM</option>}
                        {this.state.petData.spmorning == "09:30" ? <option value='9:30' selected>9:30 AM</option> : <option value='9:30'>9:30 AM</option>}
                        {this.state.petData.spmorning == "10:00" ? <option value='10:00' selected>10:00 AM</option> : <option value='10:00'>10:00 AM</option>}
                        {this.state.petData.spmorning == "10:30" ? <option value='10:30' selected>10:30 AM</option> : <option value='10:30'>10:30 AM</option>}
                        {this.state.petData.spmorning == "11:00" ? <option value='11:00' selected>11:00 AM</option> : <option value='11:00'>11:00 AM</option>}
                        {this.state.petData.spmorning == "11:30" ? <option value='11:30' selected>11:30 AM</option> : <option value='11:30'>11:30 AM</option>}
                    </select>
                    </div>
                    </div>
                }






{this.state.petData.spafternoon == "" ? 

                    <div class="p-item" style={{display : "flex"}}>                       
                    <div class="clk_d">
                    <input
                        id='rad_sp'
                        type='radio'
                        name='rad_sp'
                        value="afternoon"
                        onChange={this.handleChange}
                        />
                    <lable for="rad_sp" onChange={this.handleChange}>Afternoon</lable>
                    </div>
                    <div id='rad-aftn' style={{display : "none"}}>
                    <select name="sp_time1" onChange={this.handleChange}>
                        {this.state.petData.spafternoon == "12:00" ? <option value='12:00' selected>12:00 PM</option> : <option value='12:00'>12:00 PM</option>}
                        {this.state.petData.spafternoon == "12:30" ? <option value='12:30' selected>12:30 PM</option> : <option value='12:30'>12:30 PM</option>}
                        {this.state.petData.spafternoon == "13:00" ? <option value='13:00' selected>1:00 PM</option> : <option value='13:00'>1:00 PM</option>}
                        {this.state.petData.spafternoon == "13:30" ? <option value='13:30' selected>1:30 PM</option> : <option value='13:30'>1:30 PM</option>}
                        {this.state.petData.spafternoon == "14:00" ? <option value='14:00' selected>2:00 PM</option> : <option value='14:00'>2:00 PM</option>}
                        {this.state.petData.spafternoon == "14:30" ? <option value='14:30' selected>2:30 PM</option> : <option value='14:30'>2:30 PM</option>}
                        {this.state.petData.spafternoon == "15:00" ? <option value='15:00' selected>3:00 PM</option> : <option value='15:00'>3:00 PM</option>}
                        {this.state.petData.spafternoon == "15:30" ? <option value='15:30' selected>3:30 PM</option> : <option value='15:30'>3:30 PM</option>}
                        {this.state.petData.spafternoon == "16:00" ? <option value='16:00' selected>4:00 PM</option> : <option value='15:00'>4:00 PM</option>}
                        {this.state.petData.spafternoon == "16:30" ? <option value='16:30' selected>4:30 PM</option> : <option value='15:30'>4:30 PM</option>}
                    </select>
                    </div>
                    </div>


            :

                    <div class="p-item" style={{display : "flex"}}>                       
                    <div class="clk_d">
                    <input
                        id='rad_sp'
                        type='radio'
                        name='rad_sp'
                        checked='rad_sp'
                        value="afternoon"
                        onChange={this.handleChange}
                        />
                    <lable for="rad_sp" onChange={this.handleChange}>Afternoon</lable>
                    </div>
                    <div id='rad-aftn' style={{display : "flex"}}>
                    <select name="sp_time1" onChange={this.handleChange}>
                        {this.state.petData.spafternoon == "12:00" ? <option value='12:00' selected>12:00 PM</option> : <option value='12:00'>12:00 PM</option>}
                        {this.state.petData.spafternoon == "12:30" ? <option value='12:30' selected>12:30 PM</option> : <option value='12:30'>12:30 PM</option>}
                        {this.state.petData.spafternoon == "13:00" ? <option value='13:00' selected>1:00 PM</option> : <option value='13:00'>1:00 PM</option>}
                        {this.state.petData.spafternoon == "13:30" ? <option value='13:30' selected>1:30 PM</option> : <option value='13:30'>1:30 PM</option>}
                        {this.state.petData.spafternoon == "14:00" ? <option value='14:00' selected>2:00 PM</option> : <option value='14:00'>2:00 PM</option>}
                        {this.state.petData.spafternoon == "14:30" ? <option value='14:30' selected>2:30 PM</option> : <option value='14:30'>2:30 PM</option>}
                        {this.state.petData.spafternoon == "15:00" ? <option value='15:00' selected>3:00 PM</option> : <option value='15:00'>3:00 PM</option>}
                        {this.state.petData.spafternoon == "15:30" ? <option value='15:30' selected>3:30 PM</option> : <option value='15:30'>3:30 PM</option>}
                        {this.state.petData.spafternoon == "16:00" ? <option value='16:00' selected>4:00 PM</option> : <option value='15:00'>4:00 PM</option>}
                        {this.state.petData.spafternoon == "16:30" ? <option value='16:30' selected>4:30 PM</option> : <option value='15:30'>4:30 PM</option>}
                    </select>
                    </div>
                    </div>




            }






{this.state.petData.spevening == "" ? 
                    <div class="p-item">
                        <div class="clk_d">
                            <input
                                id='rad_sp'
                                type='radio'
                                name='rad_sp'
                                value="evening"
                                onChange={this.handleChange}
                                />
                            <lable for="rad_sp" onChange={this.handleChange}>Evening</lable>
                        </div>
                        {/* <p></p> */}
                        <div id='rad-evng' style={{display : "none"}}>
                            <select name="sp_time2" onChange={this.handleChange}>
                            {this.state.petData.spevening == "17:00" ? <option value='17:00' selected>5:00 PM</option> : <option value='17:00'>5:00 PM</option>}
                            {this.state.petData.spevening == "17:30" ? <option value='17:30' selected>5:30 PM</option> : <option value='17:30'>5:30 PM</option>}
                            {this.state.petData.spevening == "18:00" ? <option value='18:00' selected>6:00 PM</option> : <option value='18:00'>6:00 PM</option>}
                            {this.state.petData.spevening == "18:30" ? <option value='18:30' selected>6:30 PM</option> : <option value='18:30'>6:30 PM</option>}
                            {this.state.petData.spevening == "19:00" ? <option value='19:00' selected>7:00 PM</option> : <option value='19:00'>7:00 PM</option>}
                            {this.state.petData.spevening == "19:30" ? <option value='19:30' selected>7:30 PM</option> : <option value='19:30'>7:30 PM</option>}
                            {this.state.petData.spevening == "20:00" ? <option value='20:00' selected>8:00 PM</option> : <option value='20:00'>8:00 PM</option>}
                            {this.state.petData.spevening == "20:30" ? <option value='20:30' selected>8:30 PM</option> : <option value='20:30'>8:30 PM</option>}
                            {this.state.petData.spevening == "21:00" ? <option value='21:00' selected>9:00 PM</option> : <option value='21:00'>9:00 PM</option>}
                            {/* {this.state.petData.spevening == "21:30" ? <option value='21:30' selected>9:30 PM</option> : <option value='21:30'>9:30 PM</option>} */}
                            </select>
                        </div>
                    </div>




        :


        <div class="p-item">
        <div class="clk_d">
            <input
                id='rad_sp'
                type='radio'
                checked='rad_sp'
                name='rad_sp'
                value="evening"
                onChange={this.handleChange}
                />
            <lable for="rad_sp" onChange={this.handleChange}>Evening</lable>
        </div>
        {/* <p></p> */}
        <div id='rad-evng' style={{display : "flex"}}>
            <select name="sp_time2" onChange={this.handleChange}>
            {this.state.petData.spevening == "17:00" ? <option value='17:00' selected>5:00 PM</option> : <option value='17:00'>5:00 PM</option>}
            {this.state.petData.spevening == "17:30" ? <option value='17:30' selected>5:30 PM</option> : <option value='17:30'>5:30 PM</option>}
            {this.state.petData.spevening == "18:00" ? <option value='18:00' selected>6:00 PM</option> : <option value='18:00'>6:00 PM</option>}
            {this.state.petData.spevening == "18:30" ? <option value='18:30' selected>6:30 PM</option> : <option value='18:30'>6:30 PM</option>}
            {this.state.petData.spevening == "19:00" ? <option value='19:00' selected>7:00 PM</option> : <option value='19:00'>7:00 PM</option>}
            {this.state.petData.spevening == "19:30" ? <option value='19:30' selected>7:30 PM</option> : <option value='19:30'>7:30 PM</option>}
            {this.state.petData.spevening == "20:00" ? <option value='20:00' selected>8:00 PM</option> : <option value='20:00'>8:00 PM</option>}
            {this.state.petData.spevening == "20:30" ? <option value='20:30' selected>8:30 PM</option> : <option value='20:30'>8:30 PM</option>}
            {this.state.petData.spevening == "21:00" ? <option value='21:00' selected>9:00 PM</option> : <option value='21:00'>9:00 PM</option>}
            {/* {this.state.petData.spevening == "21:30" ? <option value='21:30' selected>9:30 PM</option> : <option value='21:30'>9:30 PM</option>} */}
            </select>
        </div>
    </div>

    }
                </div>
                    







                    <div class="petinfo-text">
                        <h2>Additional Notes</h2>
                        <p>{this.state.petData.message}</p>
                    </div>
                </div>
                <div class="pts-package-info">
                    <div class="pts-pack-list">
                        <div class="ptpck-item">
                            <div class="pts-package-ctn">
                                <div class="pts-pack-star">
                                    <div class="pts-pck-img">
                                        <img src="star2.png"/>
                                    </div>
                                    <h3>Package</h3>
                                </div>
                                <div class="pts-pack-star">
                                    <div class="pts-tick-img">
                                        <img src="pts-tick.png"/>
                                    </div>
                                    <h4>{this.state.petData.package_name}</h4>
                                </div>
                            </div>
                            
                        </div>
                        <div class="pts-habit-list">
                        <ul>
                            {this.state.petData.general_addons && this.state.petData.general_addons.length > 0 ? this.state.petData.general_addons.map((gen_add,index)=>{
                                return(
                                
                                <li key={index}>
                                    <img src="gray-tick.png"/>
                                    <h2>{gen_add.name}</h2>
                                </li>
                                
                                )
                            }):""}
                            </ul>

                            <div class="pts-lst-price">
                                <div class="pts-price">
                                    <strong>{this.state.petData.package_price} /-</strong>
                                    <p>{this.state.petData.sessions} Sessions</p>
                                    {/* <h6>{this.state.petData.sessions} Sessions</h6> */}
                                </div>

                                {/* {this.state.petData.extra_addons && this.state.petData.extra_addons.length > 0 ? "" : 
                                <div class="pts-cs-item">
                                    <h2>Session</h2>
                                    <div class="pts-cs">
                                        <input class="ad-ons-cst"
                                        placeholder="Sessions"
                                        name="Sessions" 
                                        type="number" 
                                        value={this.state.Sessions}
                                        onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                } */}
                            </div>


                            
                        </div>
                    {this.state.petData.extra_addons && this.state.petData.extra_addons.length > 0 ?
                        <div class="pts-add-one">
                            <h1>Add-Ons</h1>
                            <div class="pts-add-list">
                                <ul>
                                    {this.state.petData.extra_addons && this.state.petData.extra_addons.length > 0 ? this.state.petData.extra_addons.map((ext_add,index)=>{
                                        return(
                                        <li key={index}>
                                            <img src="pts-tick.png"/>
                                            <h3>{ext_add.name}</h3>
                                        </li>
                                        )
                                    }) : ""}
                                    
                                </ul>

                                <div class="pts-cost-session">
                        {this.state.petData.extra_addons && this.state.petData.extra_addons.length > 0 ?
                            <div class="pts-cs-item">
                                <h2>Cost</h2>
                                <div class="pts-cs">
                                    <input class="ad-ons-cst" 
                                    placeholder="Add cost" 
                                    name="add_cost"
                                    value={this.state.add_cost} 
                                    type="number"
                                    onChange={this.handleChange} />
                                </div>
                            </div>
                        : ""}
                            <div class="pts-cs-item">
                                <h2>Session</h2>
                                <div class="pts-cs">
                                    <input class="ad-ons-cst"
                                    placeholder="Sessions"
                                    value={this.state.Sessions}
                                    name="Sessions" 
                                    type="number" 
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                                </div>

                            </div>
                        </div>
                    : ""}
                        

                        <div className='tatl'>
                            <div class="org-cst">
                    <h5>Original Cost</h5>
                    <span>{Number(this.state.petData.package_price)+Number(this.state.add_cost)}</span>
                            </div>
                
                            <div class="srvc-dsct">
                            <h5>Do you want to offer a discount?
                                <small>(Discounts can help in winning the job)</small>
                            </h5>
                            <select onChange={this.handleChange} name="discount">
                                {this.state.petData.discount == "0" ? <option value="0" selected>0%</option> : <option value="0">0%</option>}
                                {this.state.petData.discount == "5" ? <option value="5" selected>5%</option> : <option value="5">5%</option>}
                                {this.state.petData.discount == "10" ? <option value="10" selected>10%</option> : <option value="10">10%</option>}
                                {this.state.petData.discount == "15" ? <option value="15" selected>15%</option> : <option value="15">15%</option>}
                                {this.state.petData.discount == "20" ? <option value="20" selected>20%</option> : <option value="20">20%</option>}
                                {this.state.petData.discount == "25" ? <option value="25" selected>25%</option> : <option value="25">25%</option>}
                            </select>
                            </div>

                            <div class="org-cst bd">
                                <h5>Your Bidding Amount</h5>
                                {/* <span>{(Number(this.state.petData.package_price)+Number(this.state.add_cost))}</span> */}
                                <span>{Number(this.state.Total)}</span>
                            </div>
                            <div class="org-cst bd">
                                <h5>Platform Charges (10%)</h5>
                                <span>(-){Number(this.state.platform_fee)}</span>
                            </div>
                        </div>
                        <div class="rc-amnt">
                            <h1>Your Receivable Amount</h1>
                            <span>{Number(this.state.Total - this.state.platform_fee).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <p style={{margin: '10px', color: 'red'}}>{this.state.err_msg}</p>
                <div class="pts-btn">
                    <button onClick={this.SubmitQuote}>Re-Submit</button>
                </div> 
                </div>
                </TabPanel>
            </Tabs>


        </section>

        <div id="success-pop" style={{display : "none"}}>
            <SuccessPage/>
        </div>
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

export default TrainingQuoteEdit