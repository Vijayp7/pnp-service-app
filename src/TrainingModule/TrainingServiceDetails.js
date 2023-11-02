import React, { Component } from 'react'
import Services from '../Services/Services';
import './TrainingServiceDetails.css'



const user = JSON.parse(localStorage.getItem(`PNP-Service-userData`));

export class TrainingServiceDetails extends Component {

  constructor(props){
    super(props);
  }

  state={
    service_type : this.props.location.service_type,
    selected_package_id : [],
    txt1 : "Select",
    txt2 : "Select",
    txt3 : "Select",
    obd_clicks:0,
    int_clicks:0,
    adv_clicks:0,
  }

  GoBack=()=>{
    this.props.history.push({
      pathname : "/primary-profile-data"
    })
  }


  select_Package = (user_package,clicks) =>{
    if(user_package == "obedience"){
      if(clicks%2==0){
        document.getElementById("obd").classList.add("active");
        this.setState({
          txt1 : "Selected",
          obd_clicks : this.state.obd_clicks + 1,
          selected_package_id : [
            {"id" : 4}
          ]
        })
      }else {
        document.getElementById("obd").classList.remove("active");
        this.setState({
          txt1 : "Select",
          obd_clicks : this.state.obd_clicks - 1,
        })
        for(let i=0; i<this.state.selected_package_id.length; i++){
          if(this.state.selected_package_id[i].id == "4"){
            this.state.selected_package_id = this.state.selected_package_id.filter(el=>el.id !== 4)
          }
        }
      }
     
    }
    else if(user_package == "intermediate"){
      if(clicks%2==0){
      document.getElementById("int").classList.add("active");
      this.setState({
        txt2 : "Selected",
        int_clicks : this.state.int_clicks + 1,
        selected_package_id : [
          {"id" : 4},
          {"id" : 6}
        ]
      })
      }else{
        document.getElementById("int").classList.remove("active");
        this.setState({
          txt2 : "Select",
          int_clicks : this.state.int_clicks - 1,
        })
        for(let i=0; i<this.state.selected_package_id.length; i++){
          if(this.state.selected_package_id[i].id == 6){
            this.state.selected_package_id = this.state.selected_package_id.filter(el=>el.id !== 6)
          }
        }
      }
      
    }
    else if(user_package == "advance"){
      if(clicks%2==0){
      document.getElementById("adv").classList.add("active");
      this.setState({
        txt3 : "Selected",
        adv_clicks : this.state.adv_clicks + 1,
        selected_package_id : [
          {"id" : 4},
          {"id" : 6},
          {"id" : 8},
        ]
      })
      }else{
        document.getElementById("adv").classList.remove("active");
        this.setState({
          txt1 : "Select",
          txt3 : "Select",
          adv_clicks : this.state.adv_clicks - 1,
        })
        for(let i=0; i<this.state.selected_package_id.length; i++){
          if(this.state.selected_package_id[i].id == 8){
            this.state.selected_package_id = this.state.selected_package_id.filter(el=>el.id !== 8)
          }
        }
      }
      
    }
  }


  submitTraining = () =>{
    if(this.state.selected_package_id.length <= 0){
      alert("Please select package");
    }
    else {
      const obj = {
        service_id : this.state.service_type,
        service_provider : user.id,
        packages : this.state.selected_package_id,
      }
      console.log(obj);
      Services.getInstance().TrainingServiceDataInsert(obj).then((result)=>{
        if(result.status === true){
          this.props.history.push({
            pathname : "/home"
          })
        }
        else{
          alert("Facing some issue while sending data");
        }
      })
    }

  }

  


