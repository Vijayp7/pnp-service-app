import React, { Component } from 'react'
import Services from '../Services/Services';
import './Home.css'
import NavigationMenu from './NavigationMenu';
import Location from './Location'
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import PullToRefresh from 'react-simple-pull-to-refresh';
import AddNewServices from './AddNewServices';




const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));
const provider_location = localStorage.getItem("serivce_provider_location");
const latitude = localStorage.getItem("serivce_provider_lat");
const longitude = localStorage.getItem("serivce_provider_long");


export class HomePage extends Component {
  constructor(props){
    super(props);
  }

  state={
    profile_obj : {},
    jobs_waiting : [],
    my_proposals : [],
    my_activejobs : [],
    service_id :"",
    service_name:"",
    selected_services : [],
    all_services : [],
    menu_open : false,
    open_addservice : false,
    msg: "",
    bgcolor : "",
    open_location : false,
    address: '',
    selected_tab_type : "job_waiting",
    open_job_waiting : true,
    open_my_proposal : false,
    open_active_jobs : false,
    limit: 3,
    offset:0,
    sp_time1 : [],
    wallet_amount : 0,
    jobs_missed : [],
    notifications_count : "",
    loading: false,

  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value }, 
      // () => console.log(this.state)
    );
  };


  componentDidMount = () =>{
    if(navigator.onLine){
        if(!user){
          window.location.reload();
        }
        else{
          const obj ={
            id : user.id
          }
          Services.getInstance().Service_Provider_Profile_Info(obj).then((result)=>{
            if(result.status === true){
              this.setState({
                profile_obj : result.results,
                selected_services : result.results.service
              }, ()=>document.getElementById(this.state.selected_services[0].id).classList.add("active"))
              
              localStorage.setItem(`PNP-Service-userData`, JSON.stringify(result.results));
              if(!provider_location){
                localStorage.setItem("serivce_provider_lat", result.results.latitude);
                localStorage.setItem("serivce_provider_long", result.results.longitude);
                localStorage.setItem("serivce_provider_location", result.results.location);
              }
              // if(!latitude){
              //   window.location.reload();
              // }
              this.setState({
                  service_id : result.results.service[0].id,
              })
              const obj = {
                service_id : result.results.service[0].id,
                user_id : user.id,
                longitude : result.results.longitude,
                latitude : result.results.latitude
              }
              Services.getInstance().Waiting_Jobs(obj).then((result)=>{
                if(result.status === true){
                  this.setState({
                    jobs_waiting : result.results,
                  })
                }
                else{
                  this.setState({
                    jobs_waiting : [],
                  })
                }
              })
              const obj1 = {
                service_id : result.results.service[0].id,
                service_provider : user.id,
                longitude : result.results.longitude,
                latitude : result.results.latitude
              }
              Services.getInstance().MyProposals(obj1).then((result)=>{
                if(result.status === true){
                  console.log(result)
                  this.setState({
                    my_proposals : result.data,
                  })
                }
                else{
                  this.setState({
                    my_proposals : [],
                  })
                }
              })

              const obj2 = {
                serviceId : result.results.service[0].id,
                userId : user.id,
              }
              Services.getInstance().MyActiveJobs(obj2).then((result)=>{
                if(result.length > 0){
                  this.setState({
                    my_activejobs : result,
                  })
                }
                else{
                  this.setState({
                    my_activejobs : [],
                  })
                }
              })
            }
          })

          const obj1 = {
            spId: user.id
          }
          Services.getInstance().ListofServices(obj1).then((result)=>{
            this.setState({
              all_services : result
            })
          })

          const obj2 = {
            userId : user.id
          }
          Services.getInstance().SPWallet(obj2).then((result)=>{
              this.setState({
                wallet_amount : result.walletAmount,
              })

          })
          Services.getInstance().SPJobsMissed(obj2).then((result)=>{
            this.setState({
              jobs_missed : result
            })
          })

          //SP Get Notified
          const obj3 = {
            spId : user.id
          }
          Services.getInstance().SPGetNotified(obj3).then((result)=>{
            this.setState({
              notifications_count : result.notifi
            })
          })
        
        }
    }
    else{
      this.props.history.push({
        pathname : "/internet"
      })
    }

  }

  
  jobs=(l_job, id)=>{
    if(l_job==""){
     document.getElementById("job_waiting").classList.add("active");
     document.getElementById("active_job").classList.remove("active");
     document.getElementById("my_proposal").classList.remove("active");
     document.getElementById("add_service").classList.remove("active");
     document.getElementById("job-tabs").style.display = "block";
     document.getElementById("job-tabs").style.backgroundColor = "#f5f7fb";
     this.setState({
      selected_tab_type : "job_waiting",
      open_job_waiting : true,
      open_my_proposal : false,
      open_active_jobs : false,
     })  
   }
   else if(l_job=="active_job"){
     document.getElementById(l_job).classList.add("active");
     document.getElementById("my_proposal").classList.remove("active");
     document.getElementById("job_waiting").classList.remove("active");
     document.getElementById("add_service").classList.remove("active");
     document.getElementById("job-tabs").style.display = "block";
     document.getElementById("job-tabs").style.backgroundColor = "#f5f7fb";
     this.setState({
      selected_tab_type : "active_job",
      open_job_waiting : false,
      open_my_proposal : false,
      open_active_jobs : true,
     })
     const obj2 = {
      serviceId : id,
      userId : user.id,
    }
    Services.getInstance().MyActiveJobs(obj2).then((result)=>{
      if(result.length > 0){
        this.setState({
          my_activejobs : result,
        })
      }
      else{
        this.setState({
          my_activejobs : [],
        })
      }
    })
   }
   else if(l_job=="my_proposal"){
     document.getElementById(l_job).classList.add("active");
     document.getElementById("active_job").classList.remove("active");
     document.getElementById("job_waiting").classList.remove("active");
     document.getElementById("add_service").classList.remove("active");
     document.getElementById("job-tabs").style.display = "block";
     document.getElementById("job-tabs").style.backgroundColor = "#f5f7fb";
     this.setState({
      selected_tab_type : "my_proposal",
      open_job_waiting : false,
      open_my_proposal : true,
      open_active_jobs : false,
     })
      const obj = {
        service_id : id,
        service_provider : user.id,
        longitude : longitude,
        latitude : latitude
      }
      Services.getInstance().MyProposals(obj).then((result)=>{
        if(result.status === true){
          console.log(result)
          this.setState({
            my_proposals : result.data,
          })
        }
        else{
          this.setState({
            my_proposals : [],
          })
        }
      })

   }
   else if(l_job=="job_waiting"){
     document.getElementById(l_job).classList.add("active");
     document.getElementById("active_job").classList.remove("active");
     document.getElementById("my_proposal").classList.remove("active");
     document.getElementById("add_service").classList.remove("active");
     document.getElementById("job-tabs").style.display = "block";
     document.getElementById("job-tabs").style.backgroundColor = "#f5f7fb";
     this.setState({
      selected_tab_type : "job_waiting",
      open_job_waiting : true,
      open_my_proposal : false,
      open_active_jobs : false,
     })
     this.setState({
      msg : "",
      bgcolor : ""
     })
     const obj = {
      service_id : id,
      user_id : user.id,
      longitude : longitude,
      latitude : latitude
    }
    Services.getInstance().Waiting_Jobs(obj).then((result)=>{
      if(result.status === true){
        this.setState({
          jobs_waiting : result.results,
        })
      }
      else{
        this.setState({
          jobs_waiting : [],
        })
      }
    })
   }
   else if(l_job=="add_service"){
     document.getElementById("job_waiting").classList.add("active");
     document.getElementById("active_job").classList.remove("active");
     document.getElementById("my_proposal").classList.remove("active");
     document.getElementById("add_service").classList.remove("active");
     document.getElementById("job-tabs").style.display = "block";
     document.getElementById("job-tabs").style.backgroundColor = "#f5f7fb";
     this.setState({
      selected_tab_type : "add_service",
      open_job_waiting : true,
      open_my_proposal : false,
      open_active_jobs : false,
      open_addservice : true,
     })

   }
   else{
   
   }

 }

