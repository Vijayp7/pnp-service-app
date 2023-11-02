import React, { Component } from 'react'
import '../GroomingModule/ReceivedQuote.css'
import Services from '../Services/Services';
import SuccessPage from '../Entry-Screens/SuccessPage';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from '../Entry-Screens/DarkBackground';

const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));
let days_difference;
export class BoardingQuoteReceived extends Component {
    constructor(props){
        super(props);
    }
    state = {
      quoteObj : this.props.location.quoteObj,
      petData : {},
      general_addons : [],
      extra_addons : [],
      add_cost : "",
      discount : 0,
      Total:0,
      package_price :0,
      sessions : 0,
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
          this.setState({
            Total : ((((Number(this.state.petData.package_price) * days_difference)+Number(this.state.add_cost)) - ((((Number(this.state.petData.package_price) * days_difference)+Number(this.state.add_cost)) * this.state.discount)/100)))
          },()=>{
            this.setState({
              platform_fee : (((this.state.Total)*10)/100)
            })
          })
          
      });
      // console.log(this.state);  
    };

    
    
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
          service_id : this.state.quoteObj.service_id,
          booking_id : this.state.quoteObj.booking_id,
        }
        console.log(obj);
        Services.getInstance().quoteForm(obj).then((result)=>{
          
          if(result.status === true){
            let from_date = new Date(result.results.from_date); 
            let to_date = new Date(result.results.to_date); 
            let date_diff = to_date.getTime() - from_date.getTime();
            days_difference = (date_diff / (1000 * 60 * 60 * 24))+1;

            this.setState({
              petData : result.results, 
              package_price : result.results.package_price,
              Total : Number(result.results.package_price) *days_difference,
              device_token : result.results.device_token,
              loading : false
            },()=>{
              this.setState({
                platform_fee : (((this.state.Total)*10)/100).toFixed(2)
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
          loading : true
        })
        if(this.state.add_cost == "" && this.state.petData.general_addons.length > 0){
          this.setState({
            err_msg : "Please enter the service cost",
            loading : false
          })
        }
        else{
        const obj={
          service_id : JSON.stringify(this.state.quoteObj.service_id),
          service_provider : user.id,
          booking_id : this.state.quoteObj.booking_id,
          sessions : this.state.sessions,
          actual_price : (Number(this.state.package_price)) * days_difference,
          extra_price : this.state.add_cost,
          discount : this.state.discount,
          total_price : this.state.Total,
          petId : this.state.petData.petId,
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
              body: "Received A Quotation From " + user.first_name + user.last_name + " For Dog Boarding",
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
         
            <h4>Boarding <br/> Service Details</h4>
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
              {/* <div class="srvc-dtls-item">
                <div class="srvc-dtls-item-lft">
                  <div class="srvc-dtls-pet-img">
                    <img src="srvc-dlts-img6.png" />
                  </div>
                  <h6>Select Preferable Time</h6>
                </div>
                <div class="srvc-dtls-item-rht ctmng">
                  {this.state.sp_time < "12:00" ? <span>{this.state.sp_time} A.M</span> : <span>{this.state.sp_time} P.M</span>}
                  <div class="c-tmng">
                    <img src="edit-t-icon.png" />
                    <input 
                      type="time" 
                      name="sp_time"
                      value={this.state.sp_time}
                      onChange={this.handleChange} 
                      placeholder="Upload A image" />
                  </div>
                </div>
              </div> */}

  
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
                    <span>{this.state.petData.package_name}</span>
                  </div>
                  <div class="srvc-dtls-rg-rht">
                    <h5>{(Number(this.state.petData.package_price))* days_difference} /-</h5>
                  </div>
                </div>
               
                {/* <div class="srvc-dtls-gm-list">
                {this.state.petData.general_addons && this.state.petData.general_addons.length > 0 ? this.state.petData.general_addons.map((gen_adon,index)=>{
                  return(
                    <div class="srvc-dtls-gm-item">
                    <img src="tick-icon-r.png" />
                    <span>{gen_adon.name}</span>
                  </div>
                  )
                }) : " "}
                </div> */}
  { this.state.petData.general_addons && this.state.petData.general_addons.length > 0 ?
                  <div>
                    <div class="srvc-ad-ons">
                      <h5>Add-Ons</h5>
                      {/* <input class="ad-ons-cst"
                        placeholder='Add cost'
                        name='add_cost'
                        type="number"
                        onChange={this.handleChange}
                      /> */}
                        {/* <span>Add Cost</span>
                        <h6>500/-</h6> */}
                      {/* </div> */}
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
                        type="number"
                        onChange={this.handleChange}
                      />
                    </div>
                </div>

                : ""}
  
                <div class="org-cst">
                  <h5>Original Cost</h5>
                  <span>{((Number(this.state.petData.package_price))* days_difference)+Number(this.state.add_cost)}</span>
                </div>

                <div class="org-cst">
                  <h5>Total Service Days</h5>
                  <span>{days_difference}</span>
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
                  <span>{this.state.Total}</span>
                </div>
                <div class="org-cst bd">
                  <h5>Platform Charges (10%)</h5>
                  {/* <span>(-) {this.state.petData.platFormFee}</span> */}
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

export default BoardingQuoteReceived