import React, { Component } from 'react'
import '../GroomingModule/ReceivedQuote.css'
import Services from '../Services/Services';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SuccessPage from '../Entry-Screens/SuccessPage';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from '../Entry-Screens/DarkBackground';


const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));
let days_difference;
export class BoardQuoteEdit extends Component {
    constructor(props){
        super(props);
    }
    state = {
      quoteObj : this.props.location.proposalData,
      petData : {},
      general_addons : [],
      extra_addons : [],
      add_cost : "",
      discount : 0,
      Total:0,
      package_price :0,
      sessions : 0,
      tabIndex : 0,
      err_msg : "",
      sp_time : "",
      platform_fee : 0, 
      device_token:"",
      loading : false,
    }
   
    handleChange=e=>{
      const{name,value}=e.target;
      this.setState({
          [name]:value
      },()=>{
        console.log(this.state)
          this.setState({
            Total : ((((Number(this.state.petData.package_price) * days_difference)+Number(this.state.add_cost)) - ((((Number(this.state.petData.package_price) * days_difference)+Number(this.state.add_cost)) * this.state.discount)/100)))
          },()=>{
            this.setState({
              platform_fee : ((((this.state.Total)*10)/100).toFixed(2))
            })
          })
          
      });  
    };


    convertToYears (d_dob){
      var today = new Date();
      var birthDate = new Date(d_dob);
      var age = (today.getFullYear() - birthDate.getFullYear());
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

    goBack = () =>{
        this.props.history.push({
            pathname : "/home"
        })
    }


      componentDidMount = () =>{
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
            let from_date = new Date(result.results.from_date); 
            let to_date = new Date(result.results.to_date); 
            let date_diff = to_date.getTime() - from_date.getTime();
            days_difference = (date_diff / (1000 * 60 * 60 * 24))+1;
            this.setState({
              petData : result.results, 
              package_price : result.results.package_price,
              Total : result.results.total_price,
              add_cost : result.results.extra_price,
              discount :  result.results.discount,
              sp_time1 : result.results.booking_time,
              sp_time : result.results.spmorning,
              device_token:result.results.device_token,
              loading : false
            },()=>{
              this.setState({
                platform_fee : ((((this.state.Total)*10)/100).toFixed(2))
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


      showAllBids = () =>{
        // document.getElementById("jb-tab1").style.display = "block";
        // document.getElementById("jb-tab2").style.display = "none"
      }

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






      SubmitQuote=()=>{
        this.setState({
          loading : true
        })
        if(this.state.add_cost == "" && this.state.petData.general_addons.length > 0){
          this.setState({
            err_msg : "Please enter the Add-on service cost",
            loading : false,
          })
        }
        else{
        const obj={
          service_id : this.state.quoteObj.service_id,
          service_provider : user.id,
          booking_id : this.state.quoteObj.booking_id,
          sessions : this.state.sessions,
          actual_price : Number(this.state.package_price) * days_difference,
          extra_price : this.state.add_cost,
          discount : this.state.discount,
          total_price : this.state.Total,
          petId : this.state.petData.petId,
          action : "update",
          spmorning : "",
          spevening : '',
          spafternoon : ''
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
              body: user.first_name + user.last_name + " Has Edited Their Proposal For Dog Boarding",
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
                            {this.state.quoteObj.others && this.state.quoteObj.others.length >= 1 ? this.state.quoteObj.others.map((others,index)=>{
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
              <TabPanel id="jb-tab2">
                  <div  >
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

                    <div class="ad-note">
                      <h4>Additional Notes</h4>  
                      <p>{this.state.petData.message}</p>
                    </div>
        
                  </div>
                  <div class="srvc-dtls-pckg">
                    
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
                        <div class="srvc-dtls-rg-lft">
                          <div class="srvc-dtls-rg-img">
                            <img src="tick-icon-g.png" />
                          </div>
                          <span>{this.state.petData.package_name} Charges</span>
                        </div>
                        <div class="srvc-dtls-rg-rht">
                          <h5>{this.state.petData.package_price} /-</h5>
                        </div>
                      </div>

        {this.state.petData.general_addons && this.state.petData.general_addons.length > 0 ?
                    <div>
                      <div class="srvc-ad-ons">
                        <h5>Add-Ons</h5>
                        
                      </div>
        
        
                      <div class="srvc-dtls-gm-list bint">
                      {this.state.petData.general_addons && this.state.petData.general_addons.length > 0 ? this.state.petData.general_addons.map((gen_adon,index)=>{
                        return(
                          <div class="srvc-dtls-gm-item">
                          <img src="tick-icon-r.png" />
                          <span>{gen_adon.name}</span>
                        </div>
                        )
                      }) : " "}
                      <input class="ad-ons-cst"
                          placeholder='Add cost'
                          name='add_cost'
                          value={this.state.add_cost}
                          type="number"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    : "" }
        
                      <div class="org-cst">
                        <h5>Original Cost</h5>
                        <span>{(Number(this.state.petData.package_price) * days_difference)+Number(this.state.add_cost)}</span>
                      </div>
        
                      <div class="srvc-dsct">
                      <h5>Do you want to offer a discount?
                                <small>(Discounts can help in winning the job)</small>
                        </h5>
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
                          <span>{this.state.Total}</span>
                        </div>
                        <div class="org-cst bd">
                          <h5>Platform Charges(10%)</h5>
                          <span>(-) {this.state.platform_fee}</span>
                        </div>
                      </div>
                      <div class="rc-amnt">
                        <h5>Your Receivable Amount</h5>
                        <span>{(this.state.Total - this.state.platform_fee).toFixed(2)}</span>
                      </div>
        
                    {/* <div class="srvc-pckg-tc">
                      <h5>Total Cost</h5>
                      <div class="tc-d">
                        <del>{Number(this.state.petData.package_price)+Number(this.state.add_cost)}</del>
                        <span>{this.state.Total}</span>
                      </div>
                    </div> */}
                  </div>
        
                  <p style={{margin: '10px', color: 'red'}}>{this.state.err_msg}</p>
                  <div class="srvc-btn">
                    <button onClick={this.SubmitQuote}>Re-Submit</button>
                  </div>
                  </div>
              </TabPanel>
            </Tabs>






















  
          </div>

  
  
        </div>
  
        <div id="success-pop" style={{display : "none"}}>
          <SuccessPage />
        </div>
  
  
      </div>
    )
  }
}

export default BoardQuoteEdit