//  Quote_service=(id, services_Array)=>{

//   for(let i=0; i <= services_Array.length; i++){
//     if(id == services_Array[i].service_id){
//       document.getElementById(id).classList.add("active");
//       this.getBookingPreview(id);
//     }
//     else{
//       console.log("In active code");
//       document.getElementById(services_Array[i].service_id).classList.remove("active");
//     }
//   }

// }



 DogList = (id,selected_services_array,serviceArray, selected_tab_type)=>{
  this.setState({
    service_id : id,
    selected_tab_type : selected_tab_type
  })
  for(let i=0; i<selected_services_array.length; i++){
    if(id == selected_services_array[i].id){
      document.getElementById(id).classList.add("active");
      this.Waiting_Jobs(id);
    }
    else{
      document.getElementById(selected_services_array[i].id).classList.remove("active");
    }
  }
 }


 Waiting_Jobs = (service_id) =>{
   if(this.state.selected_tab_type == "job_waiting"){
    const obj = {
      service_id : service_id,
      user_id : user.id,
      longitude : longitude,
      latitude : latitude
    }
    Services.getInstance().Waiting_Jobs(obj).then((result)=>{
      if(result.status === true){
        this.setState({
          jobs_waiting : result.results,
        })
      }
      else{
        this.setState({
          jobs_waiting : [],
        })
      }
    })
   }


   else if(this.state.selected_tab_type == "my_proposal"){
    const obj = {
      service_id : service_id,
      service_provider : user.id,
      longitude : longitude,
      latitude : latitude
    }
    Services.getInstance().MyProposals(obj).then((result)=>{
      if(result.status === true){
        console.log(result)
        this.setState({
          my_proposals : result.data,
        })
      }
      else{
        this.setState({
          my_proposals : [],
        })
      }
    })
   }
   else if(this.state.selected_tab_type == "active_job"){
    const obj2 = {
      serviceId : service_id,
      userId : user.id,
    }
    Services.getInstance().MyActiveJobs(obj2).then((result)=>{
      if(result.length > 0){
        this.setState({
          my_activejobs : result,
        })
      }
      else{
        this.setState({
          my_activejobs : [],
        })
      }
    })
    
   }
   else if(this.state.selected_tab_type == "add_service"){
    
   }
   else{
    
   }

 }

