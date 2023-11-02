import React, { Component } from 'react'



export class BoardingServiceCostPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total_price: 0
    }
  }

  componentDidMount = () =>{
    let total = 0;
    let boarding_total = 0;
    let addOn_total = 0;
    let food_total = 0;
    if(this.props.data.data.bording.length > 0) {
      for(let index=0; index<this.props.data.data.bording.length; index++){
        boarding_total = (Number(boarding_total)) + (Number(this.props.data.data.bording[index].price));
      }
    }
    if(this.props.data.data.addon.length > 0) {
      for(let index=0; index<this.props.data.data.addon.length; index++){
        addOn_total = (Number(addOn_total)) + (Number(this.props.data.data.addon[index].price));
      }
    }
    if(this.props.data.data.food.length > 0) {
        food_total = (Number(food_total)) + (Number(this.props.data.data.food[0].price));
    }

    total = (boarding_total + addOn_total + food_total) - (((boarding_total + addOn_total + food_total)*20)/100);
    this.setState({
      total_price: total
    })
  }
  render() {
    console.log(this.props.data.data)
    console.log(this.state.total_price);
    return (
        <div className='ordr-sumry-sec'>
        <div class="ordr-sumry">
        <div class="ordr-sumry-hdng">
          <img src="ordr-icon.png" alt="" />
        </div>
        <div class="close-icon" onClick={this.props.closePopUp}>
           <img src="ordr-cls-icon.png" alt="" />
        </div>
        <div class="ordr-sumry-list-1">
          <ul>
          <div class="ordr-total-cst">
            <p>Boarding Cost</p>
            <span>Rupees</span>
            </div>
            {this.props.data.data.bording && this.props.data.data.bording.length>0 ? this.props.data.data.bording.map((boardingCost, index)=>{
              return(
              <li key={index}>
                <p>{boardingCost.name}</p>
                <span>{boardingCost.price}/-</span>
              </li>
              )
            }) : ""}

            <div class="ordr-total-cst">
            <p>Add-ons Cost</p>
            </div>
            {this.props.data.data.addon && this.props.data.data.addon.length>0 ? this.props.data.data.addon.map((addonCost, index)=>{
              return(
              <li key={index}>
                <p>{addonCost.name}</p>
                <span>{addonCost.price}/-</span>
              </li>
              )
            }) : ""}

            <div class="ordr-total-cst">
            <p>Food Cost</p>
            {this.props.data.data.food && this.props.data.data.food.length>0 ? 
            <span>{this.props.data.data.food[0].price}/-</span>
            : ""}
            </div>
            {this.props.data.data.food ? this.props.data.data.food.map((foodCost, index)=>{
              return(
              <li key={index}>
                <p>{foodCost.name}</p>
                
              </li>
              )
            }) : ""}

          </ul>
        </div>
        {/* <div class="ordr-total-cst">
            <p>Total Cost Per Day</p>
            <span>750/-</span>
        </div> */}
        <div class="ordr-sumry-list-2">
          <ul>
            <li>
              <p>PNP Commission On Actual Cost</p>
              <span className='pnp-cmsn'>-20%</span>
            </li>
          </ul>
        </div>
        <div class="total-ordr-total-cst">
            <p>Total Earning Per Day</p>
            <span>{this.state.total_price}/-</span>
        </div>
        <div class="sbmt">
              <button onClick={this.props.moveToHomePage}>Submit</button>
        </div>
        </div>
        </div>
    )
  }
}

export default BoardingServiceCostPreview