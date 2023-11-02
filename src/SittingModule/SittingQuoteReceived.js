import React, { Component } from 'react'
import './SittingQuote.css'
import Services from '../Services/Services';
import SuccessPage from '../Entry-Screens/SuccessPage';

const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class SittingQuoteReceived extends Component {
  constructor(props){
    super(props);
  }
  state={
    quoteObj : this.props.location.quoteObj,
    petData : {},
    add_cost : 0,
    discount : 0,
    Total:0,
    package_price :0,
    sessions : 0,
    from_time : "",
    to_time : "",
    platform_fee : 0,
  }

  componentDidMount=()=>{
    const obj ={
      service_id : this.state.quoteObj.service_id,
      booking_id : this.state.quoteObj.booking_id,
    }
    console.log(obj);
    Services.getInstance().quoteForm(obj).then((result)=>{
      if(result.status === true){
        this.setState({
          petData : result.results,
          from_time : result.results.from_time,
          to_time : result.results.to_time,
        })
      }
      
    })
  }

  handleChange=e=>{
    const{name,value}=e.target;
    this.setState({
        [name]:value
    },()=>          
    this.setState({
      Total : (((Number(this.state.petData.package_price)+Number(this.state.add_cost)) - (((Number(this.state.petData.package_price)+Number(this.state.add_cost)) * this.state.discount)/100)))
    }),()=>{
      this.setState({
        platform_fee : (((this.state.Total)*10)/100)
      })
    });       
};

  SubmitQuote=()=>{
    if(this.state.add_cost == ""){
      this.setState({
        err_msg : "Please enter the service cost"
      })
    }
    else {
    const obj ={
      service_id : this.state.quoteObj.service_id,
      service_provider : user.id,
      booking_id : this.state.quoteObj.booking_id,
      sessions : this.state.sessions,
      actual_price : this.state.add_cost,
      extra_price : "0",
      discount : this.state.discount,
      total_price : this.state.Total,
      petId : this.state.petData.petId,
      spmorning : '',
      spevening : '',
      spafternoon : ''
    }
    console.log(obj);
    Services.getInstance().submitQuote(obj).then((result)=>{
      if(result.status === true){
        document.getElementById("success-pop").style.display = "block";
      //  this.props.history.push({
      //   pathname : "/successPage"
      //  })
      }
      
    })
  }
  }

  

  goBack=()=>{
    this.props.history.push({
      pathname :"/home"
    })
  }

  render() {
    return (
        <div id="wrapper">
     
      

        <div class="srvc-dtls">
          
          <div class="srvc-dtls-hd">
            <h4>Service Details</h4>
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
                  <span>{this.state.petData.pet_age}</span>
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
                  <h6>Required Service Date</h6>
                </div>
                <div class="srvc-dtls-item-rht">
                  <span>{this.state.petData.from_date}</span>
                  <span>{this.state.petData.to_date}</span>
                </div>
              </div>
              <div class="srvc-dtls-item">
                <div class="srvc-dtls-item-lft">
                  <div class="srvc-dtls-pet-img">
                    <img src="srvc-dlts-img6.png" />
                  </div>
                  <h6>Preferable Time</h6>
                </div>
                <div class="srvc-dtls-item-rht ctmng">
                {this.state.petData.from_time == "" ? "" : <span>{this.state.petData.from_time}</span>}
                  {this.state.petData.to_time == "" ? "" : <span>{this.state.petData.to_time}</span>}
                </div>

              </div>
                
              <div class="ad-note">
                <h4>Additional Note*</h4>
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
                  <div class="srvc-dtls-rg-lft s-r">
                    <div class="srvc-dtls-rg-img">
                      <img src="tick-icon-g.png" />
                    </div>
                    <span>{this.state.petData.package_name}</span>
                  </div>
                  <input class="ad-ons-cst" 
                  placeholder="Add cost" 
                  name="add_cost" 
                  type="number"
                  onChange={this.handleChange}
                 />
                </div>
  
                <div class="srvc-dtls-gm-list">
                  <div class="srvc-dtls-gm-item">
                    <img src="tick-icon-r.png" />
                    <span>Feeding</span>
                  </div>
                  <div class="srvc-dtls-gm-item">
                    <img src="tick-icon-r.png" />
                    <span>Walking</span>
                  </div>
                  <div class="srvc-dtls-gm-item">
                    <img src="tick-icon-r.png" />
                    <span>Playing With Pet</span>
                  </div>
                </div>
  
  
                <div class="org-cst">
                  <h5>Original Cost</h5>
                  <span>{this.state.add_cost} /-</span>
                </div>
  
                <div class="srvc-dsct">
                  <h5>Have you wanted any discount?</h5>
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
                  <h5>Platform Charges</h5>
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
                <del>{this.state.add_cost}</del>
                  <span>{this.state.Total}/-</span>
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
      </div>
     
    )
  }
}

export default SittingQuoteReceived