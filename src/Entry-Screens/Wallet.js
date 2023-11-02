import React, { Component } from 'react'
import './Wallet.css'
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';
import Services from '../Services/Services';




const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class Wallet extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: false,
    wallet_data: {},
  }
  componentDidMount = () => {
    if(navigator.onLine){
      this.setState({
        loading: true,
      })
      const obj = {
        userId: user.id,
        status: "2"
      }
      Services.getInstance().SPWallet(obj).then((result) => {
        this.setState({
          wallet_data: result,
          loading: false,
        })
      })
    }
    else{
      this.props.history.push({
        pathname : "/internet"
      })
    }

  }



  wallet_amount = () => {
    this.setState({
      loading: true,
    })
    document.getElementById("wall").classList.add("active");
    document.getElementById("with").classList.remove("active");
    const obj = {
      userId: user.id,
      status: "2"
    }
    Services.getInstance().SPWallet(obj).then((result) => {
      this.setState({
        wallet_data: result,
        loading: false,
      })

    })
  }


  withdraw_amount = () => {
    this.setState({
      loading: true,
    })

    const obj200 = {
      userId: user.id
    }
    Services.getInstance().getSpBankDetails(obj200).then((result) => {
      if (result.details && result.details.length > 0) {
        document.getElementById("wall").classList.remove("active");
        document.getElementById("with").classList.add("active");
        const obj = {
          userId: user.id,
          status: "3"
        }
        Services.getInstance().SPWallet(obj).then((result) => {
          this.setState({
            wallet_data: result,
            loading: false,
          })

        })
      }
      else {
        const obj200 = {
          userId: user.id
        }
        Services.getInstance().getSpUpiDetails(obj200).then((result) => {
          if (result.details && result.details.length > 0) {
            document.getElementById("wall").classList.remove("active");
            document.getElementById("with").classList.add("active");
            const obj = {
              userId: user.id,
              status: "2"
            }
            Services.getInstance().SPWallet(obj).then((result) => {
              this.setState({
                wallet_data: result,
                loading: false,
              })

            })
          }
          else {
            this.props.history.push({
              pathname: "/bank-details"
            })
          }
        })
      }
    })
  }


  goBack = () => {
    this.props.history.push({
      pathname: "/home"
    })
  }

  render() {
    return (
      <div class="my-wallet-main">
        <DarkBackground disappear={this.state.loading}>
          <LoadingOverlay
            active={true}
            spinner={true}
            text="Please Wait..."
          >
          </LoadingOverlay>
        </DarkBackground>
        <div class="srvc-dtls-hd">
          <h4>My Earnings</h4>
          <div class="srvc-dtls-bck go-home" onClick={this.goBack}>
            <img src="srvc-dtls-bck-icon.png" />
          </div>
        </div>

        <div class="wallet-main">
          <div class="wallet-bg">
            <ul class="wallet-list" id="wlt-lst">
              <li class="wlt-amt active" onClick={this.wallet_amount} id="wall">
                <a class="wallet-item">
                  <div class="wallet-item-lft">
                    <img src="nw-rg-amt-icon.png" />
                  </div>
                  <div class="wallet-item-rht">
                    <p>Wallet Amt..</p>
                    <span>RS {this.state.wallet_data.walletAmount}</span>
                  </div>
                </a>
              </li>
              <li class="wtdrwl-amt" onClick={this.withdraw_amount} id="with">
                <a class="wallet-item">
                  <div class="wallet-item-lft">
                    <img src="nw-rl-amt-icon.png" />
                  </div>
                  <div class="wallet-item-rht">
                    <p>Withdrawn Amt..</p>
                    <span>RS {this.state.wallet_data.releaseAmount}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div class="wallet-table">

            <div class="wallet-table-hd">
              <span>Client</span>
              <span>Service</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {this.state.wallet_data.tmpTran && this.state.wallet_data.tmpTran.length > 0 ? this.state.wallet_data.tmpTran.map((tnx, index) => {
              return (
                <div class="wallet-table-row" key={index}>
                  <p>{tnx.cname}</p>
                  <p>{tnx.service}</p>
                  <p>{tnx.amount}/-</p>
                  {tnx.status == "1" ?
                    <p>Pending</p>
                    :
                    <p>Released<small style={{ color: "green" }}>{tnx.rdata}</small></p>
                  }
                </div>
              )
            }) : ""}




          </div>

        </div>

        <div class="w-rupee">
          <img src="w-rupee-icon.png" />
        </div>




      </div>

    )
  }
}

export default Wallet