  render() {
    return (
        <div class="training_packages">
        {/* <div class="service_class">
          <div class="service_sym" onClick={this.GoBack}>
            <img src="lessthan_sym.png"/>
          </div>
          <div class="serv_det">
            <h5>Service Details</h5>
          </div>
        </div> */}
        <div class="service-header">
          <a onClick={this.GoBack}><img src="left-arrow.png" /></a>
          <span>Service Details</span>
          <p style={{margin:"0 auto",textAlign:"center",color:"#fff",fontSize:"14px"}}>Select the Services You Offer</p>
        </div>
        <div class="training_sections">
          <div class="obedience_sec" id='obd'> 
            <div class="obedience_class">
              <div class="obe-training">
                <div class="obe_img">
                  <img src="medal_dog.png"/>
                </div>
                <div class="obe_txt">
                  <h5>Obedience Training</h5>
                </div>
                <div class="medal_img">
                  <img src="medal.png"/>
                </div>
              </div>
            </div>
            <div class="obedience_train">
              <div class="obedience_lists1">
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Sit</span>
                </div>
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Down</span>
                </div>
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Stand</span>
                </div>
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Come</span>
                </div>
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Stay</span>
                </div>
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Heal Walk</span>
                </div>
              </div>
              <div class="obedience_lists2">
                <div class="obedience_list">
                  <i class="fa-solid fa-check"></i><span>Potty Training</span>
                </div>
                <div class="obedience_list">
                  <i class="fa-solid fa-check"></i><span>Puppy Biting</span>
                </div>
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Crate Training</span>
                </div>
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Jumping Control</span>
                </div>
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Shake Hand</span>
                </div>
                <div class="obedience_list">
                   <i class="fa-solid fa-check"></i><span>Hi Fi</span>
                </div>
              </div>
            </div>
            <div class="select_pack">
              <button class="select_btn" onClick={()=>this.select_Package("obedience",this.state.obd_clicks)}>{this.state.txt1}</button>
            </div>
          </div>
            <div class="intermediate_sec" id='int'> 
            <div class="intermediate_class">
              <div class="int-training">
                <div class="int_img">
                  <img src="dog_int.png"/>
                </div>
                <div class="int_txt">
                  <h5>Intermediate Training</h5>
                </div>
                <div class="intmedal_img">
                  <img src="medal-2.png"/>
                </div>
              </div>
            </div>
            <div class="intermediate_train">
              <div class="intermediate_lists1">
                <div class="intermediate_list">
                  <i class="fa-solid fa-check"></i><span>Speak</span>
                </div>
                <div class="intermediate_list">
                  <i class="fa-solid fa-check"></i><span>Count</span>
                </div>
                <div class="intermediate_list">
                  <i class="fa-solid fa-check"></i><span>Shoot</span>
                </div>
                <div class="intermediate_list">
                  <i class="fa-solid fa-check"></i><span>Zig Zag</span>
                </div>
              </div>
              <div class="intermediate_lists2">
                <div class="intermediate_list">
                  <i class="fa-solid fa-check"></i><span>Salute</span>
                </div>
                <div class="intermediate_list">
                  <i class="fa-solid fa-check"></i><span>Fetch</span>
                </div>
                <div class="intermediate_list">
                  <i class="fa-solid fa-check"></i><span>Hurdle Jump</span>
                </div>
                <div class="intermediate_list">
                  <i class="fa-solid fa-check"></i><span>Crawl</span>
                </div>
              </div>
            </div>
            <div class="select_pack2">
              <button class="sel_btn" onClick={()=>this.select_Package("intermediate",this.state.int_clicks)}>{this.state.txt2}</button>
            </div>
          </div>
           <div class="advance_sec" id='adv'> 
            <div class="advance_class">
              <div class="ad-training">
                <div class="adv_img">
                  <img src="ad-dog.png"/>
                </div>
                <div class="adv_txt">
                  <h5>Advance Training</h5>
                </div>
                <div class="advmedal_img">
                  <img src="orange-ad.png"/>
                </div>
              </div>
            </div>
            <div class="advance_train">
              <div class="advance_lists1">
                <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Sniffing</span>
                </div>
                <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Search</span>
                </div>
                <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Watch</span>
                </div>
                <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Don't Eat</span>
                </div>
                 <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Gaurd</span>
                </div>
                 <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Focus Heal</span>
                </div>
                 <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Eat</span>
                </div>
              </div>
              <div class="advance_lists2">
                <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Agressive Control</span>
                </div>
                <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Separation anxiety</span>
                </div>
                <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Growling</span>
                </div>
                <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Lunging</span>
                </div>
                 <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span> Fear anxiety</span>
                </div>
                 <div class="advance_list">
                  <i class="fa-solid fa-check"></i><span>Hyper Active</span>
                </div>
              </div>
            </div>
            <div class="select_pack3">
              <button class="adv_btn" onClick={()=>this.select_Package("advance",this.state.adv_clicks)}>{this.state.txt3}</button>
            </div>
          </div>
  
          {/* <!-- Advance traning  ends --> */}
          <div class="service_btn">
            <button class="submit" onClick={this.submitTraining}>Submit</button>
          </div>
        </div>
    </div>
    )
  }
}


export default TrainingServiceDetails