import '../src/All.css';
import React, { Component } from "react"
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import WalkingScreen from './Entry-Screens/WalkingScreen';
import BoardingScreen from './Entry-Screens/BoardingScreen';
import GroomingScreen from './Entry-Screens/GroomingScreen';
import TrainingScreen from './Entry-Screens/TrainingScreen';
import Login from './Entry-Screens/Login';
import SignIn from './Entry-Screens/SignIn';
import OTPPage from './Entry-Screens/OTPPage';
import PrimaryProfileData from './Entry-Screens/PrimaryProfileData';
import BoardingServiceDetails from './BoardingModule/BoardingServiceDetails';
import VideoView from './Entry-Screens/VideoView';
import BoardingServiceCostPreview from './BoardingModule/BoardingServiceCostPreview';
import HomePage from './Entry-Screens/HomePage';
import Location from './Entry-Screens/Location';
import TrainingServiceDetails from './TrainingModule/TrainingServiceDetails';
import GroomingServiceDetails from './GroomingModule/GroomingServiceDetails';
import SittingServiceDetails from './SittingModule/SittingServiceDetails';
import WalkingServiceDetails from './WalkingModule/WalkingServiceDetails';
import VetServicesDetails from './VetModule/VetServicesDetails';
import SplashScreen from './Entry-Screens/SplashScreen';
import GroomQuoteReceived from './GroomingModule/GroomQuoteReceived';
import SittingQuoteReceived from './SittingModule/SittingQuoteReceived';
import TrainingQuoteReceived from './TrainingModule/TrainingQuoteReceived';
import VetQuoteReceived from './VetModule/VetQuoteReceived';
import SuccessPage from './Entry-Screens/SuccessPage';
import WalkingQuoteReceived from './WalkingModule/WalkingQuoteReceived';
import SittingQuoteEdit from './SittingModule/SittingQuoteEdit';
import GroomQuoteEdit from './GroomingModule/GroomQuoteEdit';
import TrainingQuoteEdit from './TrainingModule/TrainingQuoteEdit';
import VetQuoteEdit from './VetModule/VetQuoteEdit';
import WalkingQuoteEdit from './WalkingModule/WalkingQuoteEdit';
import ActiveJobDetails from './Entry-Screens/ActiveJobDetails';
import ClientLocationMapsRouting from './Entry-Screens/ClientLocationMapsRouting';
import test from './Entry-Screens/test'
import NotificationsDetails from './Entry-Screens/NotificationsDetails';
import EditProfile from './Entry-Screens/EditProfile';
import AddPhotos from './Entry-Screens/AddPhotos';
import MyReviews from './Entry-Screens/MyReviews';
import Wallet from './Entry-Screens/Wallet';
import DocumentVerification from './Entry-Screens/DocumentVerification';
import BoardingQuoteReceived from './BoardingModule/BoardingQuoteReceived';
import BoardQuoteEdit from './BoardingModule/BoardQuoteEdit';
import BankDetails from './Entry-Screens/BankDetails';
import Internet from './Entry-Screens/Internet';





class App extends Component {
    render() {
      // const user =  JSON.parse(localStorage.getItem(`PNP-Service-userData`))
      return (
        //  <BrowserRouter>
        <HashRouter>
          <Switch>
            <Route exact path='/' component = {SplashScreen} />
            <Route exact path='/login' component = {Login} />
            <Route exact path='/signin' component = {SignIn} />
            <Route exact path='/otppage' component = {OTPPage} />
            <Route exact path='/borading-screen' component = {BoardingScreen} />
            <Route exact path='/walking-screen' component = {WalkingScreen} />
            <Route exact path='/grooming-screen' component = {GroomingScreen} />
            <Route exact path='/training-screen' component = {TrainingScreen} />
            <Route exact path='/primary-profile-data' component = {PrimaryProfileData} />
            <Route exact path='/video-view' component = {VideoView} />
            <Route exact path='/location' component = {Location} />
            <Route exact path='/home' component = {HomePage} />
            <Route exact path='/training-service-details' component = {TrainingServiceDetails} />
            <Route exact path='/walking-service-details' component = {WalkingServiceDetails} />
            <Route exact path='/grooming-service-details' component = {GroomingServiceDetails} />
            <Route exact path='/boarding-service-details' component = {BoardingServiceDetails} />
            <Route exact path='/boarding-service-cost-preview' component = {BoardingServiceCostPreview} />
            <Route exact path='/sitting-service-details' component = {SittingServiceDetails} />
            <Route exact path='/vet-service-details' component = {VetServicesDetails} />
            <Route exact path="/board-quote-recieved" component={BoardingQuoteReceived} />
            <Route exact path="/groom-quote-recieved" component={GroomQuoteReceived} />
            <Route exact path="/sit-quote-recieved" component={SittingQuoteReceived} />
            <Route exact path="/train-quote-recieved" component={TrainingQuoteReceived} />
            <Route exact path="/walk-quote-recieved" component={WalkingQuoteReceived} />
            <Route exact path="/vet-quote-recieved" component={VetQuoteReceived} />
            <Route exact path="/successPage" component={SuccessPage} />
            <Route exact path="/sit-quote-edit" component={SittingQuoteEdit} />
            <Route exact path="/board-quote-edit" component={BoardQuoteEdit} />
            <Route exact path="/groom-quote-edit" component={GroomQuoteEdit} />
            <Route exact path="/train-quote-edit" component={TrainingQuoteEdit} />
            <Route exact path="/vet-quote-edit" component={VetQuoteEdit} />
            <Route exact path="/walk-quote-edit" component={WalkingQuoteEdit} />
            <Route exact path="/active-job-details" component={ActiveJobDetails} />
            <Route exact path="/client-location-routing" component={ClientLocationMapsRouting} />
            <Route exact path="/test" component={test} />
            <Route exact path="/notification-details" component={NotificationsDetails} />
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/add-photos" component={AddPhotos} />
            <Route exact path="/my-reviews" component={MyReviews} />
            <Route exact path="/wallet" component={Wallet} />
            <Route exact path="/document-verification" component={DocumentVerification} />
            <Route exact path="/bank-details" component={BankDetails} />
            <Route exact path="/internet" component={Internet} />
         
          
       





            {/* <Route exact path="/boardingServiceDetailslogin" component={BoardingServiceDetailslogin} /> */}



          
            {/* {this.state.user && <Route path = '/storeproducts' component={StoreProducts} />}
           
            {user && user.id ? <Redirect to='/StoreProducts'/> : <Redirect to='/login'/>} */}
            
          </Switch>
           {/* </BrowserRouter> */}
          </HashRouter>
          
      );
    }
  }
  
  export default App
  