import React, { Component } from 'react'
import Services from '../Services/Services';
import HandlingImage from './HandlingImage';
import LoadingSymbol from './LoadingSymbol';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { Camera, CameraResultType } from '@capacitor/camera';
import Location from './Location';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import PullToRefresh from 'react-simple-pull-to-refresh';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';

import Resizer from "react-image-file-resizer";
import { formatNumber } from "accounting-js";





const provider_location = localStorage.getItem("serivce_provider_location");
let latitude = localStorage.getItem("serivce_provider_lat");
let longitude = localStorage.getItem("serivce_provider_long");
const userData = JSON.parse(localStorage.getItem("PNP-Service-userData"));
let user_final_city = "";
let user_location = "";


export class PrimaryProfileData extends Component {
  constructor(props) {
    super(props);

this.state = {
    f_name: "",
    l_name : "",
    age: "",
    final_age : "",
    gender: "",
    service_type: "",
    user_location: user_location,
    id_proof: "",
    address_proof: "",
    selfie: "",
    certificate_proof : "",
    id_proof_return: "",
    address_proof_return: "",
    selfie_return: "",
    certificate_proof_return : "",
    location_popup: false,
    error_messgae: "",
    loading: false,
    address: '',
    id_proof_name : "Voter Id,PAN Card,Aadhar Card",
    address_proof_name : "Aadhar,Driving license,Passport,Current bill",
    selfie_name : "Take a Picture,Add photo from gallery",
    certificate_proof_name : "Choose a file",
    error_f_name : "",
    error_l_name : "",
    error_age: "",
    error_gender: "",
    error_service_type: "",
    error_user_location: "",
    error_id_proof: "",
    error_address_proof: "",
    error_selfie: "",
    error_certificate_proof : "",
    errorMessage : "",
    existing_profile_data : {},

    newImage: "",
    newSize: 0,
    isOpen: false,
   
    
  };
}


componentDidMount () {
  if(navigator.onLine){
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName("age")[0].setAttribute('max', today);
    if(!provider_location){
      // window.location.reload();
    }
    else{
      const provider_location = localStorage.getItem("serivce_provider_location");
      this.setState({
        user_location : provider_location
      })
    }
    if(userData){
      this.setState({
        f_name: userData.first_name,
        l_name : userData.last_name,
        age: userData.age,
        gender: userData.gender,
      })
      const obj ={
        id : userData.id
      }
      Services.getInstance().Service_Provider_Profile_Info(obj).then((result)=>{
        console.log(result)
        if(result.status === true){
          this.setState({
            existing_profile_data : result.results,
            f_name: result.results.first_name,
            l_name : result.results.last_name,
            age: result.results.age,
            final_age : result.results.age,
            gender: result.results.gender,
            // user_location: result.results.location,
            id_proof: result.results.id_proof,
            address_proof: result.results.address_proof,
            selfie: result.results.photo,
            certificate_proof : result.results.crt_proof,
            address: '',
        })
        if(result.results.service.length > 0){
          this.setState({
            service_type: result.results.service[0].id,
          })
          if(result.results.service[0].id == "2" || result.results.service[0].id == "3"){
            document.getElementById("certificate-upload").style.display = "block";
          }
        }
          if(result.results.age == "0"){
            this.setState({
              age : " ",
              final_age : " "
            })
          }
         
        
        }

      })
      }
      if(!userData){
        window.location.reload(); 
      }

    }
  else{
    this.props.history.push({
      pathname : "/internet"
    })
  }

}




goBack = () =>{
  this.props.history.push({
    pathname: "/training-screen"
  })
}



handleChange = e => {
  e.preventDefault();
  let today = new Date().toISOString().split('T')[0];
  document.getElementsByName("age")[0].setAttribute('max', today);
  const { name, value } = e.target;
  this.setState({ [name]: value },
    ()=>{
      if(!this.state.age == ""){
        let dob = new Date(this.state.age);
        let month_diff = Date.now() - dob.getTime();
        let age_dt = new Date(month_diff); 
        let year = age_dt.getUTCFullYear();
        let age = Math.abs(year - 1970);
        this.setState({
          final_age : age
        })
      }
      if(this.state.service_type == "2" || this.state.service_type == "3"){
        document.getElementById("certificate-upload").style.display = "block"

      }
      else{
        document.getElementById("certificate-upload").style.display = "none" 
      }
    }
    // () => console.log(this.state)
  );
};




set_Gender = (gender1) =>{
  this.setState({
    gender: gender1,
  })
}

openLocation = () =>{
  // this.props.history.push({
  //   pathname: "/open-google-map"
  // })
  this.setState({
    user_location : provider_location,
    location_popup: true,
  })
  
}

closePopUp = () =>{
  this.setState({
    location_popup: false,
  })
}



fNumber = (n) =>
formatNumber(n, { precision: 0, thousand: " ", decimal: "," });

fileChangedHandlerAddress = (event) => {
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
        this.setState({
          address_proof_return: base64ImageURL,
          address_proof : uri,
          address_proof_name : event.target.files[0].name,
          loading : false,
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
};


fileChangedHandlerSelfie = (event) => {
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
            selfie_return: base64ImageURL,
            selfie : uri,
            selfie_name : event.target.files[0].name,
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
  };


fileChangedHandlerID = (event) => {
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
            id_proof_return: base64ImageURL,
            id_proof: uri,
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
  };


fileChangedHandlerCertificate = (event) => {
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
            certificate_proof_return: base64ImageURL,
            certificate_proof: uri,
            certificate_proof_name : event.target.files[0].name,
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
  };

fileChangedHandlerProfile = (event) => {
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
            selfie_return: base64ImageURL,
            selfie: uri,
            selfie_name : event.target.files[0].name,
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
  };






















saveProfileData = () =>{
  this.setState({
    loading: true
  })
  if(this.state.f_name == ""){
    this.setState({
      error_f_name : "First name is required",
      error_l_name : "",
      error_age: "",
      error_gender: "",
      error_service_type: "",
      error_user_location: "",
      error_id_proof: "",
      error_address_proof: "",
      error_selfie: "",
      loading: false,
    })
  }
  else if(this.state.l_name == ""){
    this.setState({
      error_f_name : "",
      error_l_name : "Last name is required",
      error_age: "",
      error_gender: "",
      error_service_type: "",
      error_user_location: "",
      error_id_proof: "",
      error_address_proof: "",
      error_selfie: "",
      loading: false,
    })
  }
  else if(this.state.age == ""){
    this.setState({
      error_f_name : "",
      error_l_name : "",
      error_age: "Age is required",
      error_gender: "",
      error_service_type: "",
      error_user_location: "",
      error_id_proof: "",
      error_address_proof: "",
      error_selfie: "",
      loading: false,
    })  
  }
  else if(this.state.gender == "" || this.state.gender == null){
    this.setState({
      error_f_name : "",
      error_l_name : "",
      error_age: "",
      error_gender: "Gender is required",
      error_service_type: "",
      error_user_location: "",
      error_id_proof: "",
      error_address_proof: "",
      error_selfie: "",
      loading: false,
    })  
  }
  else if(this.state.service_type == ""){
    this.setState({
      error_f_name : "",
      error_l_name : "",
      error_age: "",
      error_gender: "",
      error_service_type: "Service type is required",
      error_user_location: "",
      error_id_proof: "",
      error_address_proof: "",
      error_selfie: "",
      loading: false,
    })
  }
  else if(this.state.user_location == ""){
    this.setState({
      error_f_name : "",
      error_l_name : "",
      error_age: "",
      error_gender: "",
      error_service_type: "",
      error_user_location: "User location is required",
      error_id_proof: "",
      error_address_proof: "",
      error_selfie: "",
      loading: false,
    })
  }
  else if(this.state.id_proof == ""){
    this.setState({
      error_f_name : "",
      error_l_name : "",
      error_age: "",
      error_gender: "",
      error_service_type: "",
      error_user_location: "",
      error_id_proof: "Id proof is required",
      error_address_proof: "",
      error_selfie: "",
      loading: false,
    })
  }
  else if(this.state.address_proof == ""){
    this.setState({
      error_f_name : "",
      error_l_name : "",
      error_age: "",
      error_gender: "",
      error_service_type: "",
      error_user_location: "",
      error_id_proof: "",
      error_address_proof: "Address proof is required",
      error_selfie: "",
      loading: false,
    })
  }
  else if(this.state.selfie == ""){
    this.setState({
      error_f_name : "",
      error_l_name : "",
      error_age: "",
      error_gender: "",
      error_service_type: "",
      error_user_location: "",
      error_id_proof: "",
      error_address_proof: "",
      error_selfie: "Selfie or Photo is required",
      loading: false,
    })
  }
  else{
  const obj = {
    first_name: this.state.f_name,
    last_name : this.state.l_name,
    email: userData.email,
    phone: userData.phone,
    age: this.state.final_age,
    gender: this.state.gender,
    service: this.state.service_type,
    id_proof: this.state.id_proof_return,
    address_proof: this.state.address_proof_return,
    certificate_proof: this.state.certificate_proof_return,
    photo: this.state.selfie_return,
    id: userData.id,
    location: this.state.user_location,
    longitude : longitude,
    latitude : latitude,
    city : user_final_city
  }

  console.log(obj);

  Services.getInstance().serviceProviderProfileUpdate(obj).then((result)=>{
    console.log(result);
    if(result.status === true){
      this.setState({
        loading: false
      })
      if(this.state.service_type == '1'){
        this.props.history.push({
          pathname: "/boarding-service-details",
          service_type: this.state.service_type,
          
        })
      }
      else if(this.state.service_type == '2'){
        this.props.history.push({
          pathname: "/grooming-service-details",
          service_type: this.state.service_type,
        })
      }
      else if(this.state.service_type == '3'){
        this.props.history.push({
          pathname: "/training-service-details",
          service_type: this.state.service_type,
        })
      }
      else if(this.state.service_type == '4'){
        this.props.history.push({
          pathname: "/walking-service-details",
          service_type: this.state.service_type,
      })
      }
      else if(this.state.service_type == '5'){
        this.props.history.push({
        pathname: "/vet-service-details",
        service_type: this.state.service_type,
      })
      }
      else if(this.state.service_type == '6'){
        this.props.history.push({
        pathname: "/sitting-service-details",
        service_type: this.state.service_type,
      })
      }
      // window.open("/home", "_self")
      // this.props.history.push({
      // // pathname: "/video-view",
      // pathname: "/home",
      // service_type: this.state.service_type,
      // })
    }
    else{
      this.setState({
        loading: false,
        errorMessage : result.msg
      })
    }
  })
 }
 
}



handlePictureClick = async () =>{
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri
  });
  let imageUrl = image.base64String;
  console.log(image);
  const base64 = await fetch(`${image.webPath}`)
  .then(response => response.blob())
  .then(blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((res) => {
      reader.onloadend = () => {
      res(reader.result);
    }})
  })
  console.log(base64)
  if(image.format == "jpeg"){
    let base64ImageURL = base64.replace('data:image/jpeg;base64,','');
    console.log(base64ImageURL)
    this.setState({
      selfie_return: base64ImageURL,
      selfie : base64,
      selfie_name : "image.jpeg"
    })
  }
  else if(image.format == "png"){
    let base64ImageURL = base64.replace('data:image/png;base64,','');
    console.log(base64ImageURL)
    this.setState({
      selfie_return: base64ImageURL,
      selfie : base64,
      selfie_name : "image.png"
    })
  }

}

