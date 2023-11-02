import React, { Component } from 'react'
import Services from '../Services/Services';
import LoadingSymbol from './LoadingSymbol';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';


export class Login extends Component {

    constructor(props) {
        super(props);

    this.state = {
        phone_or_email: null,
        error_messgae: "",
        loading: false,
      };
    }

componentDidMount = () =>{
  if(navigator.onLine){
    document.querySelectorAll('input[type="number"]').forEach(input =>{
      input.oninput=()=>{
        if(input.value.length > input.maxLength) input.value=input.value.slice(0,input.maxLength)
      };
    });
      for(let i=0; i<50; i++){
        window.history.pushState('forward', null, window.location);
      }
    }
  else{
    this.props.history.push({
      pathname : "/internet"
    })
  }
}

handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      this.setState({ [name]: value }, () => console.log(this.state));
    };


  Login = () => {
        this.setState({
          loading: true,
        })

        if(this.state.phone_or_email == null){
          this.setState({
            error_messgae: "Enter phone number",
            loading : false,
          })
        }
        else if(this.state.phone_or_email == ""){
          this.setState({
            error_messgae: "Enter phone number",
            loading : false,
          })
        }

        else{
          console.log(this.state.phone_or_email);
          const obj = {
              username: this.state.phone_or_email,
          }
      
          Services.getInstance().newLogin(obj).then((result)=>{
              console.log(result);
              if(result.status === true) {
                this.setState({
                  loading: false,
                })
                  this.props.history.push({
                      pathname: '/otppage',
                      data: result.data,
                      })                       
              }
              else if(result.status === false){
                this.setState({
                  error_messgae: result.msg,
                })
                this.setState({
                  loading: false,
                })
              }
          })
          
         }
    }   
      
      SignUp = () =>{
        this.props.history.push({
            pathname: '/signin'
        })
      }



  render() {
    return (
        <div class="pnp-sales-login">
          <DarkBackground disappear={this.state.loading}>
            <LoadingOverlay
              active={true}
              spinner={true}
              text="Please Wait..."
            >
            </LoadingOverlay>
          </DarkBackground>
        <div class="login-pnp">
          <div class="login-head">
           <header>
            <img src="menu-logo.png" />
          </header>
          </div>
            <div class="login-pnp-info">
              <img src="login-p.png" alt="img" />
              {/* { this.state.loading === true ? <LoadingSymbol /> : "" } */}
              <input 
                type="text"
                maxLength={10} 
                placeholder="Enter Phone Number" 
                name="phone_or_email"
                onChange={this.handleChange} />
              <p style={{margin: '10px', color: 'red'}}>{this.state.error_messgae}</p>
              <button onClick={this.Login}>Continue</button>
              <p>Don't have an account? <a onClick={this.SignUp}>Sign up</a></p>
            </div>

            
          </div>
        </div>
    )
  }
}

export default Login