import React, { Component } from 'react'
import './TrainingQuote.css'
import Services from '../Services/Services';
import SuccessPage from '../Entry-Screens/SuccessPage';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from '../Entry-Screens/DarkBackground';


const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));


export class TrainingQuoteReceived extends Component {
    constructor (props){
        super(props);
    }

    state={
        quoteObj : this.props.location.quoteObj,
        petData : {},
        general_addons : [],
        extra_addons : [],
        add_cost : "",
        Sessions : "",
        err_msg : "",
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
            loading : true,
        })
        const obj ={
            service_id : this.state.quoteObj.service_id,
            booking_id : this.state.quoteObj.booking_id,
          }
          console.log(obj);
          Services.getInstance().quoteForm(obj).then((result)=>{
            if(result.status === true){
              this.setState({
                petData : result.results,
                Total : Number(result.results.package_price),
                device_token : result.results.device_token,
                loading : false,
                Sessions : result.results.sessions,
              },()=>{
                this.setState({
                    platform_fee : (((this.state.Total)*10)/100)
                })
              })

              if(result.results.booking_time >= "00:00" && result.results.booking_time < "12:00"){
                this.setState({
                    sp_time0 : result.results.booking_time
                })
              }
              if(result.results.booking_time >= "12:00" && result.results.booking_time < "17:00"){
                this.setState({
                    sp_time1 : result.results.booking_time
                })
              }
              if(result.results.booking_time >= "17:00" && result.results.booking_time < "24:00"){
                this.setState({
                    sp_time2 : result.results.booking_time
                })
              }
            }
            else{
                this.setState({
                    loading : false,
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
        console.log(this.state)      
    };




    convertToYears (d_dob){
        var today = new Date();
        var birthDate = new Date(d_dob);
        var age = (Number(today.getFullYear()) - Number(birthDate.getFullYear()));
        console.log("Age"+age);
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
                err_msg : "Please enter Add-on service cost",
                loading : false,
            })
        }
        else if(this.state.Sessions == ""){
            this.setState({
                err_msg : "Total sessions are required",
                loading : false
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
                            body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Training",
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
                                loading : false,
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
                            body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Training",
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
                                loading : false,
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
                            body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Training",
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
                                loading : false,
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
                            body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Training",
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
                                loading : false,
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
                            body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Training",
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
                                loading : false,
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
                            body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Training",
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
                                loading : false,
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
                            body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Training",
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
                                loading : false,
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
                            body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Training",
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
                                loading : false,
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
          
            <h5>Training <br/> Service Details</h5>
        </header>
        <section class="pnp-ts-ctnt">
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

                    <div class="p-time-hd hd">
                        <p>Your  Prefferable Time</p>
                    </div>

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
                    <div id='rad-mrng' style={{display : "none"}}>
                    <select name="sp_time0" onChange={this.handleChange}>
                        <option value='5:00'>5:00 AM</option>
                        <option value='5:30'>5:30 AM</option>
                        <option value='6:00'>6:00 AM</option>
                        <option value='6:30'>6:30 AM</option>
                        <option value='7:00'>7:00 AM</option>
                        <option value='7:30'>7:30 AM</option>
                        <option value='8:00'>8:00 AM</option>
                        <option value='8:30'>8:30 AM</option>
                        <option value='9:00'>9:00 AM</option>
                        <option value='9:30'>9:30 AM</option>
                        <option value='10:00'>10:00 AM</option>
                        <option value='10:30'>10:30 AM</option>
                        <option value='11:00'>11:00 AM</option>
                        <option value='11:00'>11:30 AM</option>
                    </select>
                    </div>
                    </div>

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
                        <option value="12:00">12:00 PM</option>
                        <option value="12:30">12:30 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="13:30">1:30 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="14:30">2:30 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="15:30">3:30 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="16:30">4:30 PM</option>
                    </select>
                    </div>
                    </div>


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
                                <option value="17:00">5:00 PM</option>
                                <option value="17:30">5:30 PM</option>
                                <option value="18:00">6:00 PM</option>
                                <option value="18:30">6:30 PM</option>
                                <option value="19:00">7:00 PM</option>
                                <option value="19:30">7:30 PM</option>
                                <option value="20:00">8:00 PM</option>
                                <option value="20:30">8:30 PM</option>
                                <option value="21:00">9:00 PM</option>
                            </select>
                        </div>
                    </div>
                </div>
                

                {/* <div class="p-time edtble"> */}

                    {/* <div class="p-item">
                        <div class="chk-item">
                            <input  
                            
                            id='rad_sp'
                            type='radio'
                            name='rad_sp'
                            value="evening"

                            />
                            <label for="rad_sp" onChange={this.handleChange}></label>
                        </div>
                        <p>Morning</p>
                        <div id='rad-evng' style={{display : "none"}}>
                                <select name="sp_time2" onChange={this.handleChange}>
                                    <option value="17:00">5:00 PM</option>
                                    <option value="17:30">5:30 PM</option>
                                    <option value="18:00">6:00 PM</option>
                                    <option value="18:30">6:30 PM</option>
                                    <option value="19:00">7:00 PM</option>
                                    <option value="19:30">7:30 PM</option>
                                    <option value="20:00">8:00 PM</option>
                                    <option value="20:30">8:30 PM</option>
                                    <option value="21:00">9:00 PM</option>
                                </select>
                        </div>
                    </div> */}
                    {/* <div class="p-item">
                    <div class="chk-item">
                        <input type="radio" id="chkd5" name="chkd1" />
                        <label for="chkd5"></label>
                    </div>
                    <p>Afternoon</p>
                    <div class="trng-adons">
                        <div class="ad-ons-cst">
                        <input type="text" name="" placeholder="00:00" />
                        </div>
                        <small>PM</small>
                    </div>
                    </div>
                    <div class="p-item">
                    <div class="chk-item">
                        <input type="radio" id="chkd6" name="chkd1" />
                        <label for="chkd6"></label>
                    </div>
                    <p>Evening</p>
                    <div class="trng-adons">
                        <div class="ad-ons-cst">
                        <input type="text" name="" placeholder="00:00" />
                        </div>
                        <small>PM</small>
                    </div>
                    </div> */}

                {/* </div> */}








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
                            
                              <li>
                                <img src="gray-tick.png"/>
                                <h2>{gen_add.name}</h2>
                               </li>
                            
                            )
                        }):""}
                    </ul>
                    <div class="pts-lst-price scst">

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
                                        <li>
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
                                type="number"
                                onChange={this.handleChange} />
                            </div>
                        </div>
                    : "" }
                        <div class="pts-cs-item">
                            <h2>Session</h2>
                            <div class="pts-cs">
                                 <input class="ad-ons-cst"
                                  placeholder="Sessions"
                                  name="Sessions" 
                                  type="number" 
                                  onChange={this.handleChange}
                                  />
                            </div>
                        </div>
                    </div>



                        </div>
                    </div>
                    : "" }


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
                                    <option value="0">0%</option>
                                    <option value="5">5%</option>
                                    <option value="10">10%</option>
                                    <option value="15">15%</option>
                                    <option value="20">20%</option>
                                    <option value="25">25%</option>
                                </select>
                                </div>

                            <div class="org-cst bd">
                                <h5>Your Bidding Amount</h5>
                                {/* <span>{(Number(this.state.petData.package_price)+Number(this.state.add_cost))}</span> */}
                                <span>{this.state.Total}</span>
                            </div>
                            <div class="org-cst bd">
                                <h5>Platform Charges (10%)</h5>
                                <span>(-){this.state.platform_fee}</span>
                            </div>
                        </div>
                        <div class="rc-amnt">
                            <h1>Your Receivable Amount</h1>
                            <span>{(this.state.Total - this.state.platform_fee).toFixed(2)}</span>
                        </div>

                                









                </div>
            </div>

            
            <p style={{margin: '10px', color: 'red'}}>{this.state.err_msg}</p>
            <div class="pts-btn">
                <button onClick={this.SubmitQuote}>Accept</button>
            </div>
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

export default TrainingQuoteReceived