openQuoteProposal = (quoteData) =>{
    console.log(quoteData);
    if(quoteData.service_id==1){
      this.props.history.push({
        pathname : "/board-quote-recieved",
        quoteObj : quoteData,
      })
    }
    else if(quoteData.service_id=="2"){
      this.props.history.push({
      pathname : "/groom-quote-recieved",
      quoteObj : quoteData,
    })
    }
    else if(quoteData.service_id=="3"){
      this.props.history.push({
      pathname : "/train-quote-recieved",
      quoteObj : quoteData,
    })
    }else if(quoteData.service_id=="4"){
      this.props.history.push({
          pathname : "/walk-quote-recieved",
          quoteObj : quoteData,
        })
    }else if(quoteData.service_id=="5"){
      this.props.history.push({
        pathname : "/vet-quote-recieved",
        quoteObj : quoteData,
      })
    }else if(quoteData.service_id=="6"){
      this.props.history.push({
        pathname : "/sit-quote-recieved",
        quoteObj : quoteData,
      })
    }else{

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
    localStorage.setItem("serivce_provider_lat", position.coords.latitude);
    localStorage.setItem("serivce_provider_long", position.coords.longitude);

    //For Full Address
    const google = window.google;
    var latlng = new google.maps.LatLng(obj.lat, obj.lon); 
    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              console.log(results[1].formatted_address);
              localStorage.setItem("serivce_provider_location", results[1].formatted_address);
              window.location.reload();
            }
        }
        else {
          //
        }
        
    });
  });
  const provider_location1 = localStorage.getItem("serivce_provider_location");
  this.setState({
    user_location: provider_location1,
    location_popup: false,
  })
}

handleSelectLocations = address => {
  geocodeByAddress(address)
    .then(results =>  getLatLng(results[0]) )
    .then(latLng =>  {this.setState({ latLng: latLng }, ()=>{
      localStorage.setItem("serivce_provider_lat", latLng.lat);
      localStorage.setItem("serivce_provider_long", latLng.lng);
    })})
    .catch(error => console.error('Error', error));
    console.log(address)
    this.setState({ address });
};


handleChangeLocations = address => {
    this.setState({ address });
};

useLocation = (address) =>{
  localStorage.setItem("serivce_provider_location", address);
  this.setState({
    user_location: address,
    location_popup: false,
  }, ()=>{window.location.reload()})
}



