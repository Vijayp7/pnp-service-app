import React, { Component } from 'react'
import Services from '../Services/Services';
import LoadingSymbol from './LoadingSymbol';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';



export class OTPPage extends Component {
    constructor(props) {
      super(props);
      this.handleStart();
      this.state = {
          dataReceived: this.props.location.data,
          loading: false,
          error_message: "",
          time: 1*60,
          running: true,
          value: '', otp1: "", otp2: "", otp3: "", otp4: "", otp5: "",otp6: "", disable: true,
          resend_otp : ""
        };
      }


      componentDidUpdate(prevProps, prevState) {
        if(navigator.onLine){
          if(this.state.running !== prevState.running){
            switch(this.state.running) {
              case true:
                this.handleStart();
            }
          }
          document.querySelectorAll('input[type="number"]').forEach(input =>{
            input.oninput=()=>{
              if(input.value.length > input.maxLength) input.value=input.value.slice(0,input.maxLength)
            };
          });
        }
        else{
          this.props.history.push({
            pathname : "/internet"
          })
        }
      }
    
      handleStart() {
        this.timer = setInterval(() => {
          const newTime = this.state.time - 1;
          this.setState(
            {time: newTime >= 0 ? newTime : 0}
          );
        }, 1000);
      }
    
      handleStop() {
        if(this.timer) {
          clearInterval(this.timer);
          this.setState(
            {running:false}
          );
        }
      }
    
      handleReset() {
        this.setState(
          {time: 0}
        );
      }
    
    
      handleCountdown(seconds) {
        this.setState({
          time: seconds,
          running: true
        })
      }
    
      format(time) {
        const date = new Date(time * 1000);
        let hh = date.getUTCHours();
        let mm = date.getUTCMinutes();
        let ss = date.getSeconds();
        if (hh < 10) {hh = "0"+hh;}
        if (mm < 10) {mm = "0"+mm;}
        if (ss < 10) {ss = "0"+ss;}
        return '00' !== hh ? hh+":"+mm+":"+ss : mm+":"+ss;
      }

      goBack = () =>{
        this.props.history.push({
            pathname:'/'
        })
      }
    
      verifyOTP = (e) =>{
        e.preventDefault();
        this.setState({
          loading: true,
        })
        const obj = {
          user_id: this.state.dataReceived.user_id,
          otp: this.state.otp1+this.state.otp2+this.state.otp3+this.state.otp4+this.state.otp5+this.state.otp6
        }
        console.log(obj);
        Services.getInstance().verifyOTP(obj).then((result)=>{
          console.log(result);
          if(result.status === true) {
            localStorage.setItem(`PNP-Service-userData`, JSON.stringify(result.data));
            localStorage.setItem(`PNP-Service-userId`, JSON.stringify(result.data.id));
            this.setState({
              loading: false,
            },()=>{
              if((result.data.service_id == "") || (result.data.service_id == "0")){
                this.props.history.push({
                  pathname: '/borading-screen'
                })
              }
              else{
                window.open(`#/home`, "_self");
              }
            })
          }
          else{
            this.setState({
              error_message: result.msg,
              loading: false,
            })
          }
        })
      }


      resendNewOTP = () =>{
        this.setState({
          loading : true,
          otp1: "",
          otp2: "",
          otp3: "",
          otp4: "",
          otp5: "",
          otp6: ""
        })
        const obj = {
          username: this.state.dataReceived.phone,
      }
  
      Services.getInstance().newLogin(obj).then((result)=>{
          console.log(result);
          if(result.status === true) {
            this.setState({
              loading: false,
              resend_otp : "OTP has been sent successfully",
              time : 60
            })                    
          }
          else if(result.status === false){
            this.setState({
              loading: false,
            })
          }
      })
      }


      handleChange(value1, event) {
        this.setState({ [value1]: event.target.value });
      }


    
      inputfocus = (elmnt) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
          const next = elmnt.target.tabIndex - 2;
          if (next > -1) {
    
            elmnt.target.form.elements[next].focus()
          }
        }
        else {
          console.log("next");
         
            const next = elmnt.target.tabIndex;
            if (next < 6) {
              elmnt.target.form.elements[next].focus()
            }
        }
    
      }




      // send = () =>{
      //   const data = {
      //     "userId" : this.state.dataReceived.user_id,
      //     "type" : "ServiceProvider"
      //   }
      //   const iframe = document.getElementById("my-iframe");
      //   iframe.contentWindow.postMessage(data, "*");
      // }
    












  render() {
    let {time} = this.state;
    return (
        <div class="otp-pnp">
          <DarkBackground disappear={this.state.loading}>
            <LoadingOverlay
              active={true}
              spinner={true}
              text="Please Wait..."
            >
            </LoadingOverlay>
          </DarkBackground>
        <div class="otp-head">
          <a onClick={this.goBack}><img src="left-arrow.png" alt="arrow" /></a>
        </div> 
        <div class="otp-pnp-info">
          <img src="otp-p.png" alt="img" />
          <h3>Verification</h3>
          <p>We have sent the login OTP on your register mobile number..</p>
        </div>
        {/* { this.state.loading === true ? <LoadingSymbol /> : "" }  */}

        <form>
        <div class="otp-inputs">
          <div class="otp-inputs-left">         
        
        <div className="otpContainer">

          <input
            name="otp1"
            type="number"
            autoComplete="off"
            className="otpInput"
            max={1}
            value={this.state.otp1}
            onKeyPress={this.keyPressed}
            onChange={e => this.handleChange("otp1", e)}
            tabIndex="1" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp2"
            type="number"
            max={1}
            autoComplete="off"
            className="otpInput"
            value={this.state.otp2}
            onChange={e => this.handleChange("otp2", e)}
            tabIndex="2" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp3"
            type="number"
            max={1}
            autoComplete="off"
            className="otpInput"
            value={this.state.otp3}
            onChange={e => this.handleChange("otp3", e)}
            tabIndex="3" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp4"
            type="number"
            max={1}
            autoComplete="off"
            className="otpInput"
            value={this.state.otp4}
            onChange={e => this.handleChange("otp4", e)}
            tabIndex="4" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />

          <input
            name="otp5"
            type="number"
            autoComplete="off"
            max={1}
            className="otpInput"
            value={this.state.otp5}
            onChange={e => this.handleChange("otp5", e)}
            tabIndex="5" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />
          <input
            name="otp6"
            type="number"
            autoComplete="off"
            max={1}
            className="otpInput"
            value={this.state.otp6}
            onChange={e => this.handleChange("otp6", e)}
            tabIndex="6" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />
        </div>
          </div>
          <div className='otptimer'>
          <p>Resend OTP in {time && time < 10 ? <span>00:{"0"+time}</span> : <span>00:{time}</span>}</p>
          </div>
          <p style={{textAlign: 'center', color: 'red', marginBottom: '10px'}}>{this.state.error_message}</p>
          <button onClick={this.verifyOTP}>Verify</button>
        </div>
        </form>
        <p style={{margin:"0 auto", textAlign: "center", color : "#9dce76", padding: "10px"}}>{this.state.resend_otp}</p>
        <div class="otp-btm">
          <p>Didn't receive any code?</p>
          <a onClick={this.resendNewOTP}>Resend New OTP</a>
        </div>
        {/* <div >
          <iframe  title="Testing" src='https://www.xhtmlreviews.com/pnp-notifications/' id='my-iframe' />
        </div> */}
      </div>
    )
  }
}

export default OTPPage






