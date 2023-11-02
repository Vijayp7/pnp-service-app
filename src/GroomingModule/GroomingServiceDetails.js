import React, { Component } from 'react'
import Services from '../Services/Services';
import "./GroomingServiceDetails.css"



const user = JSON.parse(localStorage.getItem(`PNP-Service-userData`));

export class GroomingServiceDetails extends Component {
    constructor(props){
        super(props);
    }

    state={
        basic_groom : "",
		basic_clicks : 0,
		adv_clicks : 0,
		selected_package_id : [],
		service_type : this.props.location.service_type,
		text : "Select",
		text1 : "Select",
    }

    Basic_Groom=(basic, clicks)=>{
        if(basic=="basic-grm-btn"){
			if(clicks%2 == 0){
				document.getElementById(basic).classList.add("active");
				this.setState({
					text : "Selected",
					basic_clicks: this.state.basic_clicks + 1,
					selected_package_id : [{
						"id" : 1
					}]
				})
			}
			else{
				document.getElementById(basic).classList.remove("active");
				this.setState({
					text : "Select",
					basic_clicks: this.state.basic_clicks - 1,
					selected_package_id : []
				})	
			}
        }else if(basic=="adv-btn"){
			if(clicks%2 == 0){
				document.getElementById(basic).classList.add("active");
				this.setState({
					text1 : "Selected",
					adv_clicks: this.state.adv_clicks + 1,
					selected_package_id : [
						{"id" : 1},
						{"id" : 1}
					]
				})
			}
			else{
				document.getElementById(basic).classList.remove("active");
				this.setState({
					text1 : "Select",
					adv_clicks: this.state.adv_clicks - 1,
					selected_package_id : []
				})
			}
        }
    }

    GoBack=()=>{
        this.props.history.push({
            pathname : "/primary-profile-data"
        })
    }



	submitGrooming = () =>{
		if(this.state.selected_package_id.length <= 0){
			alert("Please select service");
		}
		else{
			const obj ={
				service_id : this.state.service_type,
				service_provider : user.id,
				packages : this.state.selected_package_id
			}
	
			Services.getInstance().GroomingServiceDataInsert(obj).then((result)=>{
				console.log(result);
				if(result.status === true){
					this.props.history.push({
						pathname : "/home"
					})
				}
				else {
					alert("Facing some issues while sending data");
				}
			})
		}


	}

  render() {
    return (
        <div class="service-details-page">
		<div class="service-header">
			<a onClick={this.GoBack}><img src="right.png" /></a>
			<span>Service Details</span>
			<p style={{margin:"0 auto",textAlign:"center",color:"#fff",fontSize:"14px"}}>Select the Services You Offer</p>
		</div>
		<div class="main-sec">

			<div class="client-q-info" id='basic-grm-btn'>
				<div class="client-package">
					<div>
						<img src="grooming-sm.png"/>
					</div>
					<strong>Basic Grooming</strong>
					<span>
						<img src="star2.png"/>
					</span> 
				</div>
				<div class="client-pack-type">
					<p><i class="fa-solid fa-check"></i> Shampoo Bath</p>
					<p><i class="fa-solid fa-check"></i> Nail Clipping</p>
					<p><i class="fa-solid fa-check"></i> Ear Cleaning</p>
					<p><i class="fa-solid fa-check"></i> Eye Cleaning</p>
					<p><i class="fa-solid fa-check"></i> Teeth Cleaning</p>
					<p><i class="fa-solid fa-check"></i> Anal Gland Cleaning</p>
					<p><i class="fa-solid fa-check"></i> Full Hair Cut</p>
					<p><i class="fa-solid fa-check"></i> Oil Massage</p>
					<p><i class="fa-solid fa-check"></i> Paw Massage</p>
					<p><i class="fa-solid fa-check"></i> Minor Hair Cut</p>
					<p><i class="fa-solid fa-check"></i> Tick Bath</p>
				</div>
				<div class="pkg-s-btn" onClick={()=>this.Basic_Groom("basic-grm-btn" , this.state.basic_clicks)}>
					<p>
						<span> <img src="tic-min.png"/></span>
						{this.state.text}					
						</p>
				</div>
			</div>

			<div class="client-q-info" id='adv-btn'>
				<div class="client-package">
					<div>
						<img src="d-bath.png"/>
					</div>
					<strong>Advance Grooming</strong>
					<span>
						<img src="crown.png"/>
					</span>
				</div> 
				<div class="client-pack-type sdp-clpt">
					<p><i class="fa-solid fa-check"></i> Stylish Hair Cut</p>
					<p><i class="fa-solid fa-check"></i> Hair Knots Removel</p>
					<p><i class="fa-solid fa-check"></i> Desheeding</p>
				</div>

				<div class="pkg-s-btn" onClick={()=>this.Basic_Groom("adv-btn", this.state.adv_clicks)}>
					<p>
						<span> <img src="tic-min.png"/></span>
						{this.state.text1}
					</p>
				</div>
			</div>
		 
 			<div class="vbi-quote-btn" onClick={this.submitGrooming}>
	 			<button>Submit</button>
 			</div>
  		</div>
  	</div>
    )
  }
}

export default GroomingServiceDetails
