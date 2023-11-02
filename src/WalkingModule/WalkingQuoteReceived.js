import React, { Component } from 'react'
import './WalkingQuote.css'
import Services from '../Services/Services'
import SuccessPage from '../Entry-Screens/SuccessPage';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from '../Entry-Screens/DarkBackground';


const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));
let days_difference;

export class WalkingQuoteReceived extends Component {
    constructor(props){
        super(props);
    }

    state={
        quoteObj : this.props.location.quoteObj,
        petData : {},
        timings : [],
        packageName : "",
        difference : "",
        add_cost : 0,
        discount : 0,
        Total_month:0,
        Total_perday:0,
        package_price :0,
        sessions : 0,
        original_cost_month:0,
        original_cost_perday:0,
        err_msg : "",
        sp_time0 : "",
        sp_time1 : "",
        sp_time2 : "",
        platform_fee_per_day : 0,
        platform_fee_per_month : 0,
        device_token:"",
        loading : false
    }

    handleChange=e=>{
      const{name,value}=e.target;
      this.setState({
          [name]:value
      },()=>       
      this.setState({
        original_cost_month : ((Number(this.state.petData.package_price))*(Number(this.state.petData.day_walks))*(Number(this.state.difference))),
        original_cost_perday : ((Number(this.state.petData.day_walks))*(Number(this.state.add_cost))*(Number(this.state.difference))),

        Total_month : ((
          (Number(this.state.petData.package_price))*
          (Number(this.state.petData.day_walks))*
          (Number(this.state.difference))) - 
          ((((Number(this.state.petData.package_price))*(Number(this.state.petData.day_walks))*(Number(this.state.difference))))*(this.state.discount)/100)),
        Total_perday : (((Number(this.state.petData.day_walks))*(Number(this.state.add_cost))*(Number(this.state.difference))) - ((((Number(this.state.petData.day_walks))*(Number(this.state.add_cost))*(Number(this.state.difference)))) * (this.state.discount)/100))
      },()=>{
        this.setState({
          platform_fee_per_day : (((this.state.Total_perday)*10)/100),
          platform_fee_per_month : (((this.state.Total_month)*10)/100)
        })
      }));
      console.log(this.state);       
  };

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
                packageName : result.results.package_name,
                device_token : result.results.device_token,
                loading : false
              })
              if(result.results.package_name=="Per Day Package"){
                document.getElementById("perday").style.display ="block";
              }else {
                document.getElementById("month").style.display ="block";
              }
              let from_date = new Date(result.results.from_date); 
              let to_date = new Date(result.results.to_date); 
              let date_diff = to_date.getTime() - from_date.getTime();
              days_difference = (date_diff / (1000 * 60 * 60 * 24))+1;



              if(result.results.day_type == "Mon-Sat"){
                var start = new Date(from_date);
                var finish = new Date(to_date);
                var dayMilliseconds = 1000 * 60 * 60 * 24;
                var weekendDays = 0;
                while (start <= finish) {
                  var day = start.getDay()
                  if (day == 0) {
                    weekendDays++;
                  }
                  start = new Date(+start + dayMilliseconds);
                }
                console.log("weekdays" + weekendDays)
                days_difference = ((date_diff / (1000 * 60 * 60 * 24))+1)-weekendDays
              }
              this.setState({
                difference : days_difference,
                original_cost_month : Number((Number(this.state.petData.package_price))*(Number(this.state.petData.day_walks))*(Number(this.state.difference))),
                original_cost_perday : Number((Number(this.state.petData.day_walks))*(Number(this.state.add_cost))*(Number(this.state.difference))),
              },
              ()=>{
                this.setState({
                  original_cost_month : ((Number(this.state.petData.package_price))*(Number(this.state.petData.day_walks))*(Number(this.state.difference))),
                  original_cost_perday : ((Number(this.state.petData.day_walks))*(Number(this.state.add_cost))*(Number(this.state.difference))),
          
                  Total_month : ((
                    (Number(this.state.petData.package_price))*
                    (Number(this.state.petData.day_walks))*
                    (Number(this.state.difference))) - 
                    ((((Number(this.state.petData.package_price))*(Number(this.state.petData.day_walks))*(Number(this.state.difference))))*(this.state.discount)/100)),
                  Total_perday : (((Number(this.state.petData.day_walks))*(Number(this.state.add_cost))*(Number(this.state.difference))) - ((((Number(this.state.petData.day_walks))*(Number(this.state.add_cost))*(Number(this.state.difference)))) * (this.state.discount)/100))
                },()=>{
                  this.setState({
                    platform_fee_per_day : (((this.state.original_cost_perday)*10)/100),
                    platform_fee_per_month : (((this.state.original_cost_month)*10)/100)
                  })
                })
              }
              
            )


            if(result.results.timings.length > 0){
              for(let i=0; i<result.results.timings.length; i++){
                if(result.results.timings[i].time >= "00:00" && result.results.timings[i].time < "12:00"){
                  this.setState({
                    sp_time0 : result.results.timings[i].time
                  })
                }
                if(result.results.timings[i].time >= "12:00" && result.results.timings[i].time < "17:00"){
                  this.setState({
                    sp_time1 : result.results.timings[i].time
                  })
                }
                if(result.results.timings[i].time >= "17:00" && result.results.timings[i].time < "24:00"){
                  this.setState({
                    sp_time2 : result.results.timings[i].time
                  })
                }
                else{
                  //
                }
              }
            }
                      
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

    SubmitQuote=()=>{
      this.setState({
        loading : true
      })
      if(this.state.packageName == "Per Day Package"){

        if(this.state.add_cost == ""){
          this.setState({
            err_msg : "Please enter the service cost",
            loading : false
          })
        }
        if((Number(this.state.add_cost)) < 96 || (Number(this.state.add_cost)) > 170){
          this.setState({
            err_msg : "Service cost cannot be less than 96 and more than Rs. 175",
            loading : false
          })
        }
        else{
        const obj={
          service_id : this.state.quoteObj.service_id,
          service_provider : user.id,
          booking_id : this.state.quoteObj.booking_id,
          sessions : this.state.sessions,
          actual_price : this.state.add_cost,
          extra_price : "0",
          discount : this.state.discount,
          total_price : this.state.Total_perday,
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
          //  this.props.history.push({
          //   pathname : "/successPage"
          //  })

          const obj1 = {
            notification: {
              title: "Petsfolio",
              body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Walking",
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
        const obj={
          service_id : this.state.quoteObj.service_id,
          service_provider : user.id,
          booking_id : this.state.quoteObj.booking_id,
          sessions : this.state.sessions,
          actual_price : this.state.petData.package_price,
          extra_price : this.state.add_cost,
          discount : this.state.discount,
          total_price : this.state.Total_month,
          petId : this.state.petData.petId,
          spmorning : this.state.sp_time0,
          spafternoon : this.state.sp_time1,
          spevening : this.state.sp_time2,
        }
        console.log(obj);
        Services.getInstance().submitQuote(obj).then((result)=>{
          if(result.status === true){
            this.setState({
              loading : false
            })
            document.getElementById("success-pop").style.display = "block";
          //  this.props.history.push({
          //   pathname : "/successPage"
          //  })
          }
          else{
            this.setState({
              loading : false
            })
          }
          
        })
      }
    

  }



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






  

    goBack=()=>{
      this.props.history.push({
        pathname : "/home"
      })
    }


  render() {
    return (
      <div id="wrapper">

      <div class="srvc-dtls">
        
        <div class="srvc-dtls-hd">
       
          <h4>Walking <br/>Service Details</h4>
          <div class="srvc-dtls-bck" onClick={this.goBack}>
            <img src="srvc-dtls-bck-icon.png" />
          </div>
        </div>


        <div class="srvc-dtls-main">
          
          <div class="srvc-dtls-adnt">
            
            <div class="srvc-dtls-item">
              <div class="srvc-dtls-item-lft">
                <div class="srvc-dtls-pet-img">
                  <img src="srvc-dlts-img1.png" />
                </div>
                <h6>Pet Name</h6>
              </div>
              <div class="srvc-dtls-item-rht">
                <h5>{this.state.petData.pet_name}</h5>
              </div>
            </div>

            <div class="srvc-dtls-item">
              <div class="srvc-dtls-item-lft">
                <div class="srvc-dtls-pet-img">
                  <img src="srvc-dlts-img2.png" />
                </div>
                <h6>Pet Age</h6>
              </div>
              <div class="srvc-dtls-item-rht">
                <span>{this.convertToYears(this.state.petData.pet_age)}</span>
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
            <div class="srvc-dtls-item">
              <div class="srvc-dtls-item-lft">
                <div class="srvc-dtls-pet-img">
                  <img src="srvc-dlts-img4.png" />
                </div>
                <h6>Temperament</h6>
              </div>
              <div class="srvc-dtls-item-rht">
                <span>{this.state.petData.pet_temperament}</span>
              </div>
            </div>
            {this.state.petData.day_type == "" ? "" :
            <div class="srvc-dtls-item">
              <div class="srvc-dtls-item-lft">
                <div class="srvc-dtls-pet-img">
                  <img src="srvc-dlts-img3.png" />
                </div>
                <h6>Service Days</h6>
              </div>
              <div class="srvc-dtls-item-rht">
                <span>{this.state.petData.day_type}</span>
              </div>
            </div>
            }
            <div class="srvc-dtls-item">
              <div class="srvc-dtls-item-lft">
                <div class="srvc-dtls-pet-img">
                  <img src="srvc-dlts-img5.png" />
                </div>
                <h6>Start Date</h6>
              </div>
              <div class="srvc-dtls-item-rht">
                <span>{this.state.petData.from_date}</span>
                <center>to</center>
                <span>{this.state.petData.to_date}</span>
              </div>
            </div>
            <div class="srvc-dtls-item tm">
              <div class="srvc-dtls-item-lft">
                <div class="srvc-dtls-pet-img">
                  <img src="srvc-dlts-img6.png" />
                </div>
                <h6>Select Preferable Time</h6>
              </div>
            </div>

            <div class="e-time">
                <div class="p-time">                    
                  <div class="p-time-hd hd">
                    <p></p>
                    <p>Client Preffered</p>
                    <p>Your Preference</p>
                  </div>
{this.state.petData.timings && this.state.petData.timings.length > 0 ? this.state.petData.timings.map((tym,index)=>{
                  return(
                    <div>
{tym.time >= "05:00" && tym.time < "12:00" ?
                        <div class="p-time-hd">
                        <p>Time</p>
                        <p className='c-p'>
                        {new Date('1970-01-01T' + (tym.time) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}
                        </p>
                          <div class="trng-adons">
                            <div class="ad-ons-cst">
                              {/* <input
                                type="time" 
                                name={"sp_time"+index}
                                onChange={this.handleChange} 
                                placeholder="Ex. 08:30"
                                min="06:00" max="11:59" pattern="(09|1[0-5]):[0-5]\d"
                                /> */}
                                <select name={"sp_time0"} onChange={this.handleChange}>
                                  <option value="">Select Time</option>
                                  <option value="05:00">5:00 AM</option>
                                  <option value="05:30">5:30 AM</option>
                                  <option value="06:00">6:00 AM</option>
                                  <option value="06:30">6:30 AM</option>
                                  <option value="07:00">7:00 AM</option>
                                  <option value="07:30">7:30 AM</option>
                                  <option value="08:00">8:00 AM</option>
                                  <option value="08:30">8:30 AM</option>
                                  <option value="09:00">9:00 AM</option>
                                  <option value="09:30">9:30 AM</option>
                                  <option value="10:00">10:00 AM</option>
                                  <option value="10:30">10:30 AM</option>
                                  <option value="11:00">11:00 AM</option>
                                  <option value="11:30">11:30 AM</option>
                                </select>
                            </div>
                            {/* <small>AM</small> */}
                          </div>
                        </div>

                      :

  tym.time >= "12:00" && tym.time < "17:00" ?
                      <div class="p-time-hd">
                      <p>Time</p>
                      <p class="c-p">
                        {new Date('1970-01-01T' + (tym.time) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}
                      </p>
                        <div class="trng-adons">
                          <div class="ad-ons-cst">
                            {/* <input 
                              type="time" 
                              name={"sp_time"+index}
                              onChange={this.handleChange}
                              min="12:00" max="17:00" pattern="(09|1[0-5]):[0-5]\d"
                              placeholder="Ex. 16:30" 
                              /> */}
                            <select name={"sp_time1"} onChange={this.handleChange}>
                              <option value="">Select Time</option>
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
                          {/* <small>PM</small> */}
                        </div>
                    </div> 
:
                      <div class="p-time-hd">
                      <p>Time</p>
                      <p class="c-p">
                        {new Date('1970-01-01T' + (tym.time) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}
                      </p>
                        <div class="trng-adons">
                          <div class="ad-ons-cst">
                            {/* <input 
                              type="time" 
                              name={"sp_time"+index}
                              onChange={this.handleChange}
                              min="17:00" max="22:00" pattern="(09|1[0-5]):[0-5]\d"
                              placeholder="Ex. 16:30" 
                              /> */}
                              <select name={"sp_time2"} onChange={this.handleChange}>
                                <option value="">Select Time</option>
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
                          {/* <small>PM</small> */}
                        </div>
                    </div>

  }
                    </div>
                    
                  )
                }): ""}


                </div>
              </div>
             
          {this.state.petData.message == "" ? "" : 
            <div class="ad-note">
              <h4>Additional Notes</h4>
              <p>{this.state.petData.message}</p>
            </div>
          }

          </div>


          <div class="srvc-dtls-pckg"  style={{display : "none"}} id="month">
            
            <div class="srvc-dtls-item pckg">
              <div class="srvc-dtls-item-lft">
                <div class="srvc-dtls-pet-img">
                  <img src="star-icon.png" />
                </div>
                <h6>Package</h6>
              </div>
            </div>

            <div class="srvc-pckg-main">
              <div class="srvc-dtls-rg">
                <div class="per_day_lft per_mnth">
                  <div class="srvc-dtls-rg-lft s-r">
                    <div class="srvc-dtls-rg-img">
                      <img src="tick-icon-g.png" />
                    </div>
                    <span>{this.state.petData.package_name}</span>
                  </div>
                  <div class="srvc-dtls-rg-lft s-r">
                    <div class="srvc-dtls-rg-img">
                      <img src="tick-icon-g.png" />
                    </div>
                    <span>Walks : {this.state.petData.day_walks}</span>
                  </div>
                </div>
                <div class="per_day_rht stripgn">
                  <div class="srvc-dtls-rg-rht">
                    <h5>{this.state.petData.package_price}/-</h5>
                    <p>Per Walk</p>
                  </div>
                </div>
                {/* <div class="per_day_rht" style={{display : "none"}} id="perday">
                  <div class="trng-adons sesn">
                    <span>Cost</span>
                    <div class="ad-ons-cst">
                    <input class="ad-ons-cst"
                      placeholder="Add cost" 
                      name="add_cost" 
                      type="number"
                      onChange={this.handleChange}
                      autofocus
                      />
                      <p>Per Month</p>
                    </div>
                  </div>
                </div> */}

                
              </div>

              <div class="srvc-dtls-gm-list per_day_pkg">
                {/* <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>24 Day / Month</span>
                </div> */}
                {/* <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>Booking Guarantee</span>
                </div> */}
                <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>Each Walk Duration:30min</span>
                </div>
                <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>Live Tracking</span>
                </div>
                {/* <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>Assured Service</span>
                </div> */}
              </div>


              <div class="org-cst">
                <h5>Total Package Cost</h5>
                <span>{this.state.original_cost_month}</span>
              </div>

              <div class="org-cst">
                <h5>Total Service Days</h5>
                <span>{days_difference}</span>
              </div>

              <div class="srvc-dsct">
              <h5>Do you want to offer a discount?</h5>
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
                  {this.state.discount == "" ? <span>{this.state.original_cost_month}</span> : 
                  <span>{this.state.Total_month}</span>
                  }
                </div>
                <div class="org-cst bd">
                  <h5>Platform Charges (10%)</h5>
                  <span>(-) {this.state.platform_fee_per_month}</span>
                </div>
            </div>

            <div class="srvc-pckg-tc">
              <h5>Your Receivable Amount</h5>
              <div class="tc-d">
              {this.state.discount == "" ? <span>{(Number(this.state.original_cost_month)) - (Number(this.state.platform_fee_per_month))}</span> :
                <span>{(this.state.Total_month - this.state.platform_fee_per_month).toFixed(2)}</span> }
              </div>
            </div>

          </div>

          <div class="srvc-dtls-pckg"  style={{display : "none"}} id="perday">
            
            <div class="srvc-dtls-item pckg">
              <div class="srvc-dtls-item-lft">
                <div class="srvc-dtls-pet-img">
                  <img src="star-icon.png" />
                </div>
                <h6>Package</h6>
                
              </div>
            </div>

            <div class="srvc-pckg-main">
              <div class="srvc-dtls-rg">
                <div class="per_day_lft per_mnth">
                  <div class="srvc-dtls-rg-lft s-r">
                    <div class="srvc-dtls-rg-img">
                      <img src="tick-icon-g.png" />
                    </div>
                    <span>{this.state.petData.package_name}</span>
                  </div>
                  <div class="srvc-dtls-rg-lft s-r">
                    <div class="srvc-dtls-rg-img">
                      <img src="tick-icon-r.png" />
                    </div>
                    <span>Walks : {this.state.petData.day_walks}</span>
                  </div>
                </div>
                {/* <div class="per_day_rht">
                  <div class="srvc-dtls-rg-rht">
                    <h5>{this.state.petData.package_price}/-</h5>
                    <p>Per Walk</p>
                  </div>
                </div> */}
                <div class="per_day_rht cst-src" >
                  <div class="trng-adons sesn">
                    <span>Cost per walk</span>
                    <div class="ad-ons-cst">
                    <input class="ad-ons-cst"
                      placeholder="Add cost" 
                      name="add_cost" 
                      type="number"
                      onChange={this.handleChange}
                      autofocus
                      />
                      {/* <p>Per Month</p> */}
                    </div>
                  </div>
                </div>

                
              </div>

              <div class="srvc-dtls-gm-list per_day_pkg">
                {/* <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>24 Day / Month</span>
                </div> */}
                {/* <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>Booking Guarantee</span>
                </div> */}
                <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>Each Walk Duration:30min</span>
                </div>
                <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>Live Tracking</span>
                </div>
                {/* <div class="srvc-dtls-gm-item">
                  <img src="tick-icon-r.png" />
                  <span>Assured Service</span>
                </div> */}
              </div>


              <div class="org-cst">
                <h5>Total Package Cost</h5>
                <span>{this.state.original_cost_perday}</span>
              </div>

              <div class="org-cst">
                <h5>Total Service Days</h5>
                <span>{days_difference}</span>
              </div>

             
              <div class="srvc-dsct">
                <h5>Do you want to offer a discount?<small>(Discounts can help in winning the job)</small></h5>
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
                  {this.state.discount == "" ? <span>{this.state.original_cost_perday}</span> : 
                  <span>{this.state.Total_perday}</span>
                  }
              </div>
              <div class="org-cst bd">
                  <h5>Platform Charges (10%)</h5>
                  <span>(-) {this.state.platform_fee_per_day}</span>
              </div>
            </div>

            <div class="srvc-pckg-tc">
              <h5>Your Receivable amount</h5>
              <div class="tc-d">
                {this.state.discount == "" ? <span>{(Number(this.state.original_cost_perday)) - (Number(this.state.platform_fee_per_day))}</span> : 
                <span>{(this.state.Total_perday - this.state.platform_fee_per_day).toFixed(2)}</span>
                }
              </div>
            </div>

          </div>

          <p style={{margin: '10px', color: 'red'}}>{this.state.err_msg}</p>

          <div class="srvc-btn">
            <button onClick={this.SubmitQuote}>Submit</button>
          </div>

        </div>
        


      </div>
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

export default WalkingQuoteReceived