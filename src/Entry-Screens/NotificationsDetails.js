import React, { Component } from 'react'
import './NotificationDetails.css'
import Services from '../Services/Services';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';



const userData = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class NotificationsDetails extends Component {

    constructor(props){
        super(props);
    }
    state = {
        All_Notifications : [],
        loading : false,
    }
    openHome = () =>{
        this.props.history.push({
            pathname : "/home"
        })
    }

    componentDidMount = () =>{
      if(navigator.onLine){
      this.setState({
        loading : true
      })
        const obj = {
            userId : userData.id,
            searchTrm : "sp"
        }
        Services.getInstance().NotificationsData(obj).then((result)=>{
            this.setState({
                All_Notifications : result,
                loading : false
            })
        })

        const obj1 ={
          userId : userData.id
        }
        Services.getInstance().SPReadNotification(obj1).then((result)=>{
          console.log(result)
        })
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }



    getDates(sp_date){
        const date2 = new Date();
        let data = new Date(sp_date.replace(/[-]/g,'/'))
        let date1 = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate(), data.getHours(), data.getMinutes(), data.getSeconds()));
        let tmpdate = (date2.getTime() - date1.getTime()) / 1000;
      let returnTime = ''
      if (tmpdate < 60){
        returnTime = parseInt(tmpdate) + ' seconds ago'
      }
      else if (tmpdate < 3600){
        returnTime = parseInt(tmpdate/60) + ' minutes ago'

      }
      else if (tmpdate < 86400){
        returnTime = parseInt(tmpdate/3600) + ' hours ago'

      }
      else if (tmpdate < 2592000){
        returnTime = parseInt(tmpdate/86400) + ' days ago'

      }
      else if (tmpdate < 31536000){
        returnTime = parseInt(tmpdate/2592000) + ' months ago'

      }
      else if (tmpdate > 31536000){
        returnTime = parseInt(tmpdate/31536000) + ' years ago'

      }
      return returnTime
      }


      redirectUser = (notification) =>{
        if(notification.service_id == "1"){
            if(notification.notType == "booking-received" && notification.rStatus == 'open'){
              this.props.history.push({
                pathname : "/board-quote-recieved",
                quoteObj : notification
              })
            }
            else if(notification.notType == "payment_done" && notification.rStatus == 'open'){
              const obj = {
                clientId: notification.clientId,
                bookingId: notification.booking_id,
                serviceId: notification.service_id,
              }
              this.props.history.push({
                pathname : "/active-job-details",
                activeJobData : obj
              })
            }
            else if(notification.notType == "payment_released_to_client"){
              this.props.history.push({
                pathname : "/wallet",
              })
            }
            else{
              confirmAlert({
                title: '',
                message: "Booking has been done for this requirement",
                buttons: [
                  {
                    label: 'Ok',
                    onClick: () => {}
                  },
                ]
              });
            }
        }
        if(notification.service_id == "2"){
            if(notification.notType == "booking-received" && notification.rStatus == 'open'){
              this.props.history.push({
                pathname : "/groom-quote-recieved",
                quoteObj : notification
              })
            }
            else if(notification.notType == "payment_done" && notification.rStatus == 'open'){
              const obj = {
                clientId: notification.clientId,
                bookingId: notification.booking_id,
                serviceId: notification.service_id,
              }
              this.props.history.push({
                pathname : "/active-job-details",
                activeJobData : obj
              })
            }
            else if(notification.notType == "payment_released_to_client"){
              this.props.history.push({
                pathname : "/wallet",
              })
            }
            else{
              confirmAlert({
                title: '',
                message: "Booking has been done for this requirement",
                buttons: [
                  {
                    label: 'Ok',
                    onClick: () => {}
                  },
                ]
              });
            }
        }
        if(notification.service_id == "3"){
          if(notification.notType == "booking-received" && notification.rStatus == 'open'){
            this.props.history.push({
              pathname : "/train-quote-recieved",
              quoteObj : notification
            })
          }
          else if(notification.notType == "payment_done" && notification.rStatus == 'open'){
            const obj = {
              clientId: notification.clientId,
              bookingId: notification.booking_id,
              serviceId: notification.service_id,
            }
            this.props.history.push({
              pathname : "/active-job-details",
              activeJobData : obj
            })
          }
          else if(notification.notType == "payment_released_to_client"){
            this.props.history.push({
              pathname : "/wallet",
            })
          }
          else{
            confirmAlert({
              title: '',
              message: "Booking has been done for this requirement",
              buttons: [
                {
                  label: 'Ok',
                  onClick: () => {}
                },
              ]
            });
          }
      }
      if(notification.service_id == "4"){
        if(notification.notType == "booking-received" && notification.rStatus == 'open'){
          this.props.history.push({
            pathname : "/walk-quote-recieved",
            quoteObj : notification
          })
        }
        else if(notification.notType == "payment_done" && notification.rStatus == 'open'){
          const obj = {
            clientId: notification.clientId,
            bookingId: notification.booking_id,
            serviceId: notification.service_id,
          }
          this.props.history.push({
            pathname : "/active-job-details",
            activeJobData : obj
          })
        }
        else if(notification.notType == "payment_released_to_client"){
          this.props.history.push({
            pathname : "/wallet",
          })
        }
        else{
          confirmAlert({
            title: '',
            message: "Booking has been done for this requirement",
            buttons: [
              {
                label: 'Ok',
                onClick: () => {}
              },
            ]
          });
        }
    }


      }
        

  render() {
    return (
        <div id="wrapper">
            <div class="ntfn-main">
            <div class="ntfn-hd">
                <h4>Notifications </h4>
                <img src="right.png" onClick={this.openHome}/>
            </div>
            <div>
            {this.state.All_Notifications && this.state.All_Notifications.length > 0 ? this.state.All_Notifications.map((notify, index)=>{
                return(
                  <div class="ntfn-item" onClick={()=>this.redirectUser(notify)}>
                    <div class="ntfn-bell">
                    <img src="b-ntfn-icon.png" />
                    </div>
                    <div class="ntfn-cnt">
                    <h6>{notify.title}</h6>
                    <p>{notify.description}</p>
                    </div>
                    <div class="ntfn-tm">
                    <p>{this.getDates(notify.date_created)}</p>
                    </div>
                </div>
                )
            }) 
            : 
            
            <div class="no-ntfn">
            <img src='no-ntfn-icon.png'/>
            <h5>No notifications yet</h5>
            <p>You have no notifications right now</p>
            </div>
            }
            </div>
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

export default NotificationsDetails