useCurrentLocation = () =>{
  console.log("hello")
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
              user_location = results[1].formatted_address;
              console.log(results[1].formatted_address);
              localStorage.setItem("serivce_provider_location", results[1].formatted_address);
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
  user_location = provider_location1;
  this.setState({
    user_location: provider_location1,
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

handleChangeLocations = address => {
    this.setState({ address });
};

useLocation = (address) =>{
  localStorage.setItem("serivce_provider_location", address);
  user_location = address
  this.getLocality();
  this.setState({
    user_location: address,
    location_popup: false,
  })
}

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

handleRefreshMethod = () =>{
  window.location.reload();
}

LoadOnce = () =>{
  if(!userData){
    window.location.reload(); 
  }
}



  render() {
    return (
      <div class="create-profile-pnp" onLoad={this.LoadOnce}>
        <DarkBackground disappear={this.state.loading}>
            <LoadingOverlay
              active={true}
              spinner={true}
              text="Please Wait..."
            >
            </LoadingOverlay>
        </DarkBackground>
      <div class="prof-head">
        <header>
          <div>
            <a onClick={this.goBack}><img src="left-arrow.png" alt="arrow" /></a>
          </div>
          <div class="prof-header">
           <img src="menu-logo.png" />
           <h3>Create Your Profile</h3>
          </div>
        </header>

      </div>
      
      <div class="prof-info">
       <div class="pud-form">
       <PullToRefresh onRefresh={this.handleRefreshMethod} >
         <div>
           <label>First Name</label> 
           <input
            name='f_name' 
            type="text"
            value={this.state.f_name}
            onChange={this.handleChange} 
            // placeholder="First Name" 
            />
         </div>
         <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_f_name}</p>
         <div>
           <label>Last Name</label> 
           <input
            name='l_name' 
            type="text"
            value={this.state.l_name}
            onChange={this.handleChange} 
            // placeholder="Last Name" 
            />
         </div>
         <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_l_name}</p>
          <div>
           <label>Your Age</label>  
           <input
            name='age' 
            type="date"
            value={this.state.age == "0" ? "" : this.state.age}
            onChange={this.handleChange}
            maxLength={2}
            />
         </div>
         
         <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_age}</p>
         <div class="select-gender">
            <span>Select Gender</span>
            <div class="gender-otp" >
              <div class="gender" onClick={()=>this.set_Gender("Male")}  style={{backgroundColor: (this.state.gender == "Male") ? "#9dce76" : "",border: (this.state.gender == "Male") ? "2px solid #9dce76" : ""}}>
                <div>
                  <img src="male.png" />
                  <p>Male</p>
                </div>
              </div>
              <div class="gender" onClick={()=>this.set_Gender("Female")} style={{backgroundColor: (this.state.gender == "Female") ? "#9dce76" : "",border: (this.state.gender == "Female") ? "2px solid #9dce76" : ""}}>
                <div>
                  <img src="female.png" />
                  <p>Female</p>
                </div>
              </div>
            </div>
          </div>
          <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_gender}</p>
          <div>
            <label>Select Your Service</label> 
            <select name = "service_type" onChange={this.handleChange}>
              <option value="">Select Service</option>
              {this.state.service_type == "1" ? <option value="1" selected>I am a Boarder</option> : <option value="1">I am a Boarder</option>}
              {this.state.service_type == "2" ? <option value="2" selected>I am a Groomer</option> : <option value="2">I am a Groomer</option>}
              {this.state.service_type == "3" ? <option value="3" selected>I am a Trainer</option> : <option value="3">I am a Trainer</option>}
              {this.state.service_type == "4" ? <option value="4" selected>I am a Walker</option> : <option value="4">I am a Walker</option>}
              {/* {this.state.service_type == "5" ? <option value="5" selected>I am a Vet</option> : <option value="5">I am a Vet</option>} */}
              {/* {this.state.service_type == "6" ? <option value="6" selected>I am a Pet sitter</option> : <option value="6">I am a Pet sitter</option>} */}
            </select>
          </div>
          <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_service_type}</p>
         <div class="loc">
           <label>Enter Your Location</label> 
           <textarea
            name='user_location' 
            value={user_location}
            onChange={this.handleChange}
            onClick={this.openLocation}
            placeholder="Prefered service area" />
         </div>
         <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_user_location}</p>
         <div class="file">
           <label>Upload Your ID Proof <span style={{fontSize:"13px"}}>(below 10 MB)</span> </label>
            <input type="text" class="btn2" placeholder={this.state.id_proof_name} />
            <input 
              type="file" 
              class="v-upld" 
              name='id_proof'
              placeholder={this.state.id_proof_name}
              accept="image/*"
              onChange={this.fileChangedHandlerID} 
              />
         </div>
         <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_id_proof}</p>
         {this.state.id_proof === "" ? "" : <img style={{margin: '0 auto 14px', height: '50px'}} src={this.state.id_proof || this.state.existing_profile_data.id_proof}/>}
         <div class="file">
           <label>Upload Your Address Proof <span style={{fontSize:"13px"}}>(below 10 MB)</span></label> 
            <input type="text" class="btn2" placeholder={this.state.address_proof_name} />
            <input 
              type="file" 
              class="v-upld" 
              name='address_proof'
              placeholder={this.state.address_proof_name}
              accept="image/*"
              onChange={this.fileChangedHandlerAddress} 
              />
         </div>
         <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_address_proof}</p>
         {this.state.address_proof == "" ? "" : <img style={{margin: '0 auto 14px', height: '50px'}}src={this.state.address_proof || this.state.existing_profile_data.address_proof}/>}

         <div class="file">
           <label>Upload Your Photo <span style={{fontSize:"13px"}}>(below 10 MB)</span></label> 
            <input type="text" class="btn2" placeholder={this.state.selfie_name} />
            <input 
              type="file" 
              class="v-upld" 
              name='selfie'
              placeholder={this.state.selfie_name}
              accept="image/*"
              onChange={this.fileChangedHandlerProfile} 
              />
         </div>

         <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_selfie}</p>
         {this.state.selfie == "" ? "" : <img style={{margin: '0 auto 14px', height: '50px'}} src={this.state.selfie || this.state.existing_profile_data.photo}/>}
        

         <div  id='certificate-upload' style={{display : "none"}}>
         <div class="file">
          {this.state.service_type == "2" ? <label>Upload Your Grooming Certificate (If any) <span style={{fontSize:"13px"}}>(below 10 MB)</span></label> : 
          <label>Upload Your Training Certificate (If any) <span style={{fontSize:"13px"}}>(below 10 MB)</span></label> }
            {/* <input type="text" class="btn2" placeholder={this.state.certificate_proof_name} /> */}
            <div class="inht">
              <p>{this.state.certificate_proof_name}</p>
            <input 
              type="file"
              class="v-upld"
              name='certificate_proof'
              placeholder={this.state.certificate_proof_name}
              accept="image/*"
              onChange={this.fileChangedHandlerCertificate}
              />
              </div>
         </div>
         <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.error_certificate_proof}</p>
         {this.state.certificate_proof == "" ? "" : <img style={{margin: '0 auto 14px', height: '50px'}} src={this.state.certificate_proof || this.state.existing_profile_data.certificate_proof}/>}
         </div>


         <p style={{margin: '1px', color: 'red', bottom: '3px'}}>{this.state.errorMessage}</p>
         <button class="pro-sub-btn" onClick={this.saveProfileData}>Next</button>
         </PullToRefresh> 
       </div>
      </div>

      <div>
      {this.state.location_popup ?
          <Location
            useCurrentLocation = {this.useCurrentLocation}
            closePopUp = {this.closePopUp}
            useLocation = {()=>this.useLocation(this.state.address)}
            handleSelectLocations = {this.handleSelectLocations}
            handleChangeLocations = {this.handleChangeLocations}
            address = {this.state.address}
          />
      : ""}
      </div>

    </div>
    )
  }
}

export default PrimaryProfileData