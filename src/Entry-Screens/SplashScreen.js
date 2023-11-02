import React, { Component } from 'react'
import { motion } from 'framer-motion';
import './Splashscreen.css';
import Services from '../Services/Services';
import { fetchToken, onMessageListener } from '../firebase';

import { Plugins } from '@capacitor/core';



// // Retrieve data from local storage
// const result = await LocalStoragePlugin.getItem({ key: 'myKey' });
// const value = result.value;


const LocalStoragePlugin = Plugins;
const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class SplashScreen extends Component {
    constructor(props){
        super(props);
    }
    state = {
      setShow : false,
      setNotification : {
        'title' : '',
        'body'  : '',
      },
      setTokenFound : false,
      setFcmToken : '',
    }

    componentDidMount = () =>{
      if(navigator.onLine){
        const timeout = setTimeout(() => {
            if(!user){
                this.props.history.push({
                    pathname : "/login"
                })
            }
            else{
              if(user.service_id == "0"){
                this.props.history.push({
                  pathname : "/borading-screen"
              })
              }
              if(user.service_id == ""){
                this.props.history.push({
                  pathname : "/borading-screen"
              })
              }
              else{
                //SP Get Notified
                  const obj3 = {
                    spId : user.id
                  }
                  Services.getInstance().SPGetNotified(obj3).then((result)=>{
                    if(result.notifi == 1){
                      this.props.history.push({
                        pathname : "/notification-details"
                      })
                    }
                    else{
                      this.props.history.push({
                        pathname : "/home"
                      })
                    }
                  })



              }
            }
        }, 3000);
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }


    



  render() {
    return (
        <div class="enter-page">
        <motion.div 
          animate={{ y: 300, scale: 1}} 
          initial={{scale: 0}}
        //   animate={{ y: 300, scale: 1, x: [-200, 100, 0] }}
          transition = {{type: "tween", duration: 2}} 
          >
          <div class="enter-page-logo">
            <img src="menu-logo.png" alt="logo" />
          </div>
        </motion.div>

        <p>{this.state.setNotification.title}</p>
        <p>{this.state.setNotification.body}</p>
          {this.state.setTokenFound && <h6>Permission Enabled</h6>}
          {this.state.setTokenFound && <h6>{this.state.setFcmToken}</h6>}
          {/* {!this.state.setTokenFound && <h6>Permission needed</h6>} */}

        </div>
    )
  }
}

export default SplashScreen