import React, { Component } from 'react'
import './EditProfile.css'
import HandlingImage from './HandlingImage';
import Location from './Location';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import Services from '../Services/Services';
import PullToRefresh from 'react-simple-pull-to-refresh';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';
import Resizer from "react-image-file-resizer";
import { formatNumber } from "accounting-js";
import ReactCrop from 'react-image-crop'








const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));
let longitude = localStorage.getItem(`serivce_provider_long`);
let latitude = localStorage.getItem(`serivce_provider_lat`);
let user_final_city = "";

export class EditProfile extends Component {
    constructor(props){
        super(props);
    }
    state= {
        first_name : user.first_name,
        last_name : user.last_name,
        email : user.email,
        phone : user.phone,
        gender : user.gender,
        address : user.location,
        photo : user.photo,
        id_proof : "",
        location_popup : false,
        latLng : "",
        id_preview : user.photo,
        success_message : "",
        locality : [],
        loading : false,
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
      };


      componentDidMount =()=>{
        if(navigator.onLine){
          if(!user){
            window.location.reload();
          }
        }
        else{
          this.props.history.push({
            pathname : "/internet"
          })
        }
      }


    openHome = () =>{
        this.props.history.push({
          pathname : "/home"
        })
    }

    handleRefreshMethod = () =>{
      window.location.reload();
    }




    openProfile = () =>{
      this.props.history.push({
        pathname : "/edit-profile"
      })
  }

  openWhatsapp = () =>{
    window.open("https://wa.me/917997887788","_blank");
  }

    changeGender = (newGender) =>{
        // this.setState({
        //     gender : newGender
        // })
    }



    openLocation = () =>{
      this.setState({
        // user_location : provider_location,
        location_popup: true,
      })
    }
  
