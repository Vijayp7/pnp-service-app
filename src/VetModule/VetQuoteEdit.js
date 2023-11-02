import React, { Component } from 'react'
import Services from '../Services/Services';
import './VetQuote.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SuccessPage from '../Entry-Screens/SuccessPage';


const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));


export class VetQuoteEdit extends Component {
    constructor(props){
        super(props);
      }
      state={
        quoteObj : this.props.location.proposalData,
        petData : {},
        issues : [],
        add_cost : 0,
        discount : 0,
        Total:0,
        package_price :0,
        sessions : 0,
        tabIndex : 0,
        platform_fee : 0,
      }
    
      componentDidMount=()=>{
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
              add_cost : result.results.actual_price,
              discount : result.results.discount,
              Total : Number(result.results.total_price)
            },()=>{
              this.setState({
                platform_fee : (((this.state.Total)*10)/100)
              })
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
        },()=>{
          this.setState({
            platform_fee : (((this.state.Total)*10)/100)
          })
        }));      
    };



    getDates(sp_date){
      const date1 = new Date(sp_date);
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if(diffDays < 30){
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
        if(this.state.add_cost == ""){
          this.setState({
            err_msg : "Enter cost details"
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
          total_price : this.state.Total,
          petId : this.state.petData.petId,
          action : "update",
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



    showJobDetails = () =>{
      this.setState({
        tabIndex : 1
      })
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
            <h4>Edit Quotation</h4>
            <div class="srvc-dtls-bck" onClick={this.goBack}>
              <img src="srvc-dtls-bck-icon.png" />
            </div>
          </div>
  
  
          <div class="srvc-dtls-main">

            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList>
                <Tab onClick={this.showAllBids}>All Bids</Tab>
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
                                    <small>{this.state.quoteObj.petName}</small>                              
                                    <p><b>Bid </b> ₹{this.state.quoteObj.price}</p>
                                  </div>
                                </div>
                                <div class="n-ad-rht">
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
                                    <p><b>Bid </b>₹{others.price}</p>
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
                              <h2 class="no-job-txt">No quotations at the moment</h2>
                              <img class="no-job" src="no-job-icon.png" />
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
                  <h6>Pet DOB</h6>
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
                  <span>{this.state.petData.booking_date}</span>
                  
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
                  <span>{this.state.petData.booking_time}</span>
                </div>
              </div>
  
              <div class="ad-note">
                <h4>Additional Note*</h4>
                <p>{this.state.petData.about_issue}</p>
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
                <div class="srvc-dtls-rg dbd">
                  <div class="srvc-dtls-rg-lft s-r">
                    
                      <div class="srvc-dtls-rg-img">
                        <img src="tick-icon-g.png" />
                        <span>{this.state.petData.package_name}</span>
                      </div>
                      <div class="srvc-dtls-rg-img">
                        <img src="tick-icon-g.png" />
                        <h6>{this.state.petData.service_type}</h6>
                      </div>
                      
                    
                    
                  </div>
                  {/* <div class="ad-ons-cst s-r">
                    <span>Add Cost</span>
                    <h6>000/-</h6>
                  </div> */}
                  <input class="ad-ons-cst"
                   placeholder="Add cost" 
                   name="add_cost"
                   value={this.state.add_cost} 
                   type="number"
                   onChange={this.handleChange}
                   />
                </div>
  
                <div class="srvc-dtls-gm-list">
                    {this.state.petData.issues && this.state.petData.issues.length > 0 ? this.state.petData.issues.map((issue,index)=>{
                        return(
                            <div class="srvc-dtls-gm-item">
                            <img src="tick-icon-r.png" />
                            <span>{issue.issue}</span>
                          </div>
                        )
                    }) : ""}
                 
                  {/* <div class="srvc-dtls-gm-item">
                    <img src="tick-icon-r.png" />
                    <span>Walking</span>
                  </div>
                  <div class="srvc-dtls-gm-item">
                    <img src="tick-icon-r.png" />
                    <span>Playing With Pet</span>
                  </div> */}
                </div>
  
  
                <div class="org-cst">
                  <h5>Original Cost</h5>
                  <span>{this.state.add_cost}</span>
                </div>
  
                <div class="srvc-dsct">
                  <h5>Have you wanted any discount?</h5>
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
              </TabPanel>
            </Tabs>



  
          </div>
  
  
        </div>
        <div id="success-pop" style={{display : "none"}}>
          <SuccessPage/>
        </div>
  
      </div>
    )
  }
}

export default VetQuoteEdit