import {initializeApp} from 'firebase/app';
import {getMessaging,getToken,onMessage} from 'firebase/messaging';


var firebaseConfig = {
    apiKey: "AIzaSyBO91mAPtVMagQPu7sN17zrRTz0UhjBniw",
    authDomain: "pnp-notifications.firebaseapp.com",
    projectId: "pnp-notifications",
    storageBucket: "pnp-notifications.appspot.com",
    messagingSenderId: "343424940808",
    appId: "1:343424940808:web:63ecb534c3113305814abd",
    measurementId: "G-FM0M2TJ59R"
  };

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound,setFcmToken) => {
	return getToken(messaging,{vapidKey:'BMTP1fP1RquQY2973v5gCRv2alNYvrpR-jyhS6Wg9yyu1Y9oLXB68RguaU-2mP047nm_f9cLYnOsOn0EgQiole4'})
.then((currentToken)=>{
	if(currentToken){
            console.log(currentToken)
            localStorage.setItem(`token`, currentToken);
            setTokenFound = true;
            setFcmToken = currentToken;
		// setTokenFound(true);
		// setFcmToken(currentToken);
	}else{
		console.log("no token found");
            setTokenFound = false;
            setFcmToken = '';    
	}
}).catch((err)=>{
	console.log("Error occured",err);
})
}

export const onMessageListener = () => 
	new Promise((resolve)=>{
		onMessage(messaging,(payload)=>{
			resolve(payload);
		})
	})