    useCurrentLocation = () =>{
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    
        const obj = {
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        };
        console.log(obj);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        localStorage.setItem("serivce_provider_lat", position.coords.latitude);
        localStorage.setItem("serivce_provider_long", position.coords.longitude);
    
        //For Full Address
        const google = window.google;
        var latlng = new google.maps.LatLng(obj.lat, obj.lon); 
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  results.forEach(function(result) {
                    result.address_components.forEach(function(component) {
                      if (component.types.includes('locality')) {
                        user_final_city = component.long_name;
                      }
                    });
                  });
                }
            }
            else {
              //
            }            
        });
      });
      const provider_location1 = localStorage.getItem("serivce_provider_location");
      this.setState({
        address: provider_location1,
        location_popup: false,
      })
    }
    
    handleSelectLocations = address => {
      geocodeByAddress(address)
        .then(results =>  getLatLng(results[0]) )
        .then(latLng =>  {this.setState({ latLng: latLng }, ()=>{
          latitude = latLng.lat;
          longitude = latLng.lng;
          localStorage.setItem("serivce_provider_lat", latLng.lat);
          localStorage.setItem("serivce_provider_long", latLng.lng);
        })})
        .catch(error => console.error('Error', error));
        console.log(address)
        geocodeByAddress(address).then(results=>this.setState({locality : results}))
        this.setState({ address });
    };


    getLocality = ()=>{
      // console.log(results[0].address_components);
      this.state.locality.forEach(function(result) {
        result.address_components.forEach(function(component) {
          if (component.types.includes('locality')) {
            user_final_city = component.long_name;
          }
        });
      });
    }
    
    handleChangeLocations = address => {
        this.setState({ address });
    };
    
    useLocation = (address) =>{
      this.getLocality();
      this.setState({
        user_location: address,
        location_popup: false,
      })
    }
  
    Location=()=>{
      this.setState({
        location_popup : true
      })
    }
  
    closePopUp = () =>{
      this.setState({
        location_popup: false,
      })
    }




    fNumber = (n) =>
    formatNumber(n, { precision: 0, thousand: " ", decimal: "," });

    handle_Id_Proof = (event) =>{
      this.setState({
        loading : true
      })
      var fileInput = false;
      if (event.target.files[0]) {
        fileInput = true;
        this.previousSize = this.fNumber(event.target.files[0].size);
      }
      if (fileInput) {
        try {
          const img = Resizer.imageFileResizer(
            event.target.files[0],
            720,
            500,
            "JPEG",
            100,
            0,
            (uri) => {
              console.log(uri);
              this.setState({ newImage: uri });
              const base64str = uri.split("base64,")[1];
              const decoded = atob(base64str);
              this.setState({
                newSize: this.fNumber(decoded.length),
              });
              let base64ImageURL = uri.replace('data:image/jpeg;base64,','');
              // console.log(base64ImageURL);
              this.setState({
                  id_proof: base64ImageURL,
                  photo : uri,
                  id_proof_name : event.target.files[0].name,
                  loading : false
              })
            },
            "base64",
            200,
            200
          );
          console.log("img: ", typeof img);
        } catch (err) {
          console.log(err);
        }
      }






    }


    Update = () =>{
      this.setState({
        loading : true
      })
      const obj = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone: this.state.phone,
        gender: this.state.gender,
        photo: this.state.id_proof,
        id: user.id,
        location : this.state.address,
        longitude : longitude,
        latitude : latitude,
        city : user_final_city
      }
      console.log(obj);
      Services.getInstance().EditProfile(obj).then((result)=>{
        if(result.status == true){
          const obj ={
            id : user.id
          }
          Services.getInstance().Service_Provider_Profile_Info(obj).then((result)=>{
            localStorage.setItem(`PNP-Service-userData`, JSON.stringify(result.results));
            if(result.status === true){
              this.setState({
                success_message : "Profile has been updated",
                loading : false
              }, ()=>{
                const timeout = setTimeout(() => {
                  this.props.history.push({
                    pathname : "/home"
                  })
              }, 800);
              })
            }
            else{
              this.setState({
                success_message : "Please try again later",
                loading : false
              })
            }
          })
        }
      })
    }

    
    
  render() {
    console.log(user_final_city);
    return (
        <div id="wrapper">
        <div class="srvc-dtls">          
          <div class="srvc-dtls-hd">
            <h4>My Profile</h4>
            <div class="srvc-dtls-bck" onClick={this.openHome}>
              <img src="srvc-dtls-bck-icon.png" />
            </div>
          </div>
          <PullToRefresh onRefresh={this.handleRefreshMethod}>
          <div class="sp-prfl-main">
          <DarkBackground disappear={this.state.loading}>
            <LoadingOverlay
              active={true}
              spinner={true}
              text="Please Wait..."
            >
            </LoadingOverlay>
          </DarkBackground>            
            <div class="prfl-pic">
              <div class="prfl-pic-chng">
               
                <img src={this.state.photo} />
                
                <div class="cam-div">
                    <img src="cam-icon-g.png" alt="image"/>
                    <input 
                      type="file" 
                      name="photo" 
                      placeholder="Upload A image"
                      onChange = {this.handle_Id_Proof}
                      />
                </div>
              </div>               
            </div>
            <div class="prfl-dtls">
              <h6>First Name</h6>
              <input type="text" name="first_name" placeholder="Enter First Name" value={user.first_name} onChange={this.handleChange}/>
              <h6>Last Name</h6>
              <input type="text" name="last_name" placeholder="Enter Last Name" value={user.last_name} onChange={this.handleChange}/>
              <div class="sp-gndr">
                {this.state.gender == "Male" ? 
                <div class="sp-gndr-item active" onClick={()=>this.changeGender("Male")}>
                  <div class="sp-gndr-item-img">
                    <img src="male-icon.png" />
                  </div>
                  <p>Male</p>
                </div>
                 :   
                <div class="sp-gndr-item" onClick={()=>this.changeGender("Male")}>
                 <div class="sp-gndr-item-img">
                   <img src="male-icon.png" />
                 </div>
                 <p>Male</p>
               </div>}

               {this.state.gender == "Female" ? 
                <div class="sp-gndr-item active" onClick={()=>this.changeGender("Female")}>
                  <div class="sp-gndr-item-img">
                    <img src="female-icon.png" />
                  </div>
                  <p>Female</p>
                </div>
                :
                <div class="sp-gndr-item" onClick={()=>this.changeGender("Female")}>
                <div class="sp-gndr-item-img">
                  <img src="female-icon.png" />
                </div>
                <p>Female</p>
                </div> 
                }
              </div>

              <div class="prsnl-data">
                <h6>Phone</h6>
                <input type="number" class="phone" name="phone" placeholder="Phone Number" value={user.phone} onChange={this.handleChange}/>
                <h6>Email</h6>
                <input type="email" name="email" class="mail" placeholder="Example@gmail.com" value={user.email} onChange={this.handleChange}/>
                <h6 class="ad-edt">Address
                  {/* <span><img src="edit-icon.png"/></span> */}
                </h6>
                <textarea placeholder="Basheerbagh,Hyderabad" name="address" value={this.state.address} onChange={this.handleChange} onClick={this.openLocation}></textarea>
              </div>
                <p style={{margin : "0 auto", textAlign : "center", color : "green"}}>{this.state.success_message}</p>
              <div class="my-prfl-btn">
                <button onClick={this.Update}>Save Changes</button>
              </div>
  
            </div> 
          </div> 
          </PullToRefresh>

        </div>
        <div class="srvc-ftr">
              <div class="srvc-ftr-item active" onClick={this.openProfile}>
                <img src="profile-a.png" class="wo-a"/>
                <img src="profile.png" class="wt-a"/>
                <span>Profile</span>
              </div>
              <div class="srvc-ftr-item" onClick={this.openHome}>
                <img src="home.png" class="wo-a"/>
                <img src="home-a.png" class="wt-a"/>

                <span>Home</span>
              </div>
              <div class="srvc-ftr-item" onClick={this.openWhatsapp}>
                <img src="help.png" class="wo-a"/>
                <img src="help.png" class="wt-a"/>
                <span>Help</span>
              </div>
              
          </div>
        {
            this.state.location_popup ?
            <Location
            useCurrentLocation = {this.useCurrentLocation}
            closePopUp = {this.closePopUp}
            useLocation = {()=>this.useLocation(this.state.address)}
            handleSelectLocations = {this.handleSelectLocations}
            handleChangeLocations = {this.handleChangeLocations}
            address = {this.state.address}
            /> 
            : ""
          }
      </div>
    )
  }
}

export default EditProfile