myProposalViewDetails =(proposalData)=>{
  if(proposalData.service_id == "1"){
    this.props.history.push({
      pathname : "/board-quote-edit",
      proposalData : proposalData,
    })
  }
  else if(proposalData.service_id == "2"){
    this.props.history.push({
      pathname : "/groom-quote-edit",
      proposalData : proposalData,
    })
  }
  else if(proposalData.service_id == "3"){
    this.props.history.push({
      pathname : "/train-quote-edit",
      proposalData : proposalData,
    })
  }
  else if(proposalData.service_id == "4"){
    this.props.history.push({
      pathname : "/walk-quote-edit",
      proposalData : proposalData,
    })
  }
  else if(proposalData.service_id == "5"){
    this.props.history.push({
      pathname : "/vet-quote-edit",
      proposalData : proposalData,
    })
  }
  else if(proposalData.service_id == "6"){
    this.props.history.push({
      pathname : "/sit-quote-edit",
      proposalData : proposalData,
    })
  }
}



myActiveJobViewDetails = (activeJobData) =>{
  localStorage.setItem("sp-active-job", JSON.stringify(activeJobData));
  this.props.history.push({
    pathname : "/active-job-details",
    activeJobData : activeJobData,
  })
}


openNotificationDetails = () =>{
  const obj ={
    userId : user.id
  }
  Services.getInstance().SPReadNotification(obj).then((result)=>{
    console.log(result)
  })
  this.props.history.push({
    pathname : "/notification-details"
  })
}



