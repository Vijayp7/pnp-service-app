import React, { Component } from 'react'
import './WalkingQuote.css'
import Services from '../Services/Services'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SuccessPage from '../Entry-Screens/SuccessPage';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from '../Entry-Screens/DarkBackground';

const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));
let days_difference;
export class WalkingQuoteEdit extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    quoteObj: this.props.location.proposalData,
    petData: {},
    timings: [],
    packageName: "",
    difference: "",
    add_cost: 0,
    discount: 0,
    Total_month: 0,
    Total_perday: 0,
    package_price: 0,
    sessions: 0,
    original_cost_month: 0,
    original_cost_perday: 0,
    tabIndex: 0,
    err_msg: "",
    sp_time0: "",
    sp_time1: "",
    sp_time2: "",
    platform_fee_per_day: 0,
    platform_fee_per_month: 0,
    device_token: "",
    loading: false
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }, () =>
      this.setState({
        original_cost_month: ((Number(this.state.petData.package_price)) * (Number(this.state.petData.day_walks)) * (Number(this.state.difference))),
        original_cost_perday: ((Number(this.state.petData.day_walks)) * (Number(this.state.add_cost)) * (Number(this.state.difference))),

        Total_month: ((
          (Number(this.state.petData.package_price)) *
          (Number(this.state.petData.day_walks)) *
          (Number(this.state.difference))) -
          ((((Number(this.state.petData.package_price)) * (Number(this.state.petData.day_walks)) * (Number(this.state.difference)))) * (this.state.discount) / 100)),
        Total_perday: (((Number(this.state.petData.day_walks)) * (Number(this.state.add_cost)) * (Number(this.state.difference))) - ((((Number(this.state.petData.day_walks)) * (Number(this.state.add_cost)) * (Number(this.state.difference)))) * (this.state.discount) / 100))
      }, () => {
        this.setState({
          platform_fee_per_day: (((this.state.Total_perday) * 10) / 100),
          platform_fee_per_month: (((this.state.Total_month) * 10) / 100)
        })
      }));
  };

  componentDidMount = () => {
    if(navigator.onLine){
      this.setState({
        loading: true
      })
      const obj = {
        spId: user.id,
        service_id: this.state.quoteObj.service_id,
        booking_id: this.state.quoteObj.booking_id,
      }
      Services.getInstance().EditProposal(obj).then((result) => {
        if (result.status === true) {
          this.setState({
            petData: result.results,
            packageName: result.results.package_name,
            add_cost: result.results.actual_price,
            discount: result.results.discount,
            Total_perday: result.results.total_price,
            sp_time0: result.results.sp_morning,
            sp_time1: result.results.sp_afternoon,
            sp_time2: result.results.sp_evening,
            device_token: result.results.device_token,
            loading: false
          }, () => {
            let from_date = new Date(result.results.from_date);
            let to_date = new Date(result.results.to_date);
            let date_diff = to_date.getTime() - from_date.getTime();
            days_difference = (date_diff / (1000 * 60 * 60 * 24)) + 1;

            if (result.results.day_type == "Mon-Sat") {
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
              days_difference = ((date_diff / (1000 * 60 * 60 * 24)) + 1) - weekendDays
              this.setState({
                difference: days_difference,
                original_cost_month: (Number(this.state.petData.package_price)) * (Number(this.state.petData.day_walks)) * (Number(days_difference)),
                original_cost_perday: (Number(this.state.petData.day_walks)) * (Number(this.state.add_cost)) * (Number(days_difference)),
                Total_month: ((
                  (Number(this.state.petData.package_price)) *
                  (Number(this.state.petData.day_walks)) *
                  (Number(days_difference))) -
                  ((((Number(this.state.petData.package_price)) * (Number(this.state.petData.day_walks)) * (Number(days_difference)))) * (this.state.discount) / 100)),
                Total_perday: (((Number(this.state.petData.day_walks)) * (Number(this.state.add_cost)) * (Number(days_difference))) - ((((Number(this.state.petData.day_walks)) * (Number(this.state.add_cost)) * (Number(days_difference)))) * (this.state.discount) / 100))
              }, () => {
                this.setState({
                  platform_fee_per_day: (((this.state.Total_perday) * 10) / 100),
                  platform_fee_per_month: (((this.state.Total_month) * 10) / 100),
                  
                })
              })

            }
            else {
              console.log(days_difference);
              console.log(this.state.petData);
              this.setState({
                difference: days_difference,
                original_cost_month: (Number(this.state.petData.package_price)) * (Number(this.state.petData.day_walks)) * (Number(days_difference)),
                original_cost_perday: (Number(this.state.petData.day_walks)) * (Number(this.state.add_cost)) * (Number(days_difference)),
                Total_month: ((
                  (Number(this.state.petData.package_price)) *
                  (Number(this.state.petData.day_walks)) *
                  (Number(days_difference))) -
                  ((((Number(this.state.petData.package_price)) * (Number(this.state.petData.day_walks)) * (Number(days_difference)))) * (this.state.discount) / 100)),
                Total_perday: (((Number(this.state.petData.day_walks)) * (Number(this.state.add_cost)) * (Number(days_difference))) - ((((Number(this.state.petData.day_walks)) * (Number(this.state.add_cost)) * (Number(days_difference)))) * (this.state.discount) / 100))
              }, () => {
                console.log(this.state.original_cost_month)
                console.log(this.state.original_cost_perday)
                this.setState({
                  platform_fee_per_day: (((this.state.Total_perday) * 10) / 100),
                  platform_fee_per_month: (((this.state.Total_month) * 10) / 100),
                  
                })
              })

            }
          })
        }
        else {
          this.setState({
            loading: false,
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




  getDates(sp_date) {
    const date1 = new Date(sp_date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays == 1) {
      return "Today";
    }
    else if (diffDays > 1 && diffDays <= 2) {
      return "Yesterday"
    }
    else if (diffDays < 30) {
      return diffDays + " days ago";
    }
    else if (diffDays > 30) {
      return "1 month ago"
    }
    else if (diffDays > 60) {
      return "2 months ago"
    }
    else if (diffDays > 180) {
      return "6 months ago"
    }
    else if (diffDays > 365) {
      return "1 year ago"
    }
  }

  showJobDetails = () => {
    this.setState({
      tabIndex: 1
    })
  }




  SubmitQuote = () => {
    this.setState({
      loading: true,
    })
    if (this.state.packageName == "Per Day Package") {
      if (this.state.add_cost == "") {
        this.setState({
          err_msg: "Please enter the service cost",
          loading: false
        })
      }
      if((Number(this.state.add_cost)) < 96 || (Number(this.state.add_cost)) > 175){
        this.setState({
          err_msg : "Service cost cannot be less than 96 and more than Rs. 175",
          loading : false
        })
      }
      else {
        const obj = {
          service_id: this.state.quoteObj.service_id,
          service_provider: user.id,
          booking_id: this.state.quoteObj.booking_id,
          sessions: this.state.sessions,
          actual_price: this.state.add_cost,
          extra_price: "0",
          discount: this.state.discount,
          total_price: this.state.Total_perday,
          petId: this.state.petData.petId,
          action: "update",
          spmorning: this.state.sp_time0,
          spafternoon: this.state.sp_time1,
          spevening: this.state.sp_time2
        }
        Services.getInstance().submitQuote(obj).then((result) => {
          if (result.status === true) {
            this.setState({
              loading: false
            })
            document.getElementById("success-pop").style.display = "block";
            const obj1 = {
              notification: {
                title: "Petsfolio",
                body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Walking",
                sound: "default"
              },
              to: this.state.device_token
            }
            Services.getInstance().SendBookingNotificationToClient(obj1).then((result) => {
            })
          }
          else {
            this.setState({
              loading: false
            })
          }
        })
      }
    }
    else {
      const obj = {
        service_id: this.state.quoteObj.service_id,
        service_provider: user.id,
        booking_id: this.state.quoteObj.booking_id,
        sessions: this.state.sessions,
        actual_price: this.state.petData.package_price,
        extra_price: this.state.add_cost,
        discount: this.state.discount,
        total_price: this.state.Total_month,
        petId: this.state.petData.petId,
        action: "update",
        spmorning: this.state.sp_time0,
        spafternoon: this.state.sp_time1,
        spevening: this.state.sp_time2,
        
      }
      Services.getInstance().submitQuote(obj).then((result) => {
        if (result.status === true) {
          this.setState({
            loading: false
          })
          document.getElementById("success-pop").style.display = "block";
          const obj1 = {
            notification: {
              title: "Petsfolio",
              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Walking",
              sound: "default"
            },
            to: this.state.device_token
          }
          Services.getInstance().SendBookingNotificationToClient(obj1).then((result) => {
          })
        }
        else {
          this.setState({
            loading: false
          })
        }
      })
    }

  }



  convertToYears(d_dob) {
    var today = new Date();
    var birthDate = new Date(d_dob);
    var age = (Number(today.getFullYear()) - Number(birthDate.getFullYear()));
    if (age <= 0) {
      if ((today.getMonth() - birthDate.getMonth()) <= 0) {
        return "Below 1 Month"
      }
      else {
        return (today.getMonth() - birthDate.getMonth()) + " Months"
      }
    }
    else {
      return age + " years"
    }

  }


  goBack = () => {
    this.props.history.push({
      pathname: "/home"
    })
  }


  render() {
    return (
      <div id="wrapper">
        <div class="srvc-dtls">
          <div class="srvc-dtls-hd">
            <h4>Edit Quotation</h4>
            <div class="srvc-dtls-bck" onClick={this.goBack}>
              <img src="srvc-dtls-bck-icon.png" />
            </div>
          </div>
          <div class="srvc-dtls-main">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList>
                <Tab onClick={this.showAllBids}>All Bids ({this.state.quoteObj.others.length})</Tab>
                <Tab onClick={this.showJobDetails}>Job Details</Tab>
              </TabList>
              <TabPanel id="jb-tab1" >
                <div class="jb-tab-content" >
                  <div class="ab-cnt">
                    <div class="add-on-list">
                      <div class="n-ad-lft">
                        <div class="add-on-lft">
                          <img src={this.state.quoteObj.client_photo} />
                        </div>
                        <div class="add-on-rht">
                          <h4>{this.state.quoteObj.client_name}</h4>
                          <h5>{this.state.quoteObj.title}</h5>
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
                    {this.state.quoteObj.others && this.state.quoteObj.others.length > 0 ? this.state.quoteObj.others.map((others, index) => {
                      return (
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
                      {/* <div class="srvc-dtls-item-rht ctmng">
                      {this.state.petData.timings && this.state.petData.timings.length > 0 ? this.state.petData.timings.map((tym,index)=>{
                        return(
                          <span>{tym.time}</span>
                        )
                      }): ""}
                      
                      <div class="c-tmng">
                        <img src="edit-t-icon.png"/>
                        <input type="time" name="" placeholder="Upload A image"/>
                      </div>
                    </div> */}
                    </div>
                    <div class="e-time">
                      <div class="p-time">
                        <div class="p-time-hd hd">
                          <p></p>
                          <p>Client Preffered</p>
                          <p>Your Preference</p>
                        </div>
                        {this.state.petData.timings && this.state.petData.timings.length > 0 ? this.state.petData.timings.map((tym, index) => {
                          return (
                            <div >
                              {tym.time >= "05:00" && tym.time < "12:00" ?
                                <div class="p-time-hd" >
                                  <p>Time</p>
                                  <p class="c-p">
                                    {new Date('1970-01-01T' + (tym.time) + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })}
                                  </p>
                                  <div class="trng-adons">
                                    <div class="ad-ons-cst">
                                      <select name={"sp_time0"} onChange={this.handleChange}>
                                        <option value=''>Select Time</option>
                                        {this.state.petData.sp_morning == "05:00" ? <option value='05:00' selected>5:00 AM</option> : <option value='05:00'>6:00 AM</option>}
                                        {this.state.petData.sp_morning == "05:30" ? <option value='05:30' selected>5:30 AM</option> : <option value='05:30'>6:30 AM</option>}
                                        {this.state.petData.sp_morning == "06:00" ? <option value='06:00' selected>6:00 AM</option> : <option value='06:00'>6:00 AM</option>}
                                        {this.state.petData.sp_morning == "06:30" ? <option value='06:30' selected>6:30 AM</option> : <option value='06:30'>6:30 AM</option>}
                                        {this.state.petData.sp_morning == "07:00" ? <option value='07:00' selected>7:00 AM</option> : <option value='07:00'>7:00 AM</option>}
                                        {this.state.petData.sp_morning == "07:30" ? <option value='07:30' selected>7:30 AM</option> : <option value='07:30'>7:30 AM</option>}
                                        {this.state.petData.sp_morning == "08:00" ? <option value='08:00' selected>8:00 AM</option> : <option value='08:00'>8:00 AM</option>}
                                        {this.state.petData.sp_morning == "08:30" ? <option value='08:30' selected>8:30 AM</option> : <option value='08:30'>8:30 AM</option>}
                                        {this.state.petData.sp_morning == "09:00" ? <option value='09:00' selected>9:00 AM</option> : <option value='09:00'>9:00 AM</option>}
                                        {this.state.petData.sp_morning == "09:30" ? <option value='09:30' selected>9:30 AM</option> : <option value='09:30'>9:30 AM</option>}
                                        {this.state.petData.sp_morning == "10:00" ? <option value='10:00' selected>10:00 AM</option> : <option value='10:00'>10:00 AM</option>}
                                        {this.state.petData.sp_morning == "10:30" ? <option value='10:30' selected>10:30 AM</option> : <option value='10:30'>10:30 AM</option>}
                                        {this.state.petData.sp_morning == "11:00" ? <option value='11:00' selected>11:00 AM</option> : <option value='11:00'>11:00 AM</option>}
                                        {this.state.petData.sp_morning == "11:30" ? <option value='11:30' selected>11:30 AM</option> : <option value='11:30'>11:30 AM</option>}
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                :

                                tym.time >= "12:00" && tym.time < "17:00" ?
                                  <div class="p-time-hd">
                                    <p>Time</p>
                                    <p class="c-p">
                                      {new Date('1970-01-01T' + (tym.time) + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })}
                                    </p>
                                    <div class="trng-adons">
                                      <div class="ad-ons-cst">
                                        <select name={"sp_time1"} onChange={this.handleChange}>
                                          <option value=''>Select Time</option>
                                          {this.state.petData.sp_afternoon == "12:00" ? <option value='12:00' selected>12:00 PM</option> : <option value='12:00'>12:00 PM</option>}
                                          {this.state.petData.sp_afternoon == "12:30" ? <option value='12:30' selected>12:30 PM</option> : <option value='12:30'>12:30 PM</option>}
                                          {this.state.petData.sp_afternoon == "13:00" ? <option value='13:00' selected>1:00 PM</option> : <option value='13:00'>1:00 PM</option>}
                                          {this.state.petData.sp_afternoon == "13:30" ? <option value='13:30' selected>1:30 PM</option> : <option value='13:30'>1:30 PM</option>}
                                          {this.state.petData.sp_afternoon == "14:00" ? <option value='14:00' selected>2:00 PM</option> : <option value='14:00'>2:00 PM</option>}
                                          {this.state.petData.sp_afternoon == "14:30" ? <option value='14:30' selected>2:30 PM</option> : <option value='14:30'>2:30 PM</option>}
                                          {this.state.petData.sp_afternoon == "15:00" ? <option value='15:00' selected>3:00 PM</option> : <option value='15:00'>3:00 PM</option>}
                                          {this.state.petData.sp_afternoon == "15:30" ? <option value='15:30' selected>3:30 PM</option> : <option value='15:30'>3:30 PM</option>}
                                          {this.state.petData.sp_afternoon == "16:00" ? <option value='16:00' selected>4:00 PM</option> : <option value='15:00'>4:00 PM</option>}
                                          {this.state.petData.sp_afternoon == "16:30" ? <option value='16:30' selected>4:30 PM</option> : <option value='15:30'>4:30 PM</option>}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  :
                                  <div class="p-time-hd">
                                    <p>Time</p>
                                    <p class="c-p">
                                      {new Date('1970-01-01T' + (tym.time) + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })}
                                    </p>
                                    <div class="trng-adons">
                                      <div class="ad-ons-cst">
                                        <select name={"sp_time2"} onChange={this.handleChange}>
                                          <option value=''>Select Time</option>
                                          {this.state.petData.sp_evening == "17:00" ? <option value='17:00' selected>5:00 PM</option> : <option value='17:00'>5:00 PM</option>}
                                          {this.state.petData.sp_evening == "17:30" ? <option value='17:30' selected>5:30 PM</option> : <option value='17:30'>5:30 PM</option>}
                                          {this.state.petData.sp_evening == "18:00" ? <option value='18:00' selected>6:00 PM</option> : <option value='18:00'>6:00 PM</option>}
                                          {this.state.petData.sp_evening == "18:30" ? <option value='18:30' selected>6:30 PM</option> : <option value='18:30'>6:30 PM</option>}
                                          {this.state.petData.sp_evening == "19:00" ? <option value='19:00' selected>7:00 PM</option> : <option value='19:00'>7:00 PM</option>}
                                          {this.state.petData.sp_evening == "19:30" ? <option value='19:30' selected>7:30 PM</option> : <option value='19:30'>7:30 PM</option>}
                                          {this.state.petData.sp_evening == "20:00" ? <option value='20:00' selected>8:00 PM</option> : <option value='20:00'>8:00 PM</option>}
                                          {this.state.petData.sp_evening == "20:30" ? <option value='20:30' selected>8:30 PM</option> : <option value='20:30'>8:30 PM</option>}
                                          {this.state.petData.sp_evening == "21:00" ? <option value='21:00' selected>9:00 PM</option> : <option value='21:00'>9:00 PM</option>}
                                          {/* {this.state.petData.sp_evening == "21:30" ? <option value='21:30' selected>9:30 PM</option> : <option value='21:30'>9:30 PM</option>} */}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                              }
                            </div>

                          )
                        }) : ""}


                      </div>
                    </div>
                  {this.state.petData.message == "" ? "" : 
                    <div class="ad-note">
                      <h4>Additional Notes</h4>
                      <p>{this.state.petData.message}</p>
                    </div>
                  }
                  </div>

                  {this.state.packageName == "Per Day Package" ?
                    <div class="srvc-dtls-pckg" style={{ display: "block" }} id="perday">

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
                                  value={this.state.add_cost}
                                  onChange={this.handleChange}
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

                        <div class="srvc-dsct">
                          <h5>Do you want to offer a discount?</h5>
                          <select onChange={this.handleChange} name="discount">
                            {this.state.discount == "0" ? <option value="0" selected>0%</option> : <option value="0">0%</option>}
                            {this.state.discount == "5" ? <option value="5" selected>5%</option> : <option value="5">5%</option>}
                            {this.state.discount == "10" ? <option value="10" selected>10%</option> : <option value="10">10%</option>}
                            {this.state.discount == "15" ? <option value="15" selected>15%</option> : <option value="15">15%</option>}
                            {this.state.discount == "20" ? <option value="20" selected>20%</option> : <option value="20">20%</option>}
                            {this.state.discount == "25" ? <option value="25" selected>25%</option> : <option value="25">25%</option>}
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
                            <span>{((Number(this.state.Total_perday)) - (Number(this.state.platform_fee_per_day))).toFixed(2)}</span>
                          }
                        </div>
                      </div>

                    </div>


                    :

                    <div class="srvc-dtls-pckg" style={{ display: "block" }} id="month">

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
                          <div class="per_day_rht stripgn">
                            <div class="srvc-dtls-rg-rht">
                              <h5>{this.state.petData.package_price}/-</h5>
                              <p>Per Walk</p>
                            </div>
                          </div>

                        </div>

                        <div class="srvc-dtls-gm-list per_day_pkg">
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

                        <div class="srvc-dsct">
                          <h5>Do you want to offer a discount?</h5>

                          <select onChange={this.handleChange} name="discount">
                            {this.state.discount == "0" ? <option value="0" selected>0%</option> : <option value="0">0%</option>}
                            {this.state.discount == "5" ? <option value="5" selected>5%</option> : <option value="5">5%</option>}
                            {this.state.discount == "10" ? <option value="10" selected>10%</option> : <option value="10">10%</option>}
                            {this.state.discount == "15" ? <option value="15" selected>15%</option> : <option value="15">15%</option>}
                            {this.state.discount == "20" ? <option value="20" selected>20%</option> : <option value="20">20%</option>}
                            {this.state.discount == "25" ? <option value="25" selected>25%</option> : <option value="25">25%</option>}
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
                            <span>{((Number(this.state.Total_month)) - (Number(this.state.platform_fee_per_month))).toFixed(2)}</span>}
                        </div>
                      </div>

                    </div>
                  }






                  <p style={{ margin: '10px', color: 'red' }}>{this.state.err_msg}</p>
                  <div class="srvc-btn">
                    <button onClick={this.SubmitQuote}>Re-Submit</button>
                  </div>
                </div>
              </TabPanel>
            </Tabs>




          </div>



        </div>
        <div id="success-pop" style={{ display: "none" }}>
          <SuccessPage />
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

export default WalkingQuoteEdit