handleRefreshMethod = () =>{
  window.location.reload();
}


  Logout = () =>{
    localStorage.removeItem(`PNP-Service-userData`);
    localStorage.clear();
    this.props.history.push({
      pathname : "/login"
    })
  }

  openAddPhotos = () =>{
    this.props.history.push({
      pathname : "/add-photos"
    })
  }

  openMyReviews = () =>{
    this.props.history.push({
      pathname : "/my-reviews"
    })
  }


  openMenu = () =>{
    this.setState({
      menu_open : true,
    })
  }

  closeMenu = () =>{
    this.setState({
      menu_open : false,
    })
  }


  openLocation = () =>{
    this.setState({
      open_location : true,
    })
  }

  openAddService = () =>{
    this.setState({
      open_addservice : true,
      // menu_open : false,
    })
  }


  closeLocation = () =>{
    this.setState({
      open_location : false,
    })
  }

  closeService = () =>{
    this.setState({
      open_addservice : false,
    })
  }

  openWallet = ()=>{
    this.props.history.push({
      pathname : "/wallet"
    })
  }

  openDocumentVerification = () =>{
    this.props.history.push({
      pathname : "/document-verification"
    })
  }


  openProfile = () =>{
      this.props.history.push({
        pathname : "/edit-profile"
      })
  }

  
  openBankDetails = () =>{
    this.props.history.push({
      pathname : "/bank-details"
    })
  }


  openWhatsapp = () =>{
    window.open("https://wa.me/917997887788","_blank");
  }


  render() {
    return (
    
      <div id="wrapper">
      <div className="pnp-srvc">
        <div className="srvc-hm">
          <div className="srvc-hd-h">
            <div className="srvc-hd-list">
              <div className="srvc-item-lft" onClick={()=>this.openMenu()}>
                <img src="home-menu-icon.png" />
              </div>
              <div className="srvc-item-mdl">
                <img src="menu-logo.png" />
              </div>
              <div className="srvc-item-rht bg ntfn" onClick={this.openNotificationDetails}>
                <img src="bell-icon-grn.png" />
                {this.state.notifications_count == "0" ? "" :
                <div className="ntfn-c">
                <span>{this.state.notifications_count}</span>
                </div>
                }
                
              </div>
              <div className="srvc-item-rht bg walt-p" onClick={this.openWallet} style={{marginRight : "10px"}}>
                <img src="bag-icon.png" />
                <p>{this.state.wallet_amount}/-</p>
              </div>
            </div>
          </div>
          <PullToRefresh onRefresh={this.handleRefreshMethod}>
          <div className="srvc-main">
            <div className="srvc-p-list">
            <div className="srvc-p-hr h3 active"  id="job_waiting" onClick={()=>this.jobs("job_waiting",this.state.service_id)}>
                <div className="srvc-p-item p3">
                  <div className="srvc-p">
                    <img src="nj-icon.png" />
                  </div>
                </div>
                <p>New Jobs</p>
              </div>
              <div className="srvc-p-hr h2"  id="my_proposal" onClick={()=>this.jobs("my_proposal",this.state.service_id)}>
                <div className="srvc-p-item p2">
                  <div className="srvc-p">
                    <img src="mb-icon.png" />
                  </div>
                </div>
                <p>My Bids</p>
              </div>
              <div className="srvc-p-hr h1"  id="active_job" onClick={()=>this.jobs("active_job", this.state.service_id)}>
                <div className="srvc-p-item p1">
                  <div className="srvc-p">
                    <img src="aj-icon.png" />
                  </div>
                </div>
                <p>Active Jobs</p>
              </div>

              <div className="srvc-p-hr h4" id="add_service" onClick={()=>this.jobs("add_service",this.state.service_id)}>
                <div className="srvc-p-item p4">
                  <div className="srvc-p">
                    <img src="add-jobs-icon.png" />
                  </div>
                </div>
                <p>Add Service</p>
              </div>
            </div>


            <div id='job-tabs' style={{padding: "10px 10px 0 10px", backgroundColor : "#f5f7fb", borderRadius : "10px 10px 0 0", border: "1px solid #d3d1d1", borderBottom: "none"}}>
              <div className="srvc-list-tabs">
          {this.state.selected_services && this.state.selected_services.length > 0 ? this.state.selected_services.map((service, index)=>{
            return(
                <div className="srvc-t-item" id={service.id} onClick={()=>this.DogList(service.id, this.state.selected_services, this.state.all_services, this.state.selected_tab_type)} key={index}>
                  <p>{service.name}</p>
                </div>                 
            )
          }) : ""}
            </div>
          </div>
            

    {this.state.open_job_waiting ? 
              <div className="srvc-tabs">
              {this.state.jobs_waiting && this.state.jobs_waiting.length > 0 ? this.state.jobs_waiting.map((job, index)=>{
                return(
                <div id="tabsc-1" className="tab-content-ts current" key={index}>
                          <div className="srvc-tab-cnt srvc-show">
                              <div className="tmr-div">
                                <img src="timer-icon.png" />
                                <span>{job.posted_time}</span>
                              </div>

                              <div className="add-on-l">
                                <div className="add-on-list">
                                  <div className="add-on-lft">
                                    {job.client_photo == "" ? 
                                      <img src="profile-a.png" /> 
                                      : 
                                      <img src={job.client_photo} />
                                    }
                                  </div>
                                  <div className="add-on-rht">
                                    <p>{job.client_name}</p>
                                    <h5>{job.title}</h5>
                                  </div>
                                </div>
                                <div className="add-on-l-rht">
                                  <span>1 Pet</span>
                                  <small><img src="loc-icon2.png" /> {job.distance} Away</small>
                                  <p className="n-go-s-grmng" onClick={()=>this.openQuoteProposal(job)}>Send Proposal</p>
                                </div>
                              </div>

                          </div>

                      </div>
                )
                
              }) 
              
              :
              <div className="srvc-tab-cnt">
                <h2 className="no-job-txt">No jobs at the moment</h2>
                <img className="no-job" src="no-job-icon.png" />
              </div>
             }
              </div>
    : "" }


    {this.state.open_my_proposal ? 
              <div className="srvc-tabs">
                {this.state.my_proposals && this.state.my_proposals.length > 0 ? this.state.my_proposals.map((proposals, index)=>{
                  return(
                    <div id="tabsc-11" className="tab-content-ts current" key={index}>
                                            
                    <div className="srvc-tab-cnt srvc-show">
                          <div className="tmr-div">
                            {/* <img src="images-srvc/timer-icon.png" />
                            <span>{proposals.posted_time}</span> */}
                            <p>{proposals.others.length} Quotes Received</p>
                          </div>

                          <div className="add-on-l">
                            <div className="add-on-list">
                              <div className="add-on-lft">
                                {proposals.client_photo == "" ? 
                                      <img src="profile-a.png" /> 
                                      : 
                                      <img src={proposals.client_photo} />
                                }
                              </div>
                              <div className="add-on-rht">
                                <p>{proposals.client_name}</p>
                                <h5>{proposals.title}</h5>
                                <p className="amt"> ₹ {proposals.price}/-</p>
                              </div>
                            </div>
                            <div className="add-on-l-rht">
                              <span>{proposals.petName}</span>
                              <small><img src="loc-icon2.png" /> {proposals.distance} Away</small>
                              <p className="go-s-grmng" onClick={()=>this.myProposalViewDetails(proposals)}>Edit Bid</p>
                            </div>
                          </div>

                    </div>

                    </div>
                  )
                }) 


                :
                
                <div className="srvc-tab-cnt">
                <h2 className="no-job-txt">No jobs at the moment</h2>
                <img className="no-job" src="no-job-icon.png" />
              </div>
              }
              </div>
    : ""}

    {this.state.open_active_jobs ?
              <div className="srvc-tabs">
                {this.state.my_activejobs && this.state.my_activejobs.length > 0 ? this.state.my_activejobs.map((activeJob, index)=>{
                  return(
                    <div id="tabsc-1" className="tab-content-ts current" key={index}>
                    <div className="srvc-tab-cnt srvc-show">
                        <div className="add-on-l">
                          <div className="add-on-list">
                            <div className="add-on-lft">
                              {activeJob.profilePic == "" ? 
                                      <img src="profile-a.png" /> 
                                      : 
                                      <img src={activeJob.profilePic} />
                                }
                            </div>
                            <div className="add-on-rht">
                              <p>{activeJob.buyername}</p>
                              <h5>{activeJob.packName}</h5>
                            </div>
                          </div>
                          <div className="add-on-l-rht">
                            <span>{activeJob.petName}</span>
                            <small><img src="loc-icon2.png" />  {activeJob.distence} away</small>
                            <p className="n-go-s-grmng" onClick={()=>this.myActiveJobViewDetails(activeJob)}>View Details</p>
                          </div>
                        </div>

                    </div>

                </div>









                  )
                }) 
                :
                  <div className="srvc-tab-cnt">
                    <h2 className="no-job-txt">No jobs at the moment</h2>
                    <img className="no-job" src="no-job-icon.png" />
                </div> 
                }

              </div>
    
    : ""}

    {this.state.jobs_missed && this.state.jobs_missed.length > 0 ? 
            <div className="srvc-jobs">
              <div className="srvc-jobs-hd">
                <h5>Jobs You Missed</h5>
                <span><img src="blub-w.png" /> Win More Jobs</span>
              </div>
            {this.state.jobs_missed && this.state.jobs_missed.length > 0 ? this.state.jobs_missed.map((job, index)=>{
              return(
                <div className="recent-jobs" key={index}>
                <div className="recent-jobs-lft">
                  <img src={job.cpic} />
                </div>
                <div className="recent-jobs-rht">
                  <h6>{job.cname}</h6>
                  <p>{job.service}</p>
                  <span>Awarded to <b>{job.sname}</b> &nbsp;for <b>&nbsp;{job.price}</b>/-</span>
                </div>
              </div>
              )
            }) : ""}


            </div>

     : ""}

          </div>
          </PullToRefresh>
          <div className="srvc-ftr">
              <div className="srvc-ftr-item" onClick={this.openProfile}>
                <img src="profile-a.png" className="wo-a"/>
                <img src="profile.png" className="wt-a"/>
                <span>Profile</span>
              </div>
              <div className="srvc-ftr-item active">
                <img src="home.png" className="wo-a"/>
                <img src="home-a.png" className="wt-a"/>

                <span>Home</span>
              </div>
              <div className="srvc-ftr-item" onClick={this.openWhatsapp}>
                {/* <a href='https://wa.me/917997887788'></a> */}
                <img src="help.png" className="wo-a"/>
                <img src="help.png" className="wt-a"/>
                <span>Help</span>
              </div>
              
          </div>



        </div>

      </div>

      {this.state.menu_open ? 
        <NavigationMenu
          closeMenu = {this.closeMenu}
          Logout = {this.Logout}
          openProfile = {this.openProfile} 
          openAddPhotos = {this.openAddPhotos}
          openMyReviews = {this.openMyReviews}
          closePopUp = {this.closeService}
          openAddService = {this.openAddService}
          openDocumentVerification = {this.openDocumentVerification}
          openBankDetails = {this.openBankDetails}
          userPhoto = {user.photo}
        /> 
      : ""}

      {this.state.open_location ? 
        <Location 
        closePopUp = {this.closeLocation}
        useCurrentLocation = {this.useCurrentLocation}
        useLocation = {()=>this.useLocation(this.state.address)}
        handleSelectLocations = {this.handleSelectLocations}
        handleChangeLocations = {this.handleChangeLocations}
        address = {this.state.address}
      /> : ""}

     

        {this.state.open_addservice ? 
          <AddNewServices 
            closePopUp = {this.closeService}
          />
        : ""}
    </div>

    )
  }
}

export default HomePage